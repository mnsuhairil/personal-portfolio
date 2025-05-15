import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  useTheme,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "../firebase";
import theme from "../themes/theme";
import CloseIcon from "@mui/icons-material/Close";
import Skeleton from "@mui/material/Skeleton";

interface Project {
  name: string;
  description: string;
  priority: number;
  images: string[];
  repository_link: string;
  youtube_link: string;
  timeline: { start: string; end?: string };
  project_type?: string;
  core?: string;
}

interface AllProjectsPageProps {
  themeMode: "dark" | "light";
  selectedProject?: Project | null;
  onCloseDialog?: () => void;
  dialogOnly?: boolean;
}

const AllProjectsPage: React.FC<AllProjectsPageProps> = ({
  themeMode,
  selectedProject: propSelectedProject,
  onCloseDialog,
  dialogOnly,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [search, setSearch] = useState("");
  const [slideIndexes, setSlideIndexes] = useState<{ [key: string]: number }>({});
  const [dialogSlideIndex, setDialogSlideIndex] = useState(0);

  // For maximize feature
  const [fullImageOpen, setFullImageOpen] = useState(false);
  const [fullImageSrc, setFullImageSrc] = useState<string | null>(null);
  const [fullImageIndex, setFullImageIndex] = useState<number>(0);

  const [loading, setLoading] = useState(true);

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  // If dialogOnly, use the passed-in selectedProject
  useEffect(() => {
    if (dialogOnly && propSelectedProject) {
      setSelectedProject(propSelectedProject);
      setDialogSlideIndex(0);
    }
  }, [dialogOnly, propSelectedProject]);

  // Fetch projects only if not dialogOnly
  useEffect(() => {
    if (dialogOnly) return;
    setLoading(true);
    const db = getDatabase(app);
    const projectsRef = ref(db, "personalAppDatabase/projects");
    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setLoading(false);
        return;
      }
      const projectArray: Project[] = Object.values(data).map((project: any) => ({
        name: project.name,
        description: project.description,
        priority: project.priority,
        images: project.images || [],
        repository_link: project.repository_link,
        youtube_link: project.youtube_link,
        timeline: project.timeline,
        project_type: project.project_type,
        core: project.core,
      }));
      // Sort by priority, then name
      projectArray.sort((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority;
        return a.name.localeCompare(b.name);
      });
      setProjects(projectArray);

      // Initialize slide indexes for each project
      const indexes: { [key: string]: number } = {};
      projectArray.forEach((p, idx) => {
        indexes[p.name + idx] = 0;
      });
      setSlideIndexes(indexes);
      setLoading(false);
    });
  }, [dialogOnly]);

  // Auto slideshow for cards
  useEffect(() => {
    if (dialogOnly) return;
    const interval = setInterval(() => {
      setSlideIndexes((prev) => {
        const updated: typeof prev = { ...prev };
        projects.forEach((project, idx) => {
          const key = project.name + idx;
          const images = project.images || [];
          if (images.length > 1) {
            updated[key] = ((prev[key] || 0) + 1) % images.length;
          }
        });
        return updated;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [projects, dialogOnly]);

  // Stop dialog slideshow when dialog is open
  useEffect(() => {
    if (!selectedProject || !selectedProject.images?.length) return;
    setDialogSlideIndex(0);
    // No interval for dialog slideshow (manual only)
  }, [selectedProject]);

  // Filtered projects
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase()) ||
    project.description.toLowerCase().includes(search.toLowerCase()) ||
    (project.project_type || "").toLowerCase().includes(search.toLowerCase()) ||
    (project.core || "").toLowerCase().includes(search.toLowerCase())
  );

  const cardStyle = {
    background: theme[themeMode].custom.background,
    color: theme[themeMode].custom.text,
    border: `1.5px solid ${theme[themeMode].custom.border}`,
    borderRadius: 5,
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    transition: "transform 0.2s, box-shadow 0.2s",
    minHeight: 380,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    "&:hover": {
      transform: "translateY(-8px) scale(1.03)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      borderColor: theme[themeMode].custom.secondary,
    },
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleClosePopup = () => {
    setSelectedProject(null);
  };

  // Open full image and set index
  const openFullImage = (image: string, index: number) => {
    setFullImageSrc(image);
    setFullImageIndex(index);
    setFullImageOpen(true);
  };

  // Handle left/right navigation in full image dialog
  const handleFullImageNav = (direction: "left" | "right") => {
    if (!selectedProject) return;
    const total = selectedProject.images.length;
    let newIndex = fullImageIndex;
    if (direction === "left") {
      newIndex = (fullImageIndex - 1 + total) % total;
    } else {
      newIndex = (fullImageIndex + 1) % total;
    }
    setFullImageIndex(newIndex);
    setFullImageSrc(selectedProject.images[newIndex]);
  };

  // If dialogOnly, render only the dialog for the selected project
  if (dialogOnly && selectedProject) {
    return (
      <>
        <Dialog
          open={!!selectedProject}
          onClose={onCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            style: {
              width: isMobile ? "98vw" : undefined,
              margin: isMobile ? 4 : undefined,
            },
          }}
        >
          <DialogTitle>
            {selectedProject.name}
            <IconButton
              aria-label="close"
              onClick={onCloseDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "#fff",
                background: "rgba(0,0,0,0.5)",
                zIndex: 20,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {/* Slideshow in dialog */}
            {selectedProject.images && selectedProject.images.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                  position: "relative",
                }}
              >
                <img
                  src={selectedProject.images[dialogSlideIndex]}
                  alt={`Project ${selectedProject.name} Image`}
                  style={{
                    width: isMobile ? "180px" : "300px",
                    height: isMobile ? "180px" : "300px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
                {/* Maximize icon on main image */}
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    "&:hover": { background: "rgba(0,0,0,0.7)" },
                  }}
                  onClick={() => openFullImage(selectedProject.images[dialogSlideIndex], dialogSlideIndex)}
                >
                  <ZoomInIcon />
                </IconButton>
              </Box>
            )}
            <Typography variant="body1" gutterBottom>
              {selectedProject.description}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Priority:</strong> {selectedProject.priority}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Timeline:</strong> {selectedProject.timeline.start}
              {selectedProject.timeline.end
                ? ` - ${selectedProject.timeline.end}`
                : ""}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Repository:</strong>{" "}
              <a
                href={selectedProject.repository_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ wordBreak: "break-all" }}
              >
                {selectedProject.repository_link}
              </a>
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>YouTube:</strong>{" "}
              <a
                href={selectedProject.youtube_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ wordBreak: "break-all" }}
              >
                {selectedProject.youtube_link}
              </a>
            </Typography>
            {/* Thumbnails with maximize on hover */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "20px",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              {selectedProject.images.map((image, idx) => (
                <Box
                  key={idx}
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    "&:hover .zoom-icon": {
                      opacity: 1,
                    },
                  }}
                >
                  <img
                    src={image}
                    alt={`Project ${selectedProject.name} Image ${idx + 1}`}
                    style={{
                      width: isMobile ? "80px" : "100px",
                      height: isMobile ? "80px" : "100px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      border: dialogSlideIndex === idx ? `2px solid ${theme[themeMode].custom.secondary}` : "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setDialogSlideIndex(idx)}
                  />
                  <IconButton
                    className="zoom-icon"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#fff",
                      background: "rgba(0,0,0,0.5)",
                      borderRadius: "50%",
                      fontSize: 32,
                      opacity: 0,
                      transition: "opacity 0.2s",
                      cursor: "pointer",
                      zIndex: 2,
                      p: 0.5,
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      openFullImage(image, idx);
                    }}
                  >
                    <ZoomInIcon fontSize="medium" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </DialogContent>
        </Dialog>
        {/* Full Image Dialog with left/right navigation */}
        <Dialog
          open={fullImageOpen}
          onClose={() => setFullImageOpen(false)}
          maxWidth={false}
          fullScreen
          PaperProps={{
            style: {
              background: "rgba(0,0,0,0.85)",
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              minWidth: isMobile ? "320px" : "900px",
              minHeight: isMobile ? "200px" : "600px",
              position: "relative",
              p: 2,
            }}
          >
            {/* Close Button */}
            <IconButton
              aria-label="close"
              onClick={() => setFullImageOpen(false)}
              sx={{
                position: "absolute",
                top: "2%",
                right: "1%",
                color: "#fff",
                background: "rgba(0,0,0,0.5)",
                zIndex: 20,
              }}
            >
              <CloseIcon sx={{ fontSize: 32 }} />
            </IconButton>
            {/* Left Arrow */}
            {!isMobile && selectedProject && selectedProject.images.length > 1 && (
              <IconButton
                sx={{
                  color: "#fff",
                  background: "rgba(0,0,0,0.4)",
                  "&:hover": { background: "rgba(0,0,0,0.7)" },
                  zIndex: 10,
                  mr: 2,
                }}
                onClick={() => handleFullImageNav("left")}
              >
                <ArrowBackIosNewIcon fontSize="large" />
              </IconButton>
            )}
            {/* Image */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: isMobile ? "200px" : "600px",
              }}
            >
              {fullImageSrc && (
                <img
                  src={fullImageSrc}
                  alt="Full Project"
                  style={{
                    maxWidth: "98vw",
                    maxHeight: "95vh",
                    borderRadius: 12,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              )}
            </Box>
            {/* Right Arrow */}
            {!isMobile && selectedProject && selectedProject.images.length > 1 && (
              <IconButton
                sx={{
                  color: "#fff",
                  background: "rgba(0,0,0,0.4)",
                  "&:hover": { background: "rgba(0,0,0,0.7)" },
                  zIndex: 10,
                  ml: 2,
                }}
                onClick={() => handleFullImageNav("right")}
              >
                <ArrowForwardIosIcon fontSize="large" />
              </IconButton>
            )}
          </Stack>
        </Dialog>
      </>
    );
  }

  // Default: render the full page with grid/cards
  return (
    <Container maxWidth="xl" sx={{ width: "100vw" , py: isMobile ? 2 : 6 }}>
      {/* Title and description */}
      <Typography
        variant={isMobile ? "h4" : "h2"}
        align="center"
        gutterBottom
        sx={{
          fontWeight: 800,
          color: theme[themeMode].custom.text,
          mb: 1,
          letterSpacing: 2,
        }}
      >
        My Projects
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        gutterBottom
        sx={{
          color: theme[themeMode].custom.text,
          mb: isMobile ? 2 : 4,
          maxWidth: 700,
          mx: "auto",
        }}
      >
        Explore a collection of my works, ranging from web apps to mobile solutions. Each project highlights my skills, creativity, and passion for building impactful digital experiences.
      </Typography>
      {/* Search bar */}
      <Box sx={{ mb: isMobile ? 2 : 4, maxWidth: 400, mx: "auto" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme[themeMode].custom.secondary }} />
              </InputAdornment>
            ),
            sx: {
              background: theme[themeMode].custom.background,
              color: theme[themeMode].custom.text,
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme[themeMode].custom.border,
              },
            },
          }}
        />
      </Box>
      <Grid container spacing={isMobile ? 2 : 4}>
        {loading
          ? Array.from({ length: isMobile ? 2 : 8 }).map((_, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <Card sx={cardStyle} elevation={0}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={isMobile ? 140 : 180}
                    sx={{
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                      bgcolor: themeMode === "dark" ? "#DDDDDD" : "#e0e0e0", // More visible on dark
                    }}
                  />
                  <CardContent>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width="60%"
                      height={32}
                      sx={{
                        bgcolor: themeMode === "dark" ? "#DDDDDD" : "#e0e0e0",
                      }}
                    />
                    <Box sx={{ mb: 1 }}>
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={80}
                        height={24}
                        sx={{
                          mr: 1,
                          display: "inline-block",
                          bgcolor: themeMode === "dark" ? "#DDDDDD" : "#e0e0e0",
                        }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={60}
                        height={24}
                        sx={{
                          display: "inline-block",
                          bgcolor: themeMode === "dark" ? "#DDDDDD" : "#e0e0e0",
                        }}
                      />
                    </Box>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width="100%"
                      height={20}
                      sx={{
                        bgcolor: themeMode === "dark" ? "#DDDDDD" : "#e0e0e0",
                      }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width="80%"
                      height={20}
                      sx={{
                        bgcolor: themeMode === "dark" ? "#DDDDDD" : "#e0e0e0",
                      }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width="40%"
                      height={16}
                      sx={{
                        bgcolor: themeMode === "dark" ? "#DDDDDD" : "#e0e0e0",
                      }}
                    />
                  </CardContent>
                  <CardActions sx={{ mt: "auto", px: 2, pb: 2 }}>
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={60}
                      height={32}
                      sx={{
                        mr: 1,
                        bgcolor: themeMode === "dark" ? "#DDDDDD" : "#e0e0e0",
                      }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={80}
                      height={32}
                      sx={{
                        bgcolor: themeMode === "dark" ? "#DDDDDD" : "#e0e0e0",
                      }}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))
          : filteredProjects.map((project, idx) => {
              const key = project.name + idx;
              const images = project.images && project.images.length > 0 ? project.images : ["/src/assets/project-image-1.png"];
              const slideIndex = slideIndexes[key] || 0;
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                  <Card
                    sx={cardStyle}
                    onClick={() => handleProjectClick(project)}
                    style={{ cursor: "pointer", minHeight: 380 }}
                    elevation={0}
                  >
                    <CardMedia
                      component="img"
                      height={isMobile ? 140 : 180}
                      image={images[slideIndex]}
                      alt={project.name}
                      sx={{
                        objectFit: "cover",
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        borderBottom: `2px solid ${theme[themeMode].custom.border}`,
                      }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: 600,
                          color: theme[themeMode].custom.text,
                          mb: 1,
                        }}
                      >
                        {project.name}
                      </Typography>
                      <Box sx={{ mb: 1 }}>
                        {project.project_type && (
                          <Chip
                            label={project.project_type}
                            size="small"
                            sx={{
                              mr: 1,
                              background: theme[themeMode].custom.secondary,
                              color: theme[themeMode].custom.primary,
                              fontWeight: 600,
                            }}
                          />
                        )}
                        {project.core && (
                          <Chip
                            label={project.core}
                            size="small"
                            sx={{
                              background: theme[themeMode].custom.primary,
                              color: theme[themeMode].custom.text,
                              fontWeight: 600,
                            }}
                          />
                        )}
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          color: theme[themeMode].custom.text,
                          minHeight: 60,
                          mb: 1,
                        }}
                      >
                        {project.description.length > 100
                          ? project.description.slice(0, 100) + "..."
                          : project.description}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme[themeMode].custom.secondary,
                        }}
                      >
                        {project.timeline?.start}
                        {project.timeline?.end ? ` - ${project.timeline.end}` : ""}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ mt: "auto", px: 2, pb: 2 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        href={project.repository_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          borderColor: theme[themeMode].custom.secondary,
                          color: theme[themeMode].custom.secondary,
                          fontWeight: 600,
                          mr: 1,
                          "&:hover": {
                            background: theme[themeMode].custom.secondary,
                            color: theme[themeMode].custom.primary,
                          },
                        }}
                        onClick={e => e.stopPropagation()}
                      >
                        Repo
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        href={project.youtube_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          borderColor: theme[themeMode].custom.secondary,
                          color: theme[themeMode].custom.secondary,
                          fontWeight: 600,
                          "&:hover": {
                            background: theme[themeMode].custom.secondary,
                            color: theme[themeMode].custom.primary,
                          },
                        }}
                        onClick={e => e.stopPropagation()}
                      >
                        YouTube
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
      </Grid>
      {/* Project Details Dialog */}
      <Dialog
        open={!!selectedProject}
        onClose={handleClosePopup}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            width: isMobile ? "98vw" : undefined,
            margin: isMobile ? 4 : undefined,
          },
        }}
      >
        {selectedProject && (
          <>
            <DialogTitle>{selectedProject.name}</DialogTitle>
            <DialogContent>
              {/* Slideshow in dialog */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                    position: "relative",
                  }}
                >
                  <img
                    src={selectedProject.images[dialogSlideIndex]}
                    alt={`Project ${selectedProject.name} Image`}
                    style={{
                      width: isMobile ? "180px" : "300px",
                      height: isMobile ? "180px" : "300px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                  {/* Maximize icon on main image */}
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      background: "rgba(0,0,0,0.5)",
                      color: "#fff",
                      "&:hover": { background: "rgba(0,0,0,0.7)" },
                    }}
                    onClick={() => openFullImage(selectedProject.images[dialogSlideIndex], dialogSlideIndex)}
                  >
                    <ZoomInIcon />
                  </IconButton>
                </Box>
              )}
              <Typography variant="body1" gutterBottom>
                {selectedProject.description}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Priority:</strong> {selectedProject.priority}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Timeline:</strong> {selectedProject.timeline.start}
                {selectedProject.timeline.end
                  ? ` - ${selectedProject.timeline.end}`
                  : ""}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Repository:</strong>{" "}
                <a
                  href={selectedProject.repository_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ wordBreak: "break-all" }}
                >
                  {selectedProject.repository_link}
                </a>
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>YouTube:</strong>{" "}
                <a
                  href={selectedProject.youtube_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ wordBreak: "break-all" }}
                >
                  {selectedProject.youtube_link}
                </a>
              </Typography>
              {/* Thumbnails with maximize on hover */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "20px",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                {selectedProject.images.map((image, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      "&:hover .zoom-icon": {
                        opacity: 1,
                      },
                    }}
                  >
                    <img
                      src={image}
                      alt={`Project ${selectedProject.name} Image ${idx + 1}`}
                      style={{
                        width: isMobile ? "80px" : "100px",
                        height: isMobile ? "80px" : "100px",
                        borderRadius: "10px",
                        objectFit: "cover",
                        border: dialogSlideIndex === idx ? `2px solid ${theme[themeMode].custom.secondary}` : "none",
                        cursor: "pointer",
                      }}
                      onClick={() => setDialogSlideIndex(idx)}
                    />
                    <IconButton
                      className="zoom-icon"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#fff",
                        background: "rgba(0,0,0,0.5)",
                        borderRadius: "50%",
                        fontSize: 32,
                        opacity: 0,
                        transition: "opacity 0.2s",
                        cursor: "pointer",
                        zIndex: 2,
                        p: 0.5,
                      }}
                      onClick={e => {
                        e.stopPropagation();
                        openFullImage(image, idx);
                      }}
                    >
                      <ZoomInIcon fontSize="medium" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
      {/* Full Image Dialog with left/right navigation */}
      <Dialog
        open={fullImageOpen}
        onClose={() => setFullImageOpen(false)}
        maxWidth={false}
        fullScreen
        PaperProps={{
          style: {
            background: "rgba(0,0,0,0.85)",
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            minWidth:"98%", // consistent width for all images
            minHeight: "95%", // consistent height for all images
            width: "100%",
            height: "100%",
            position: "relative",
            p: 2,
          }}
        >
          {/* Close Button */}
          <IconButton
            aria-label="close"
            onClick={() => setFullImageOpen(false)}
            sx={{
              position: "absolute",
              top: "2%",
              right: "1%",
              color: "#fff",
              background: "rgba(0,0,0,0.5)",
              zIndex: 20,
            }}
          >
            <CloseIcon sx={{ fontSize: 32 }} />
          </IconButton>
          {/* Left Arrow */}
          {!isMobile && selectedProject && selectedProject.images.length > 1 && (
            <IconButton
              sx={{
                color: "#fff",
                background: "rgba(0,0,0,0.4)",
                "&:hover": { background: "rgba(0,0,0,0.7)" },
                zIndex: 10,
                mr: 2,
              }}
              onClick={() => handleFullImageNav("left")}
            >
              <ArrowBackIosNewIcon fontSize="large" />
            </IconButton>
          )}
          {/* Image */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: isMobile ? "200px" : "600px",
            }}
          >
            {fullImageSrc && (
              <img
                src={fullImageSrc}
                alt="Full Project"
                style={{
                  maxWidth: "98vw",
                  maxHeight: "95vh",
                  borderRadius: 12,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            )}
          </Box>
          {/* Right Arrow */}
          {!isMobile && selectedProject && selectedProject.images.length > 1 && (
            <IconButton
              sx={{
                color: "#fff",
                background: "rgba(0,0,0,0.4)",
                "&:hover": { background: "rgba(0,0,0,0.7)" },
                zIndex: 10,
                ml: 2,
              }}
              onClick={() => handleFullImageNav("right")}
            >
              <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
          )}
        </Stack>
      </Dialog>
    </Container>
  );
};

export default AllProjectsPage;