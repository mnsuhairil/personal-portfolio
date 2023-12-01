// ThemedCard.jsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import theme from "./../themes/theme";


interface ThemedCardProps {
    themeMode: "dark" | "light";
  }

const ThemedCard = ({ themeMode }) => {
  const currentTheme = theme[themeMode];

  return (
    <Card
      sx={{
        backgroundColor: currentTheme.color.background,
        color: currentTheme.color.text,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          Themed Card
        </Typography>
        <Typography variant="body2" component="div">
          This card uses the selected theme.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ThemedCard;
