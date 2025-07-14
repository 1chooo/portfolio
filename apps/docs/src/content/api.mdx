# API Documentation

# GitHub Users API

Get comprehensive GitHub user statistics and information.

## Endpoint

```
GET /api/github/users
```

## Description

This endpoint fetches detailed GitHub user information including profile data, repository statistics, followers, and top repositories. It aggregates data from multiple GitHub API endpoints to provide a comprehensive overview of a GitHub user's activity and statistics.

## Parameters

### Query Parameters

| Parameter   | Type   | Required | Default                 | Description                       |
| ----------- | ------ | -------- | ----------------------- | --------------------------------- |
| `user_name` | string | No       | Config default username | GitHub username to fetch data for |

## Request Examples

### Get default user (from config)

```bash
curl -X GET "https://1chooo.com/api/github/users"
```

### Get specific user

```bash
curl -X GET "https://1chooo.com/api/github/users?user_name=octocat"
```

## Response

### Success Response (200)

```json
{
  "user": {
    "login": "octocat",
    "name": "The Octocat",
    "bio": "A great octopus masquerading as a cat",
    "location": "San Francisco",
    "company": "@github",
    "blog": "https://github.blog",
    "avatar_url": "https://github.com/images/error/octocat_happy.gif",
    "html_url": "https://github.com/octocat",
    "public_repos": 8,
    "followers": 4000,
    "following": 9,
    "created_at": "2011-01-25T18:44:36Z",
    "updated_at": "2022-07-09T09:23:27Z"
  },
  "stats": {
    "totalStars": 150,
    "totalForks": 45,
    "totalIssues": 23,
    "totalPRs": 67,
    "publicRepos": 8,
    "totalRepos": 8,
    "followersCount": 4000,
    "followingCount": 9
  },
  "followers": [
    {
      "login": "defunkt",
      "id": 2,
      "avatar_url": "https://github.com/images/error/defunkt_happy.gif",
      "html_url": "https://github.com/defunkt",
      "type": "User"
    }
  ],
  "topRepos": [
    {
      "name": "Hello-World",
      "full_name": "octocat/Hello-World",
      "description": "This your first repo!",
      "html_url": "https://github.com/octocat/Hello-World",
      "stargazers_count": 80,
      "forks_count": 9,
      "language": "C",
      "updated_at": "2011-01-26T19:06:43Z",
      "topics": ["octocat", "atom", "electron", "api"]
    }
  ]
}
```

## Response Schema

### User Object

| Field          | Type   | Description                         |
| -------------- | ------ | ----------------------------------- |
| `login`        | string | GitHub username                     |
| `name`         | string | Display name                        |
| `bio`          | string | User bio                            |
| `location`     | string | User location                       |
| `company`      | string | Company name                        |
| `blog`         | string | Blog/website URL                    |
| `avatar_url`   | string | Profile picture URL                 |
| `html_url`     | string | GitHub profile URL                  |
| `public_repos` | number | Number of public repositories       |
| `followers`    | number | Number of followers                 |
| `following`    | number | Number of following                 |
| `created_at`   | string | Account creation date (ISO 8601)    |
| `updated_at`   | string | Last profile update date (ISO 8601) |

### Stats Object

| Field            | Type   | Description                                  |
| ---------------- | ------ | -------------------------------------------- |
| `totalStars`     | number | Total stars across all non-fork repositories |
| `totalForks`     | number | Total forks across all repositories          |
| `totalIssues`    | number | Total issues created by the user             |
| `totalPRs`       | number | Total pull requests created by the user      |
| `publicRepos`    | number | Number of public repositories                |
| `totalRepos`     | number | Total number of repositories                 |
| `followersCount` | number | Number of followers                          |
| `followingCount` | number | Number of users following                    |

### Followers Array

Array of follower objects with:
| Field | Type | Description |
|-------|------|-------------|
| `login` | string | Follower's username |
| `id` | number | Follower's GitHub ID |
| `avatar_url` | string | Follower's profile picture URL |
| `html_url` | string | Follower's GitHub profile URL |
| `type` | string | Account type (User, Organization) |

