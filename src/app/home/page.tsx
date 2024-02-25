"use client";

import { FirebaseApp } from "@/firebase/FirebaseConfig";
import SignIn from "@/firebase/auth/SignIn";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(FirebaseApp.auth);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Toolbar />
      {user ? (
        <></>
      ) : (
        <>
          <Typography component="h3" my={1}>
            ログアウトしました
          </Typography>
          <Button href="/" variant="contained">
            ホームへ戻る
          </Button>
        </>
      )}
    </Box>
  );
}
