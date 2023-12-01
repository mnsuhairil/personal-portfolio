import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
  Hidden,
} from "@mui/material";
import theme from "./../themes/theme";

interface HeaderProps {
  themeMode: "dark" | "light";
}

const Header: React.FC<HeaderProps> = ({ themeMode }) => {
  const appBarStyle = {
    background: theme[themeMode].custom.primary,
    color: theme[themeMode].custom.text,
    width: "100%",
    zIndex: 1000,
    boxShadow: "none",
  };

  const navButtonStyle = {
    color: theme[themeMode].custom.text,
    marginLeft: "15px",
  };

  const appBarTheme = createTheme({
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: appBarStyle,
        },
      },
      MuiButton: {
        styleOverrides: {
          root: navButtonStyle,
        },
      },
    },
  });

  return (
    <ThemeProvider theme={appBarTheme}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: { xs: 24, sm: 28, md: 32, lg: 36, xl: 40 },
              p: { xs: 1, md: 2 },
            }}
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "red",
                fontSize: "1rem",
              }}
            >
              {"<"}
            </span>
            <span style={{ fontSize: "2rem" }}>MyP0R7F0LI0</span>
            <span
              style={{
                color: "red",
                fontSize: "1rem",
              }}
            >
              {"/>"}
            </span>
          </Typography>
          {/* Hide on small screens */}
          <Hidden smDown>
            <Button>Home</Button>
            <span>{" />"}</span>
            <Button>Projects</Button>
            <span>{" />"}</span>
            <Button>About</Button>
            <span>{" />"}</span>
            <Button>Contact</Button>
            <span>{" />"}</span>
          </Hidden>
          {/* Show on small screens */}
          <Hidden smUp>
            <Button>Menu</Button>
          </Hidden>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
