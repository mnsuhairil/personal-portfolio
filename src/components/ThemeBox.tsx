// ThemedBox.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "./../themes/theme";

const ThemedBox = ({ themeMode }) => {
  const currentTheme = theme[themeMode];

  return (
    <Box
      sx={{
        backgroundColor: currentTheme.color.secondary,
        padding: "16px",
        borderRadius: currentTheme.borderRadius.medium,
      }}
    >
      <Typography variant="h6" component="div">
        Themed Box
      </Typography>
      <Typography variant="body1" component="div">
        This box uses the selected theme.
      </Typography>
    </Box>
  );
};

export default ThemedBox;
