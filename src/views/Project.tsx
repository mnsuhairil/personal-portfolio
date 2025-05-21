import {
  Container,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import theme from "../themes/theme";
import app from "../firebase";
import AllProjectsPage from "./AllProjectsPage"; // Import the dialog logic

interface ProjectPageProps {
  themeMode: "dark" | "light";
}

interface Project {
  name: string;
  description: string;
  priority: number;
  images: string[];
  repository_link: string;
  youtube_link: string;
  timeline: { start: string; end: string };
}

const ProjectPage: React.FC<ProjectPageProps> = ({ themeMode }) => {
  const [, setProjects] = useState<Project[]>([]);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [topProjects, setTopProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogProject, setDialogProject] = useState<Project | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md"));

  useEffect(() => {
    const db = getDatabase(app);
    const projectsRef = ref(db, "personalAppDatabase/projects");
    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      const projectArray: Project[] = Object.values(data).map(
        (project: any) => ({
          name: project.name,
          description: project.description,
          priority: project.priority,
          images: project.images || [],
          repository_link: project.repository_link,
          youtube_link: project.youtube_link,
          timeline: project.timeline,
        })
      );

      projectArray.sort((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority;
        return a.name.localeCompare(b.name);
      });

      setProjects(projectArray);
      setTopProjects(projectArray.slice(0, 6));
    });
  }, []);

  useEffect(() => {
    if (topProjects.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.5 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [topProjects]);

  const pageStyle = {
    paddingTop: isMobile ? "20px" : "50px",
    paddingBottom: isMobile ? "20px" : "50px",
    color: theme[themeMode].custom.text,
    width: "100%",
    boxSizing: "border-box" as const,
  };
  const buttonStyle = {
    textAlign: "center",
    marginTop: isMobile ? "16px" : "30px",
    backgroundColor: theme[themeMode].custom.primary,
    color: theme[themeMode].custom.text,
  };

  const hiddenStyle = {
    opacity: 0,
    transform: "translateX(100px)",
    transition: "opacity 1s ease-out, transform 1s ease-out",
  };

  const visibleStyle = {
    opacity: 1,
    transform: "translateX(0)",
    transition: "opacity 1s ease-out, transform 1s ease-out",
  };

  const handleViewMore = () => {
    window.location.href = "/all-projects";
  };

  const handleProjectClick = (project: Project) => {
    setDialogProject(project);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogProject(null);
  };

  return (
    <Container style={pageStyle} maxWidth="lg">
      <Grid
        container
        columnSpacing={isMobile ? 2 : isTablet ? 5 : 10}
        rowSpacing={isMobile ? 2 : 5}
      >
        {topProjects.map((project, index) => (
          <Grid
            item
            // key={project.name}
            xs={12}
            sm={12}
            md={6}
            lg={6}
            style={{
              position: "relative",
              ...(visibleItems.includes(index) ? visibleStyle : hiddenStyle),
              cursor: "pointer",
            }}
            ref={(el) => (projectRefs.current[index] = el)}
            data-index={index}
            className="image-container"
            onClick={() => handleProjectClick(project)}
          >
            <div className="image-container" style={{ width: "100%" }}>
              <img
                className="project-image"
                src={
                  project.images[0] || "/src/assets/default-project-image.png"
                }
                alt={project.name}
                style={{
                  borderRadius: 20,
                  width: "100%",
                  height: isMobile ? "25vh" : isTablet ? "28vh" : "30vh",
                  minHeight: 120,
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              />
              <div
                className="overlay"
                style={{
                  position: "absolute",
                  top: isMobile ? "35%" : "40%",
                  left: isMobile ? "0%" : "6%",
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  zIndex: 1,
                  width: isMobile ? "80%" : "auto",
                }}
              >
                <Typography
                  className="project-title"
                  style={{
                    zIndex: 1,
                    color: "#ffffff",
                    fontSize: isMobile ? "1rem" : "1.5rem",
                    fontWeight: 600,
                    maxWidth: isMobile ? "90vw" : "8em",
                    borderLeft: "2px solid",
                    borderBottom: "2px solid",
                    borderColor: "yellow",
                    padding: isMobile ? "0.5em" : "1em",
                    borderRadius: "0 0 5px 5px",
                  }}
                >
                  {project.name}
                </Typography>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      <Button
        style={buttonStyle as React.CSSProperties}
        variant="contained"
        sx={{
          width: "50%",
          marginTop: isMobile ? "20px" : "30px",
          marginBottom: isMobile ? "20px" : "30px",
          backgroundColor: theme[themeMode].custom.primary,
          color: theme[themeMode].custom.text,
          display: "block",
          margin: "auto",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor =
            theme[themeMode].custom.secondary;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor =
            theme[themeMode].custom.primary;
        }}
        onFocus={(e) => {
          e.currentTarget.style.backgroundColor =
            theme[themeMode].custom.secondary;
        }}
        onBlur={(e) => {
          e.currentTarget.style.backgroundColor =
            theme[themeMode].custom.primary;
        }}
        onClick={(e) => {
          e.preventDefault();
          handleViewMore();
        }}
      >
        View More
      </Button>

      {/* Use AllProjectsPage dialog logic for project details */}
      {dialogProject && (
        <AllProjectsPage
          themeMode={themeMode}
          selectedProject={dialogProject}
          onCloseDialog={handleCloseDialog}
          dialogOnly
        />
      )}
    </Container>
  );
};

export default ProjectPage;