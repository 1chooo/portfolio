import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

import config from "@/config";

export const GET = async (req: NextRequest) => {
  try {
    const repoName = req.nextUrl.searchParams.get("repo_name");

    const octokit = new Octokit({});

    if (repoName) {
      try {
        const { data: repo } = await octokit.request(
          "GET /repos/{owner}/{repo}",
          {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
            owner: config.about.githubUsername,
            repo: repoName,
          },
        );

        return NextResponse.json({
          stars: repo?.stargazers_count,
          forksCount: repo?.forks_count,
        });
      } catch (repoError: any) {
        if (repoError.status === 404) {
          return NextResponse.json(
            { error: "Repository not found" },
            { status: 404 },
          );
        }

        return NextResponse.json(
          { error: "Failed to fetch repository", details: repoError.message },
          { status: 500 },
        );
      }
    } else {
      try {
        const { data: repos } = await octokit.request(
          "GET /users/{username}/repos",
          {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
            username: config.about.githubUsername,
            per_page: 100,
            sort: "updated",
          },
        );

        const reposData = repos.map((repo) => ({
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          stars: repo.stargazers_count,
          forksCount: repo.forks_count,
          language: repo.language,
          url: repo.html_url,
          updatedAt: repo.updated_at,
          isPrivate: repo.private,
        }));

        return NextResponse.json({
          repos: reposData,
          totalCount: repos.length,
        });
      } catch (reposError: any) {
        if (reposError.status === 404) {
          return NextResponse.json(
            { error: "User not found" },
            { status: 404 },
          );
        }

        return NextResponse.json(
          {
            error: "Failed to fetch repositories",
            details: reposError.message,
          },
          { status: 500 },
        );
      }
    }
  } catch (error: any) {
    console.error("GitHub API Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
};
