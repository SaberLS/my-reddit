export async function fetchPosts(lastPostName) {
  const url =
    "https://www.reddit.com/r/popular/top/.json?limit=100" + !lastPostName
      ? `&after=${lastPostName}`
      : null;
  return fetch(url);
}
