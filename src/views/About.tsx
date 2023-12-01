// HomePage.tsx
import { Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import theme from "../themes/theme";

interface AboutPageProps {
  themeMode: "dark" | "light";
}

const AboutPage: React.FC<AboutPageProps> = ({ themeMode }) => {
  const pageStyle = {
    paddingTop: "20px",
    minHeight: "91.5vh",
    minWeight: "100%",
    // textAlign: "center",
    color: theme[themeMode].custom.text,
  };

  const workExperienceData = [
    { period: "2020-now", position: "Full-stack Developer/Owner at Pixel Lab" },
    {
      period: "2023-now",
      position: "Solutions Architect at Digitree Group S.A.",
    },
    {
      period: "2017-2023",
      position: "Full-stack Developer at Digitree Group S.A.",
    },
    {
      period: "2013-2017",
      position: "Full-Stack Designer at Digitree Group S.A.",
    },
    {
      period: "2006-now",
      position: "Full-Stack Designer/developer at Yasio.dev",
    },
  ];
  const educationData = [
    {
      period: "2012-2014",
      description: "school 1",
    },
    {
      period: "2008-2012",
      description: "school 2",
    },
  ];

  const skillsData = [
    "HTML/CSS/JS",
    "Vue",
    "Node.js",
    "Redis/NATS/RabbitMQ",
    "Bootstrap/Tailwind",
    "Webpack/Gulp/Vite",
    "SCSS/Less",
    "npm/yarn/pnpm",
    "Docker/k8s",
    "PWA",
    "SSR",
    "SPA",
    "GIT/CVS",
    "Cordova",
    "NativeScript",
    "Electron",
    "Web-extensions",
    "Web Sockets",
    "Firebase",
    "RWD/W3C/ARIA/WCAG",
    "XSLT/Smarty/Twig",
    "PHP",
    "MySQL/MongoDB/ORM",
    "Wordpress",
    "Photoshop",
    "Illustrator",
    "After Effects",
    "Premiere",
    "Motion design",
    "UX/UI",
    "DTP",
    "AWS",
    "GCP",
    "C#",
    "Unity",
    "TypeScript",
    "NestJS",
    "Cypress",
    "Jest",
    "Nuxt",
    "Quasar",
  ];

  const maxSkillsPerLine = 7;

  const cls = {
    color: "#55d9be",
  };

  const txt = {
    color: "#d9a855",
  };

  const vrb = {
    color: "#569cd6",
  };

  const sbl = {
    color: "#d16969",
  };

  const typ = {
    color: "#44b39c",
  };

  const num = {
    color: "#fcffb3",
  };

  const rtn = {
    color: "#ca63d4",
  };

  return (
    <Container style={pageStyle}>
      <Typography>
        <span style={typ}>class</span> <span style={cls}>AboutMe</span>{" "}
        <span>&#123;</span>
        <br />
      </Typography>
      <Typography>
        &nbsp;&nbsp;&nbsp;<span style={cls}>biographical()</span>
        <span>&#123;</span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={sbl}>this</span>.
        <span style={vrb}>name</span> ={" "}
        <span style={txt}>'Muhammad Nur Suhairil'</span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={sbl}>this</span>.
        <span style={vrb}>dateOfBirth</span> = <span style={num}>02022000</span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={sbl}>this</span>.
        <span style={vrb}>email</span> ={" "}
        <span style={txt}>'mnsuhairil@gmail.com'</span>
        <br />
        &nbsp;&nbsp;&nbsp;&#125;
      </Typography>
      <Typography>
        <span style={cls}>workExperience()</span> &#123;
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span style={rtn}>return (</span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={rtn}>[</span>
        <br />
        {workExperienceData.map((experience, index) => (
          <React.Fragment key={index}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;
            <span style={txt}> '{experience.period}'</span> :{" "}
            <span style={txt}>'{experience.position}'</span> &#125;,
            <br />
          </React.Fragment>
        ))}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={rtn}>]</span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span style={rtn}>);</span>
        <br />
      </Typography>
      <Typography>
        <span style={cls}>education()</span> &#123;
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;return (
        <br />
        {educationData.map((edu, index) => (
          <React.Fragment key={index}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;{" "}
            <span style={txt}>'{edu.period}'</span> :{" "}
            <span style={txt}>'{edu.description}'</span> &#125;,
            <br />
          </React.Fragment>
        ))}
        &nbsp;&nbsp;&nbsp;&nbsp;);
        <br />
      </Typography>
      <Typography>
        <span style={cls}>skills()</span> &#123;
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span style={rtn}>return (</span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {skillsData.map((skill, index) => (
          <React.Fragment key={index}>
            {index > 0 && index % 11 === 0 ? (
              <>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </>
            ) : null}

            <span style={txt}>'{skill}'</span>
            {index !== skillsData.length - 1 ? "," : ""}
          </React.Fragment>
        ))}{" "}
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span style={rtn}>);</span>
        <br />
      </Typography>
    </Container>
  );
};

export default AboutPage;
