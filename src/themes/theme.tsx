const darkTheme = {
  primary: "#1f1f01",
  secondary: "#FFCC00",
  border: "#FFCC00",
  text: "#ffffffff",
  background: "#1f1f01",
  indicator: "#FFCC00",
};

const lightTheme = {
  primary: "#003366",
  secondary: "#eee",
  border: "#878787",
  text: "#000",
  background: "#fff",
  indicator: "#ccc",
};

const defaultTheme = {
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
  },
  borderRadius: {
    small: "5px",
    medium: "10px",
    large: "15px",
    circle: "50%",
  },
};

const theme = {
  dark: {
    custom: darkTheme,
    ...defaultTheme,
  },
  light: {
    custom: lightTheme,
    ...defaultTheme,
  },
};

export default theme;
