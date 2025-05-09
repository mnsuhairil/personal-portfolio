// App.tsx
import React from "react";
import Header from "./components/Header";
import theme from "./themes/theme";
import HomePage from "./views/Home";
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
import ProjectPage from "./views/Project";
import AboutPage from "./views/About";
const App: React.FC = () => {
  const themeMode = "dark";

  const appStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: theme[themeMode].custom.background,
    color: theme[themeMode].custom.text,
  };
  const timelineTextStyle = {
    color: theme[themeMode].custom.text,
  };
  const TimelineConnectorStyle = {
    backgroundColor: "yellow",
  };

  return (
    <div style={appStyle}>
      <Header themeMode={themeMode} />
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: { sx: "0", sm: "3rem", md: "6rem" },
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={TimelineConnectorStyle} />
            <TimelineConnector sx={TimelineConnectorStyle} />
          </TimelineSeparator>
          <TimelineContent sx={timelineTextStyle}>
            <span style={{ fontStyle: "italic" }}>
              Home <span>{"/>"}</span>
            </span>
            <HomePage themeMode={themeMode} />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={TimelineConnectorStyle} />
            <TimelineConnector sx={TimelineConnectorStyle} />
          </TimelineSeparator>
          <TimelineContent sx={timelineTextStyle}>
            <span style={{ fontStyle: "italic" }}>
              Project <span>{"/>"}</span>
            </span>
            <ProjectPage themeMode={themeMode} />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={TimelineConnectorStyle} />
            <TimelineConnector sx={TimelineConnectorStyle} />
          </TimelineSeparator>
          <TimelineContent sx={timelineTextStyle}>
            <span style={{ fontStyle: "italic" }}>
              About <span>{"/>"}</span>
            </span>
            <AboutPage themeMode={themeMode} />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={TimelineConnectorStyle} />
            <TimelineConnector sx={TimelineConnectorStyle} />
          </TimelineSeparator>
          <TimelineContent sx={timelineTextStyle}>
            <span style={{ fontStyle: "italic" }}>
              Contact <span>{"/>"}</span>
            </span>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
};

export default App;
