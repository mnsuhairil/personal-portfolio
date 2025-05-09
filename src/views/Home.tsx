import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import theme from "../themes/theme";
import suimage from "./../assets/su-img2.png";

interface HomePageProps {
  themeMode: "dark" | "light";
}

const HomePage: React.FC<HomePageProps> = ({ themeMode }) => {
  const [typedText, setTypedText] = useState(""); // State for typing animation
  const [hasAnimated, setHasAnimated] = useState(false); // State to track if animation has run
  const fullText = `Hello, I'm Muhammad Nur Suhairil. I'm a passionate web developer
with expertise in front-end and back-end technologies. This is my
portfolio where I showcase my projects and share a little about
myself. From creating responsive and user-friendly interfaces to
implementing robust server-side logic, I thrive on turning ideas
into functional and aesthetically pleasing websites. Explore my work
to get a glimpse of my skills and the projects I've brought to life.`;

  useEffect(() => {
    if (!hasAnimated) {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < fullText.length - 1) {
          setTypedText((prev) => prev + fullText[index]);
          index++;
        } else {
          clearInterval(typingInterval); // Stop the interval when typing is complete
          setHasAnimated(true); // Mark animation as completed
        }
      }, 20); // Adjust typing speed here
      return () => clearInterval(typingInterval); // Cleanup interval on unmount
    }
  }, [hasAnimated, fullText]);

  const pageStyle = {
    marginTop: "30px",
    marginBottom: "50px",
    paddingTop: "50px",
    margin: "0 auto",
    minWeight: "100%",
    color: theme[themeMode].custom.text,
    borderBottom: `3px solid ${theme[themeMode].custom.border}`,
    borderRight: `3px solid ${theme[themeMode].custom.border}`,
  };

  const buttonStyle = {
    marginTop: "20px",
    backgroundColor: theme[themeMode].custom.primary,
    color: theme[themeMode].custom.text,
  };

  return (
    <Container style={pageStyle}>
      <Grid container xs={12} columnGap={6}>
        <Grid item xs={6}>
          <Typography variant="h4" gutterBottom>
            Welcome to{" "}
            <span style={{ color: "yellow", fontWeight: 600 }}>
              MyPortfolio
            </span>
          </Typography>
          <Typography variant="body1" paragraph textAlign={"justify"}>
            {typedText || "Loading..."} {/* Display the animated text */}
          </Typography>
          <Button variant="contained" style={buttonStyle}>
            View Projects
          </Button>
        </Grid>
        <Grid item xs={5.1}>
          <img
            src={suimage}
            alt="Portfolio"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
