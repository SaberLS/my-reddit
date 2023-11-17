import React from "react";
import { Box, Button } from "grommet";
import { Moon, Sun } from "grommet-icons";

export const LightSwitch = ({ dark, setDark }) => {
  return (
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
  );
};
