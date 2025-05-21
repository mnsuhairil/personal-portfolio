import React, { useState, useEffect } from "react";
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
  GitHub,
  LinkedIn,
  YouTube,
} from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp"; // Add this import
import theme from "../themes/theme";
import { getDatabase, ref, push, get } from "firebase/database";
import app from "../firebase";

const db = getDatabase(app);

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

const Footer: React.FC<{ themeMode: "dark" | "light" }> = ({ themeMode }) => {
  const [form, setForm] = useState({
    Name: "",
    Email: "",
    Telephone: "",
    Comment: "",
  });
  const [loading, setLoading] = useState(false);

  // State for biodata
  const [contact, setContact] = useState({
    phone_number: "",
    address_home: "",
    email: "",
  });

  useEffect(() => {
    const fetchBiodata = async () => {
      const biodataRef = ref(db, "personalAppDatabase/portfolio_web_data/Biodata");
      const snapshot = await get(biodataRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setContact({
          phone_number: data.phone_number || "",
          address_home: data.address_home || "",
          email: data.email || "",
        });
      }
    };
    fetchBiodata();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await push(ref(db, "personalAppDatabase/comments"), {
        ...form,
        read: false,
      });
      setForm({ Name: "", Email: "", Telephone: "", Comment: "" });
      alert("Comment submitted!");
    } catch (err) {
      alert("Failed to submit comment.");
    }
    setLoading(false);
  };

  // Format WhatsApp link
  const whatsappNumber = contact.phone_number
    ? `60${contact.phone_number.replace(/^0+/, "")}`
    : "";
  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : "#";

  return (
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
      {/* First Row: Centered CONTACT ME */}
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
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: { xs: "center", md: "flex-start" },
            flexDirection: { xs: "column", md: "column" },
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Getting in touch is easy!
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Phone fontSize="small" />
              <Typography variant="body1">
                {contact.phone_number
                  ? `+60${contact.phone_number.replace(/^0+/, "")}`
                  : "+60"}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <LocationOn fontSize="small" />
              <Typography variant="body1">
                {contact.address_home || "Address not available"}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Email fontSize="small" />
              <Typography variant="body1">
                <Link
                  href={`mailto:${contact.email}`}
                  color="inherit"
                  underline="hover"
                >
                  {contact.email || "Email not available"}
                </Link>
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton color="inherit" href="https://youtube.com/@m.nsuhairil8477?si=D1Lt7R2hiUlheNUZ">
                <YouTube />
              </IconButton>
              <IconButton color="inherit" href="https://www.linkedin.com/in/mnsuhairil/">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" href="https://github.com/mnsuhairil">
                <GitHub />
              </IconButton>
              <IconButton color="inherit" href={whatsappLink} target="_blank" rel="noopener">
                <WhatsAppIcon />
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
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {["Name", "Email", "Telephone"].map((label) => (
                  <TextField
                    key={label}
                    name={label}
                    label={label}
                    variant="filled"
                    fullWidth
                    value={form[label as keyof typeof form]}
                    onChange={handleChange}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    sx={inputSx(themeMode)}
                  />
                ))}
                <TextField
                  name="Comment"
                  label="Comment"
                  variant="filled"
                  fullWidth
                  multiline
                  minRows={3}
                  value={form.Comment}
                  onChange={handleChange}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={inputSx(themeMode)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
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
                  {loading ? "Submitting..." : "SUBMIT"}
                </Button>
              </Stack>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;