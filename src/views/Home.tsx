// HomePage.tsx
import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import theme from "../themes/theme";
import suimage from "./../assets/su-img2.png";

interface HomePageProps {
  themeMode: "dark" | "light";
}

const HomePage: React.FC<HomePageProps> = ({ themeMode }) => {
  const pageStyle = {
    paddingTop: "50px",
    minHeight: "91.5vh",
    minWeight: "100%",
    // textAlign: "center",
    color: theme[themeMode].custom.text,
  };

  const buttonStyle = {
    marginTop: "20px",
    backgroundColor: theme[themeMode].custom.primary,
    color: theme[themeMode].custom.text,
  };

  return (
    <Container style={pageStyle}>
      <Grid container xs={12} columnGap={6}>
        <Grid item xs={5}>
          <Typography variant="h4" gutterBottom>
            Welcome to{" "}
            <span style={{ color: "yellow", fontWeight: 600 }}>
              MyPortfolio
            </span>
          </Typography>
          <Typography variant="body1" paragraph textAlign={"justify"}>
            Hello, I'm Muhammad Nur Suhairil. I'm a passionate web developer
            with expertise in front-end and back-end technologies. This is my
            portfolio where I showcase my projects and share a little about
            myself. From creating responsive and user-friendly interfaces to
            implementing robust server-side logic, I thrive on turning ideas
            into functional and aesthetically pleasing websites. Explore my work
            to get a glimpse of my skills and the projects I've brought to life.
          </Typography>
          <Button variant="contained" style={buttonStyle}>
            View Projects
          </Button>
        </Grid>
        <Grid item xs={5}>
          <img
            src={suimage}
            alt="Portfolio"
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
