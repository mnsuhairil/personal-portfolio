import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import theme from "../themes/theme";
import suimage from "./../assets/su-img2.png";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "../firebase";
import { useNavigate } from "react-router-dom";

interface HomePageProps {
  themeMode: "dark" | "light";
}

const HomePage: React.FC<HomePageProps> = ({ themeMode }) => {
  const [typedText, setTypedText] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [aboutMe, setAboutMe] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  const navigate = useNavigate();

  const handleViewMore = () => {
      navigate("/all-projects");
  };
  
  useEffect(() => {
    const db = getDatabase(app);
    const aboutMeRef = ref(db, "personalAppDatabase/portfolio_web_data/Biodata/about_me");
    const profileImageRef = ref(db, "personalAppDatabase/portfolio_web_data/Biodata/profile_image");
    onValue(aboutMeRef, (snapshot) => {
    const value = snapshot.val();
    setAboutMe("  " + value || "");
  });

  onValue(profileImageRef, (snapshot) => {
    const value = snapshot.val();
    setProfileImage(value || "");
  });
  }, []);

  useEffect(() => {
    if (!hasAnimated && aboutMe) {
      let index = 0;
      setTypedText(""); 
      const typingInterval = setInterval(() => {
        if (index < aboutMe.length -1) {
          setTypedText((prev) => prev + aboutMe[index]);
          index++;
        } else {
          clearInterval(typingInterval);
          setHasAnimated(true);
        }
      }, 20);
      return () => clearInterval(typingInterval);
    }
  }, [hasAnimated, aboutMe]);

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
    marginBottom: "20px",
    backgroundColor: theme[themeMode].custom.primary,
    color: theme[themeMode].custom.text,
  };

  return (
    <Container style={pageStyle}>
      <Grid container xs={12} columnGap={6}>
        <Grid item xs={12} sm={12} md={5.1} lg={5.1} sx={{ display: { xs: "block", sm: "block", md: "none", lg:"none" } }}>
          <img
            src={profileImage || suimage}
            alt="Portfolio"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography variant="h4" gutterBottom>
            Welcome to{" "}
            <span style={{ color: "yellow", fontWeight: 600 }}>
              MyPortfolio
            </span>
          </Typography>
          <Typography variant="body1" paragraph textAlign={"justify"}>
            {typedText || "Loading..."}
          </Typography>
          <Button variant="contained" style={buttonStyle} onClick={() => handleViewMore()}>
            View Projects
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={5.1} lg={5.1} sx={{ display: { xs: "none", sm: "none", md: "block", lg:"block" } }}>
          <img
            src={profileImage || suimage}
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