import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Stack,
  IconButton,
  Grid,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  GitHub,
} from "@mui/icons-material";
import theme from "../themes/theme";

const inputSx = (themeMode: "dark" | "light") => ({
  "& .MuiFilledInput-root": {
    borderBottom: `2px solid ${theme[themeMode].custom.backgroundOverlay}`,
    borderRadius: 1,
    background: theme[themeMode].custom.backgroundOverlay,
    color: theme[themeMode].custom.text,
  },
  "& .MuiFilledInput-root.Mui-focused": {
    borderBottom: `2px solid ${theme[themeMode].custom.secondary}`,
    background: theme[themeMode].custom.backgroundOverlay,
    color: theme[themeMode].custom.text,
  },
  "& .MuiInputLabel-root": {
    color: theme[themeMode].custom.text,
  },
});

const Footer: React.FC<{ themeMode: "dark" | "light" }> = ({ themeMode }) => (
  <Box
    sx={{
      background: theme[themeMode].custom.background,
      color: theme[themeMode].custom.text,
      px: { xs: 2, md: 16 },
      py: { xs: 4, md: 6 },
      borderTop: `2px solid ${theme[themeMode].custom.border}`,
    }}
    component="footer"
  >
    {/* First Row: Centered CONTACT US */}
    <Box sx={{ width: "100%", mb: 4, textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          letterSpacing: 2,
          fontSize: { xs: "2.125rem", md: "3rem" },
        }}
      >
        CONTACT ME
      </Typography>
    </Box>
    {/* Second Row: 2 Columns */}
    <Grid container spacing={4} alignItems="stretch">
      {/* Left Side: Contact Info */}
      <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: { xs: "center", md: "flex-start" },
          flexDirection: { xs: "column", md: "column" }}}> 
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Getting in touch is easy!
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <Phone fontSize="small" />
            <Typography variant="body1">+123 456 789</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <LocationOn fontSize="small" />
            <Typography variant="body1">1234, Main Street Anywhere</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <Email fontSize="small" />
            <Typography variant="body1">
              <Link href="mailto:your@email.com" color="inherit" underline="hover">
                your@email.com
              </Link>
            </Typography>
          </Stack>
          {/* <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <Email fontSize="small" />
            <Typography variant="body1">
              <Link href="mailto:support@email.com" color="inherit" underline="hover">
                support@email.com
              </Link>
            </Typography>
          </Stack> */}
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <IconButton color="inherit" href="https://facebook.com">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" href="https://twitter.com">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" href="https://github.com">
              <GitHub />
            </IconButton>
          </Stack>
        </Box>
      </Grid>
      {/* Right Side: Contact Form */}
      <Grid item xs={12} md={6} sx={{ display: "flex" }}>
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: { xs: "100%", md: "100%" },
            mx: { xs: "auto", md: 0 },
          }}
        >
          <Stack spacing={2}>
            {["Name", "Email", "Telephone"].map((label) => (
              <TextField
                key={label}
                label={label}
                variant="filled"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                sx={inputSx(themeMode)}
              />
            ))}
            <TextField
              label="Comment"
              variant="filled"
              fullWidth
              multiline
              minRows={3}
              InputProps={{
                disableUnderline: true,
              }}
              sx={inputSx(themeMode)}
            />
            <Button
              variant="contained"
              sx={{
                background: theme[themeMode].custom.secondary,
                color: theme[themeMode].custom.text || "#fff",
                fontWeight: 700,
                letterSpacing: 1,
                "&:hover": {
                  background: theme[themeMode].custom.backgroundOverlay,
                },
              }}
            >
              SUBMIT
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default Footer;