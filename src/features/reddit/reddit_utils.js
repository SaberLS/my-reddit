export async function fetchPosts(lastPostName) {
  const url = !lastPostName
    ? "https://www.reddit.com/r/popular/top/.json?limit=50"
    : `https://www.reddit.com/r/popular/top/.json?limit=50&after=t3_${lastPostName}`;
  console.log(url);
  return fetch(url);
}

export function findLastPostName(posts) {
  const postsKeys = Object.keys(posts);
  if (postsKeys.length > 0) {
    console.log(postsKeys[postsKeys.length - 1]);
    return postsKeys[postsKeys.length - 1];
  }
  return null;
}

export function checkPostType(data) {
  if (data.is_gallery) {
    return "gallery";
  } else if (data.is_video) {
    return "hosted:video";
  } else if (data.post_hint) {
    return data.post_hint;
  } else if (data.selftext_html) {
    console.log(data.selftext)
    console.log("text :", data)
    return "text";
  }
  console.log("unknown type:", data);
  return "none";
}

export const makeGallery = (items, meta_data) => {
  return items.map((item) => {
    //https://i.redd.it/k8bsw0zzeizb1.jpg
    if (meta_data[item.media_id].m === "image/png") {
      return `https://i.redd.it/${item.media_id}.png`;
    } else if (meta_data[item.media_id].m === "image/jpg") {
      return `https://i.redd.it/${item.media_id}.jpg`;
    } else if (meta_data[item.media_id].m === "image/gif") {
      return `https://i.redd.it/${item.media_id}.gif`;
    }
    console.log("unknown galllery element type :", meta_data[item.media_id]);
    return null;
  });
};

export const checkStatus = (status) => {
  if (status === "idle") {
    console.log(status);
    return true;
  } return false;
}
