import React, { useState, useEffect } from "react";
import {
  Box,
  Grommet,
  grommet,
  Page,
  PageContent,
  PageHeader,
  Text,
  InfiniteScroll
} from "grommet";
import { useDispatch, useSelector } from "react-redux";
import {
  getMorePosts,
  selectPosts,
  selectStatus,
} from "./features/reddit/redditSlice";
import { AppBar } from "./components/AppBar";
import { deepMerge } from "grommet/utils";
import { CardTemplate } from "./components/CardTemplate";
import { LightSwitch } from "./components/LightSwitch";
import { checkStatus, findLastPostName } from "./features/reddit/reddit_utils";

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
            {(item, index) => (
              <li key={index}><Text>{item}</Text></li>
            )}
          </InfiniteScroll>
        </PageContent>
      </Page>
    </Grommet>
  );
}

export default App;
