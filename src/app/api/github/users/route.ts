import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

import config from "@/config";

export const GET = async (req: NextRequest) => {
  try {
    const octokit = new Octokit({});

    let username = req.nextUrl.searchParams.get("user_name");

    if (!username) {
      username = config.about.githubUsername;
    }

    const [{ data: repos }, { data: followers }, { data: user }] =
      await Promise.all([
        octokit.request("GET /users/{username}/repos", {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
          username,
          per_page: 100,
          sort: "updated",
        }),
        octokit.request("GET /users/{username}/followers", {
          username,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }),
        octokit.request("GET /users/{username}", {
          username,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }),
      ]);

    const stars = repos
      .filter((repo) => !repo.fork)
      .reduce((acc, repo) => {
        return acc + (repo.stargazers_count ?? 0);
      }, 0);

    const forks = repos.reduce((acc, repo) => {
      return acc + (repo.forks_count ?? 0);
    }, 0);

    let totalIssues = 0;
    let totalPRs = 0;

    try {
      const [issuesResult, prsResult] = await Promise.all([
        octokit.request("GET /search/issues", {
          q: `author:${username} type:issue`,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }),
        octokit.request("GET /search/issues", {
          q: `author:${username} type:pr`,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }),
      ]);

      totalIssues = issuesResult.data.total_count;
      totalPRs = prsResult.data.total_count;
    } catch (searchError) {
      console.warn("Failed to fetch issues/PRs stats:", searchError);
    }

    const publicRepos = repos.filter((repo) => !repo.private).length;
    const totalRepos = user.public_repos;

    return NextResponse.json({
      user: {
        login: user.login,
        name: user.name,
        bio: user.bio,
        location: user.location,
        company: user.company,
        blog: user.blog,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      stats: {
        totalStars: stars,
        totalForks: forks,
        totalIssues,
        totalPRs,
        publicRepos,
        totalRepos,
        followersCount: followers.length,
        followingCount: user.following,
      },
      followers: followers.map((follower) => ({
        login: follower.login,
        id: follower.id,
        avatar_url: follower.avatar_url,
        html_url: follower.html_url,
        type: follower.type,
      })),
      topRepos: repos
        .filter((repo) => !repo.fork)
        .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
        .slice(0, 10)
        .map((repo) => ({
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language,
          updated_at: repo.updated_at,
          topics: repo.topics,
        })),
    });
  } catch (error: any) {
    console.error("GitHub API Error:", error);

    if (error.status === 404) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (error.status === 403) {
      return NextResponse.json(
        { error: "API rate limit exceeded or access forbidden" },
        { status: 403 },
      );
    }

    return NextResponse.json(
      {
        error: "Failed to fetch GitHub data",
        details: error.message,
      },
      { status: 500 },
    );
  }
};
