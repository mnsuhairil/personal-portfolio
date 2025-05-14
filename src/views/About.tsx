import { Container, useMediaQuery } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "../firebase";
import theme from "../themes/theme";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface AboutPageProps {
  themeMode: "dark" | "light";
}

const AboutPage: React.FC<AboutPageProps> = ({ themeMode }) => {
  const [typedText, setTypedText] = useState("");
  const [data, setData] = useState<any>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const db = getDatabase(app);
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
          const skillsArr = Object.values(data.skills || []);
          let skillsString = "";
          if (isMobile) {
            const skillRows = [];
            for (let i = 0; i < skillsArr.length; i += 3) {
              const row = skillsArr.slice(i, i + 3).map((skill: any) => `'${skill}'`).join(", ");
              skillRows.push(`[${row}]`);
            }
            skillsString = skillRows.join(",\n\t\t");
          } else {
            skillsString = skillsArr.map((skill: any) => `'${skill}'`).join(", ");
          }
            const fullText = isMobile
              ? `
 class AboutMe {
    biographical() {
      this.name = '${data.Biodata?.name || "Unknown"}';
      this.dateOfBirth = '${data.Biodata?.date || "Unknown"}';
      this.email = '${data.Biodata?.email || "Unknown"}';
      this.phoneNumber = '${data.Biodata?.phone_number || "Unknown"}';
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
        ${skillsString}
      ];
    }
 }`
              : `
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
          if (isMobile) {
                  setTypedText(fullText); 
                  setHasAnimated(true);
                  observer.disconnect();
                  return;
                }
            let index = 0;
            setTypedText(""); 
            const typingInterval = setInterval(() => {
              if (index < fullText.length - 1) {
                setTypedText((prev) => prev + fullText[index]);
                index++;
              } else {
                clearInterval(typingInterval);
                setHasAnimated(true);
              }
            }, 20);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      if (aboutRef.current) {
        observer.observe(aboutRef.current);
      }

      return () => observer.disconnect();
    }
  }, [data, hasAnimated, isMobile]);

  const pageStyle: React.CSSProperties = {
    paddingTop: isMobile ? "10px" : "20px",
    paddingLeft: isMobile ? "4px" : "24px",
    paddingRight: isMobile ? "4px" : "24px",
    color: theme[themeMode].custom.text,
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    maxWidth: isMobile ? "80vw" : "",
    fontSize: isMobile ? "0.85rem" : "1rem",
  };

  return (
    <Container ref={aboutRef} style={pageStyle} maxWidth="md">
      {typedText ? (
<SyntaxHighlighter
  language="javascript"
  style={vscDarkPlus}
  customStyle={{
    fontSize: isMobile ? "0.85rem" : "1rem",
    padding: isMobile ? "8px" : "16px",
    borderRadius: "10px",
    overflowX: "auto",
    whiteSpace: "pre",      
    width: "100%",
  }}
>
  {typedText}
</SyntaxHighlighter>  
      ) : (
        "Loading..."
      )}
    </Container>
  );
};

export default AboutPage;
