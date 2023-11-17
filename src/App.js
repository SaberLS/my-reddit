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
import { findLastPostName } from "./features/reddit/reddit_utils";

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

  return (
    <Grommet
      className="App"
      theme={theme}
      full
      themeMode={dark ? "dark" : "light"}
    >
      <Page>
        <AppBar>
          <Text size="large">My App</Text>
          <LightSwitch dark={dark} setDark={setDark} />
        </AppBar>
        <PageHeader title="Welcome" />
        <PageContent direction="column" justify="start" align="center">
          <InfiniteScroll replace={false} show={0} step={20} onMore={() => {dispatch(getMorePosts(findLastPostName(posts)))}} items={Object.keys(posts)}>
            {(item) => (
              <Box
                flex={false}
                pad="medium"
                background={`dark-${(item % 3) + 1}`}
              >
                <Text>{item}</Text>
              </Box>
            )}
          </InfiniteScroll>
        </PageContent>
      </Page>
    </Grommet>
  );
}

export default App;
