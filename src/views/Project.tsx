import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import theme from "../themes/theme";

interface HomePageProps {
  themeMode: "dark" | "light";
}

const ProjectPage: React.FC<HomePageProps> = ({ themeMode }) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]); // Track visible items
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]); // Refs for each project

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])]); // Add visible item
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the item is visible
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  const pageStyle = {
    paddingTop: "50px",
    minHeight: "91.5vh",
    minWeight: "100%",
    color: theme[themeMode].custom.text,
  };

  const hiddenStyle = {
    opacity: 0,
    transform: "translateX(100px)", // Start 100px to the right
    transition: "opacity 1s ease-out, transform 1s ease-out", // Smooth transition
  };

  const visibleStyle = {
    opacity: 1,
    transform: "translateX(0)", // Move to the original position
    transition: "opacity 1s ease-out, transform 1s ease-out", // Smooth transition
  };

  const items = Array.from({ length: 6 }, (_, index) => index + 1);

  return (
    <Container style={pageStyle}>
      <Grid container columnSpacing={10} rowSpacing={5}>
        {items.map((item, index) => (
          <Grid
            item
            key={item}
            xs={12}
            sm={12}
            md={6}
            lg={6}
            style={{
              position: "relative",
              ...(visibleItems.includes(index) ? visibleStyle : hiddenStyle), // Apply animation styles
            }}
            ref={(el) => (projectRefs.current[index] = el)} // Assign ref to each project
            data-index={index} // Add index for tracking
            className="image-container" // Keep hover animation class
          >
            <div className="image-container">
              <img
                className="project-image"
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
                  }}
                >
                  Project Title {item}
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
