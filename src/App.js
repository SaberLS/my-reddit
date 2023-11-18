import React, { useState, useEffect } from "react";
import Markdown from 'react-markdown'
import {
  Anchor,
  Box,
  Carousel,
  Grommet,
  Grid,
  grommet,
  Page,
  PageContent,
  Text,
  InfiniteScroll,
  Image,
  Paragraph
} from "grommet";
import ShakaPlayer from "shaka-player-react";
import 'shaka-player/dist/controls.css';
import { useDispatch, useSelector } from "react-redux";
import {
  getMorePosts,
  selectPosts,
  selectStatus,
} from "./features/reddit/redditSlice";
import { AppBar } from "./components/AppBar";
import { deepMerge } from "grommet/utils";
import { LightSwitch } from "./components/LightSwitch";
import { checkStatus, findLastPostName } from "./features/reddit/reddit_utils";
import PostCard from "./components/PostCard";

function App() {
  const status = useSelector(selectStatus);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const [dark, setDark] = useState(false);


  const theme = deepMerge(grommet, {
    global: {
      colors: {
        brand: "#228BE6",
      },
      font: {
        family: "Roboto",
        size: "18px",
        height: "20px",
      },
    },
  });

  useEffect(() => {
    dispatch(getMorePosts(findLastPostName(posts)));
  }, [])


  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const makePostBody = (post) => {
    if (post.mediaType === "image") {
      return (
        <Image fit="contain" fill="vertical" src={post.url} />
      )
    } else if (post.mediaType === "hosted:video") {
      return (
        <Box
          direction="row"
          justify="center"
          align="center"
          fit="contain"
          fill="horizontal"
        >
          <div style={{ width: 350 }}>
            <ShakaPlayer muted={true} src={post.video} />
          </div>
        </Box>
      )
    } else if (post.mediaType === "link") {
      return (
        <Box
          direction="row"
          align="start"
          justify="center"
          fit="contain"
          fill="horizontal"
        >
          <Grid rows={["full"]} columns={["2/3", "1/3"]}>
            <Box
              direction="row"
              align="center"
              justify="center"
              fit="contain"
              fill="horizontal"
            >
              <Anchor
                size="small"
                label={post.url}
                href={post.url}
              />
            </Box>
            <Box
              round="xlarge"
              direction="row"
              align="center"
              justify="center"
              fit="contain"
              fill="horizontal"
            >
              <Image fit="cover" src={post.url} />
            </Box>
          </Grid>
        </Box>
      )
    } else if (post.mediaType === "gallery") {
      return (
        <Carousel>
          {post.galleryData.map((link) => {
            return (
              <Image
                key={link}
                fit="contain"
                fill="vertical"
                src={link}
              />
            );
          })}
        </Carousel>
      );
    } else if (post.mediaType === "text") {
      console.log("this:", decodeHtml(post.text))
      return (
        <Box overflow="auto"><Markdown>{post.text}</Markdown></Box>
      )
    } return (
      <div>
        <p style={{ color: "red" }}>UNRECOGNIZED POST</p>
        <a
          target="blank"
          href={`https://reddit.com${post.redditLink}`}
        >
        </a>
      </div>
    )
  }

  return (
    <Grommet
      className="App"
      theme={theme}
      full
      themeMode={dark ? "dark" : "light"}
    >
      <Page>
        <AppBar>
          <Text size="large">my-reddit</Text>
          <LightSwitch dark={dark} setDark={setDark} />
        </AppBar>
        <PageContent direction="column" justify="start" align="center">
          <InfiniteScroll show={5} step={20} onMore={() => {
            //console.log("called");
            if (checkStatus(status)) {
              dispatch(getMorePosts(findLastPostName(posts)));
            };
          }} items={Object.keys(posts)}>
            {(postID) => (
              <PostCard key={postID} post={posts[postID]} body={makePostBody(posts[postID])} />
            )}
          </InfiniteScroll>
        </PageContent>
      </Page>
    </Grommet>
  );
}

export default App;
