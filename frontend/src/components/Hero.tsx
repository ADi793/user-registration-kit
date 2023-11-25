import { Box, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box
      sx={{
        p: 3,
        "& img": {
          maxWidth: "100%",
        },
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography align="center" sx={{ fontSize: "24px", mb: 1 }} variant="h1">
        Welcome to{" "}
        <Box component="span" sx={{ color: "#15B79E" }}>
          User Registration Kit
        </Box>
      </Typography>
      <Typography align="center" variant="subtitle1" sx={{ mb: 3 }}>
        A professional kit that manages user registration with easy to use.
      </Typography>
      <img alt="" src="/assets/auth-illustration.svg" />
    </Box>
  );
};

export default Hero;