### Top Repos Array

Array of top 10 repositories (by stars) with:
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Repository name |
| `full_name` | string | Full repository name (owner/repo) |
| `description` | string | Repository description |
| `html_url` | string | Repository URL |
| `stargazers_count` | number | Number of stars |
| `forks_count` | number | Number of forks |
| `language` | string | Primary programming language |
| `updated_at` | string | Last update date (ISO 8601) |
| `topics` | array | Repository topics/tags |

## Error Responses

### User Not Found (404)

```json
{
  "error": "User not found"
}
```

### Rate Limited (403)

```json
{
  "error": "API rate limit exceeded or access forbidden"
}
```

### Server Error (500)

```json
{
  "error": "Failed to fetch GitHub data",
  "details": "Specific error message"
}
```

## Rate Limiting

This endpoint uses the GitHub API which has rate limiting:

- **Unauthenticated requests**: 60 requests per hour per IP
- **Authenticated requests**: 5,000 requests per hour

The endpoint makes multiple GitHub API calls:

- 1 call to fetch user profile
- 1 call to fetch repositories
- 1 call to fetch followers
- 2 calls to search for issues and PRs

Total: ~5 API calls per request

## Implementation Notes

- Fork repositories are excluded from star counts
- Only public repositories are included in statistics
- Top repositories are sorted by star count (descending)
- Issues and PR counts are fetched separately and may fail gracefully
- Response includes comprehensive error handling for common GitHub API errors
- All repository data is filtered to include only relevant fields

## Dependencies

- `octokit`: GitHub API client
- `@/config`: Application configuration for default username

## Authentication

Currently operates without authentication. For higher rate limits, add GitHub token to the Octokit configuration.

# GitHub Repositories API

Get GitHub repository information - either a specific repository or all repositories for a user.

## Endpoint

```
GET /api/github/repos
```

## Description

This endpoint fetches GitHub repository data. It can operate in two modes:

1. **Single Repository Mode**: Fetch specific repository statistics when `repo_name` is provided
2. **All Repositories Mode**: Fetch all repositories for the configured user when no `repo_name` is provided

## Parameters

### Query Parameters

| Parameter   | Type   | Required | Default | Description                                                             |
| ----------- | ------ | -------- | ------- | ----------------------------------------------------------------------- |
| `repo_name` | string | No       | -       | Specific repository name to fetch. If omitted, returns all repositories |

## Request Examples

### Get all repositories

```bash
curl -X GET "https://1chooo.com/api/github/repos"
```

### Get specific repository

```bash
curl -X GET "https://1chooo.com/api/github/repos?repo_name=portfolio"
```

## Response

### Single Repository Response (200)

When `repo_name` parameter is provided:

```json
{
  "stars": 42,
  "forksCount": 7
}
```

### All Repositories Response (200)

When no `repo_name` parameter is provided:

```json
{
  "repos": [
    {
      "name": "portfolio",
      "fullName": "username/portfolio",
      "description": "My personal portfolio website built with Next.js",
      "stars": 42,
      "forksCount": 7,
      "language": "TypeScript",
      "url": "https://github.com/username/portfolio",
      "updatedAt": "2025-07-07T10:30:00Z",
      "isPrivate": false
    },
    {
      "name": "awesome-project",
      "fullName": "username/awesome-project",
      "description": "An awesome open source project",
      "stars": 128,
      "forksCount": 23,
      "language": "JavaScript",
      "url": "https://github.com/username/awesome-project",
      "updatedAt": "2025-07-06T14:22:15Z",
      "isPrivate": false
    }
  ],
  "totalCount": 2
}
```

## Response Schema

### Single Repository Mode

| Field        | Type   | Description                                    |
| ------------ | ------ | ---------------------------------------------- |
| `stars`      | number | Number of stars the repository has received    |
| `forksCount` | number | Number of times the repository has been forked |

### All Repositories Mode

