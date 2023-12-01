// HomePage.tsx
import { Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import theme from "../themes/theme";

interface HomePageProps {
  themeMode: "dark" | "light";
}

const ProjectPage: React.FC<HomePageProps> = ({ themeMode }) => {
  const pageStyle = {
    paddingTop: "50px",
    minHeight: "91.5vh",
    minWeight: "100%",
    // textAlign: "center",
    color: theme[themeMode].custom.text,
  };

  const items = Array.from({ length: 6 }, (_, index) => index + 1);

  return (
    <Container style={pageStyle}>
      <Grid container columnSpacing={10} rowSpacing={5}>
        {items.map((item) => (
          <Grid
            item
            key={item}
            xs={12}
            sm={12}
            md={6}
            lg={6}
            style={{ position: "relative" }}
          >
            <div className="image-container">
              <img
                className="project-image"
                // src={`/src/assets/project-image-${item}.png`}
                src={`/src/assets/project-image-2.png`}
                alt={`Image ${item}`}
                style={{
                  borderRadius: 20,
                  width: "100%",
                  height: "auto",
                }}
              />
              <div
                className="overlay"
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "6%",
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  zIndex: 1,
                }}
              >
                <Typography
                  className="project-title"
                  style={{
                    zIndex: 1,
                    color: "#ffffff",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    maxWidth: "8em",
                    borderLeft: "2px solid",
                    borderBottom: "2px solid",
                    borderColor: "yellow",
                    padding: "1em",
                    // background: `rgba(0, 0, 0,0.5)`,
                  }}
                >
                  Bus Locator Mobile App {item}
                </Typography>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProjectPage;
