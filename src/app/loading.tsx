import { Box, CircularProgress, Toolbar } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Toolbar />
      <CircularProgress />
    </Box>
  );
};

export default Loading;