| Field        | Type   | Description                           |
| ------------ | ------ | ------------------------------------- |
| `repos`      | array  | Array of repository objects           |
| `totalCount` | number | Total number of repositories returned |

#### Repository Object

| Field         | Type    | Description                       |
| ------------- | ------- | --------------------------------- |
| `name`        | string  | Repository name                   |
| `fullName`    | string  | Full repository name (owner/repo) |
| `description` | string  | Repository description            |
| `stars`       | number  | Number of stargazers              |
| `forksCount`  | number  | Number of forks                   |
| `language`    | string  | Primary programming language      |
| `url`         | string  | Repository HTML URL               |
| `updatedAt`   | string  | Last update timestamp (ISO 8601)  |
| `isPrivate`   | boolean | Whether the repository is private |

## Error Responses

### Repository Not Found (404)

When a specific repository is requested but doesn't exist:

```json
{
  "error": "Repository not found"
}
```

### User Not Found (404)

When fetching all repositories but the user doesn't exist:

```json
{
  "error": "User not found"
}
```

### Repository Fetch Error (500)

When there's an error fetching a specific repository:

```json
{
  "error": "Failed to fetch repository",
  "details": "Specific error message from GitHub API"
}
```

### Repositories Fetch Error (500)

When there's an error fetching all repositories:

```json
{
  "error": "Failed to fetch repositories",
  "details": "Specific error message from GitHub API"
}
```

### Internal Server Error (500)

General server error:

```json
{
  "error": "Internal server error",
  "details": "Specific error message"
}
```

## Rate Limiting

This endpoint uses the GitHub API which has rate limiting:

- **Unauthenticated requests**: 60 requests per hour per IP
- **Authenticated requests**: 5,000 requests per hour

### API Calls Per Request

- **Single Repository Mode**: 1 GitHub API call
- **All Repositories Mode**: 1 GitHub API call

## Usage Examples

### Frontend Integration

```javascript
// Get all repositories
const getAllRepos = async () => {
  try {
    const response = await fetch("/api/github/repos");
    const data = await response.json();

    if (response.ok) {
      console.log(`Found ${data.totalCount} repositories`);
      data.repos.forEach((repo) => {
        console.log(`${repo.name}: ${repo.stars} stars`);
      });
    } else {
      console.error("Error:", data.error);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

// Get specific repository
const getRepoStats = async (repoName) => {
  try {
    const response = await fetch(`/api/github/repos?repo_name=${repoName}`);
    const data = await response.json();

    if (response.ok) {
      console.log(`${repoName}: ${data.stars} stars, ${data.forksCount} forks`);
    } else {
      console.error("Error:", data.error);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
```

### cURL Examples

```bash
# Get all repositories with verbose output
curl -v -X GET "https://1chooo.com/api/github/repos"

# Get specific repository with error handling
curl -X GET "https://1chooo.com/api/github/repos?repo_name=nonexistent" \
  -w "HTTP Status: %{http_code}\n"

# Get repositories and save to file
curl -X GET "https://1chooo.com/api/github/repos" \
  -H "Accept: application/json" \
  -o repositories.json
```

## Implementation Notes

### Data Processing

- **All Repositories Mode**: Fetches up to 100 repositories, sorted by last updated
- **Repository Filtering**: Includes both public and private repositories (if accessible)
- **Data Transformation**: GitHub API response is transformed to provide cleaner field names

### Error Handling

- Specific error handling for 404 (not found) scenarios
- Separate error paths for single repository vs. all repositories modes
- Detailed error messages include original GitHub API error details

### Configuration

- Uses `config.about.githubUsername` as the default repository owner
- GitHub API version is pinned to `2022-11-28` for consistency

## Authentication

Currently operates without authentication. For accessing private repositories or higher rate limits, add a GitHub token to the Octokit configuration:

```typescript
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
```

## Dependencies

- `octokit`: GitHub API client library
- `@/config`: Application configuration for default username
- `next`: Next.js framework for request/response handling
