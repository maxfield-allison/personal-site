/**
 * Build-time GitHub facts.
 *
 * Live social proof without a client-side request: the star count is fetched
 * while the site builds and baked into the HTML. Shared by the home page's
 * stat table and the project case studies so both quote the same number from
 * the same fetch policy.
 *
 * Every failure mode yields null rather than throwing: a rate-limited or
 * offline build should ship a page without a star count, never fail. The
 * unauthenticated API is fine at this volume.
 */

/** Pull `owner/repo` out of any github.com URL. */
export function parseRepo(url: string): { owner: string; repo: string } | null {
  const m = url.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (!m) return null;
  return { owner: m[1], repo: m[2].replace(/\.git$/, '') };
}

/** Star count for a github.com repo URL, or null if it can't be determined. */
export async function fetchStars(repoUrl: string | undefined): Promise<number | null> {
  if (!repoUrl) return null;
  const parsed = parseRepo(repoUrl);
  if (!parsed) return null;
  try {
    const res = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'maxfieldallison.com-build' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.stargazers_count === 'number' ? data.stargazers_count : null;
  } catch {
    return null;
  }
}
