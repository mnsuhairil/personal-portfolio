import React, { useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import theme from "./themes/theme";
import HomePage from "./views/Home";
import ProjectPage from "./views/Project";
import AboutPage from "./views/About";
import "./App.css";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineItemClasses,
} from "@mui/lab";
import AllProjectsPage from "./views/AllProjectsPage";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const themeMode = "dark";
  const navigate = useNavigate();

  // Create refs for each section
  const homeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Navigation handler
  const handleNavigate = (section: string) => {
    if (section === "home" && homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "projects" && projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "about" && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "contact" && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "all-projects") {
      navigate("/personal-portfolio/all-projects");
    }
  };

  const appStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: theme[themeMode].custom.background,
    color: theme[themeMode].custom.text,
    overflowX: "hidden",
    width: "100%",
  };

  const timelineTextStyle = {
    color: theme[themeMode].custom.text,
  };

  const TimelineConnectorStyle = {
    backgroundColor: "yellow",
  };

  return (
    <div style={appStyle as React.CSSProperties}>
      <Header themeMode={themeMode} onNavigate={handleNavigate} />
      <Routes>
        <Route
          path="/"
          element={
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: { xs: "0", sm: "3rem", md: "6rem" },
                },
              }}
            >
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot sx={TimelineConnectorStyle} />
                  <TimelineConnector sx={TimelineConnectorStyle} />
                </TimelineSeparator>
                <TimelineContent sx={timelineTextStyle}>
                  <div ref={homeRef}>
                    <span style={{ fontStyle: "italic" }}>
                      Home <span>{"/>"}</span>
                    </span>
                    <HomePage themeMode={themeMode} />
                  </div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot sx={TimelineConnectorStyle} />
                  <TimelineConnector sx={TimelineConnectorStyle} />
                </TimelineSeparator>
                <TimelineContent sx={timelineTextStyle}>
                  <div ref={projectsRef}>
                    <span style={{ fontStyle: "italic" }}>
                      Project <span>{"/>"}</span>
                    </span>
                    <ProjectPage themeMode={themeMode} />
                  </div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot sx={TimelineConnectorStyle} />
                  <TimelineConnector sx={TimelineConnectorStyle} />
                </TimelineSeparator>
                <TimelineContent sx={timelineTextStyle}>
                  <div ref={aboutRef}>
                    <span style={{ fontStyle: "italic" }}>
                      About <span>{"/>"}</span>
                    </span>
                    <AboutPage themeMode={themeMode} />
                  </div>
                </TimelineContent>
              </TimelineItem>
              {/* Removed Contact TimelineItem */}
            </Timeline>
          }
        />
        <Route
          path="/personal-portfolio/all-projects"
          element={<AllProjectsPage themeMode={themeMode} />}
        />
      </Routes>
      <Footer themeMode={themeMode} />
    </div>
  );
};

export default App;