import { Container } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "../firebase"; // Import the initialized Firebase app
import theme from "../themes/theme";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // VS Code dark theme

interface AboutPageProps {
  themeMode: "dark" | "light";
}

const AboutPage: React.FC<AboutPageProps> = ({ themeMode }) => {
  const [typedText, setTypedText] = useState("");
  const [data, setData] = useState<any>(null);
  const [hasAnimated, setHasAnimated] = useState(false); // To ensure animation runs only once
  const aboutRef = useRef<HTMLDivElement>(null); // Reference to the About section

  useEffect(() => {
    // Fetch data from Firebase Realtime Database
    const db = getDatabase(app); // Use the initialized Firebase app
    const dataRef = ref(db, "personalAppDatabase/portfolio_web_data");
    onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      setData(fetchedData);
    });
  }, []);

  useEffect(() => {
    if (data && !hasAnimated) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            // Trigger animation when the About section is visible
            const fullText = `
                    class AboutMe {
                      biographical() {
                        this.name = '${data.Biodata?.name || "Unknown"}';
                        this.dateOfBirth = '${data.Biodata?.date || "Unknown"}';
                        this.email = '${data.Biodata?.email || "Unknown"}';
                        this.phoneNumber = '${
                          data.Biodata?.phone_number || "Unknown"
                        }';
                      }

                      workExperience() {
                        return [
                          ${Object.values(data.work_experiences || [])
                            .map(
                              (exp: any) => `{
                            company: '${exp.company_name || "Unknown"}',
                            position: '${exp.position || "Unknown"}',
                            startDate: '${exp.start_date || "Unknown"}',
                            endDate: '${exp.end_date || "Unknown"}'
                          }`
                            )
                            .join(",\n      ")}
                        ];
                      }

                      education() {
                        return [
                          ${Object.values(data.educations || [])
                            .map(
                              (edu: any) => `{
                            school: '${edu.school_name || "Unknown"}',
                            course: '${edu.course || "Unknown"}',
                            startYear: '${edu.start_year || "Unknown"}',
                            endYear: '${edu.end_year || "Unknown"}'
                          }`
                            )
                            .join(",\n      ")}
                        ];
                      }

                      skills() {
                        return [
                          ${Object.values(data.skills || [])
                            .map((skill: any) => `'${skill}'`)
                            .join(", ")}
                        ];
                      }
                    }`;

            let index = 0;
            const typingInterval = setInterval(() => {
              if (index < fullText.length - 1) {
                setTypedText((prev) => prev + fullText[index]);
                index++;
              } else {
                clearInterval(typingInterval);
                setHasAnimated(true); // Mark animation as completed
              }
            }, 20);
            observer.disconnect(); // Stop observing once animation starts
          }
        },
        { threshold: 0.5 } // Trigger when 50% of the section is visible
      );

      if (aboutRef.current) {
        observer.observe(aboutRef.current);
      }

      return () => observer.disconnect();
    }
  }, [data, hasAnimated]);

  const pageStyle: React.CSSProperties = {
    paddingTop: "20px",
    color: theme[themeMode].custom.text,
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  };

  return (
    <Container ref={aboutRef} style={pageStyle}>
      {typedText ? (
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {typedText}
        </SyntaxHighlighter>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};

export default AboutPage;
