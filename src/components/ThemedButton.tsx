import React from "react";
import theme from "./../themes/theme";

interface ThemedButtonProps {
  themeMode: "dark" | "light";
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ themeMode }) => {
  const buttonStyle = {
    fontSize: theme[themeMode].fontSize.md,
    borderRadius: theme[themeMode].borderRadius.medium,
    background: theme[themeMode].custom.primary,
    color: theme[themeMode].custom.text,
    padding: "10px 20px",
  };

  return <button style={buttonStyle}>Themed Button</button>;
};

export default ThemedButton;
