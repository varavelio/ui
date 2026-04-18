/**
 * Minimal repository data displayed by the GitHub button component.
 */
export interface GithubRepositoryInfo {
  stars: number;
  forks: number;
  tag?: string;
}

const repositoryCache = new Map<string, GithubRepositoryInfo>();
const inflightRequests = new Map<
  string,
  Promise<GithubRepositoryInfo | null>
>();

/**
 * Normalizes one repository identifier segment by trimming whitespace.
 */
function normalizeRepositoryPart(value: string) {
  return value.trim();
}

/**
 * Creates a stable cache key for a GitHub repository.
 */
function createRepositoryKey(owner: string, repo: string) {
  return `${owner.toLowerCase()}/${repo.toLowerCase()}`;
}

/**
 * Builds the GitHub REST API URL for a repository.
 */
function createRepositoryApiUrl(owner: string, repo: string) {
  return `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
}

/**
 * Performs a best-effort JSON request against the GitHub API.
 *
 * Errors and non-successful responses are converted to `null` so the component
 * can stay resilient without leaking fetch errors into the UI.
 */
async function fetchGithubJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

/**
 * Resolves the latest visible release-like label for a repository.
 *
 * The helper prefers the latest release tag and falls back to the newest git
 * tag when no release exists.
 */
async function fetchLatestTag(repositoryApiUrl: string) {
  const latestRelease = await fetchGithubJson<{ tag_name?: string }>(
    `${repositoryApiUrl}/releases/latest`,
  );

  if (latestRelease?.tag_name) {
    return latestRelease.tag_name;
  }

  const tags = await fetchGithubJson<Array<{ name?: string }>>(
    `${repositoryApiUrl}/tags?per_page=1`,
  );

  return Array.isArray(tags) && typeof tags[0]?.name === "string"
    ? tags[0].name
    : undefined;
}

/**
 * Loads repository metadata from GitHub and stores successful results in the
 * in-memory cache for future mounts within the same session.
 */
async function loadRepositoryInfo(owner: string, repo: string) {
  const repositoryApiUrl = createRepositoryApiUrl(owner, repo);

  const [repository, tag] = await Promise.all([
    fetchGithubJson<{
      stargazers_count?: number;
      forks_count?: number;
    }>(repositoryApiUrl),
    fetchLatestTag(repositoryApiUrl),
  ]);

  if (!repository) {
    return null;
  }

  const value: GithubRepositoryInfo = {
    stars: Number(repository.stargazers_count ?? 0),
    forks: Number(repository.forks_count ?? 0),
    tag,
  };

  repositoryCache.set(createRepositoryKey(owner, repo), value);
  return value;
}

/**
 * Fetches repository information on the client using a tiny in-memory cache and
 * in-flight request deduplication.
 */
export async function getGithubRepositoryInfo(owner: string, repo: string) {
  const normalizedOwner = normalizeRepositoryPart(owner);
  const normalizedRepo = normalizeRepositoryPart(repo);

  if (!normalizedOwner || !normalizedRepo) {
    return null;
  }

  const repositoryKey = createRepositoryKey(normalizedOwner, normalizedRepo);
  const cachedRepository = repositoryCache.get(repositoryKey);

  if (cachedRepository) {
    return cachedRepository;
  }

  const existingRequest = inflightRequests.get(repositoryKey);

  if (existingRequest) {
    return existingRequest;
  }

  const request = loadRepositoryInfo(normalizedOwner, normalizedRepo).finally(
    () => {
      inflightRequests.delete(repositoryKey);
    },
  );

  inflightRequests.set(repositoryKey, request);
  return request;
}
