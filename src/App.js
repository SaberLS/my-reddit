import React, { useState } from "react";
import {
  Box,
  Button,
  Grommet,
  Grid,
  grommet,
  Page,
  PageContent,
  PageHeader,
  Text,
} from "grommet";
import { useDispatch, useSelector } from "react-redux";
import { selectStatus } from "./features/reddit/redditSlice";
import { AppBar } from "./components/AppBar";
import { Moon, Sun } from "grommet-icons";
import { deepMerge } from "grommet/utils";
import { CardTemplate } from "./components/CardTemplate";

function App() {
  const status = useSelector(selectStatus);
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
    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
      <Page>
        <AppBar>
          <Text size="large">My App</Text>
          <Button
          a11yTitle={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          icon={dark ? <Moon /> : <Sun />}
          onClick={() => setDark(!dark)}
          tip={{
            content: (
              <Box
                pad="small"
                round="small"
                background={dark ? "dark-1" : "light-3"}
              >
                {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </Box>
            ),
            plain: true,
          }}
        />
        </AppBar>
        <PageContent>
          <PageHeader title="Welcome" />
          <Grid columns="medium" gap="large" pad={{ bottom: "large" }}>
            <CardTemplate title={"Card 1"} />
            <CardTemplate title={"Card 2"} />
            <CardTemplate title={"Card 3"} />
          </Grid>
        </PageContent>
      </Page>
    </Grommet>
  );
}

export default App;
