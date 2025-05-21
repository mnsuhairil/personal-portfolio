import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import theme from "./../themes/theme";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  themeMode: "dark" | "light";
  onNavigate?: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ themeMode, onNavigate }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  // Use router navigation for main sections
  const handleNavigate = (section: string) => {
    setDrawerOpen(false);
    if (section === "all-projects") {
      navigate("/personal-portfolio/all-projects");
    } else if (section === "home") {
      navigate("/personal-portfolio/");
    } else if (section === "projects") {
      navigate("/personal-portfolio/#projects");
    } else if (section === "about") {
      navigate("/personal-portfolio/#about");
    } else if (section === "contact") {
      navigate("/personal-portfolio/#contact");
    }
    // Optionally call prop for scroll-into-view if provided
    if (onNavigate) onNavigate(section);
  };

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
            <Button onClick={() => handleNavigate("home")}>Home</Button>
            <span>{" />"}</span>
            <Button onClick={() => handleNavigate("projects")}>Projects</Button>
            <span>{" />"}</span>
            <Button onClick={() => handleNavigate("about")}>About</Button>
            <span>{" />"}</span>
            <Button onClick={() => handleNavigate("contact")}>Contact</Button>
            <span>{" />"}</span>
            
          </Hidden>
          {/* Show on small screens */}
          <Hidden smUp>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 240,
            background: theme[themeMode].custom.primary,
            color: theme[themeMode].custom.text,
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <IconButton onClick={handleDrawerToggle} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate("home")}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate("projects")}>
              <ListItemText primary="Projects" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate("about")}>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigate("contact")}>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default Header;