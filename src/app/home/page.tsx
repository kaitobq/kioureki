"use client";

import Injuries from "@/components/data/Injuries";
import { FirebaseApp } from "@/firebase/FirebaseConfig";
import { useFirestore } from "@/firebase/hooks/useFirestore";
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
        // 既往歴一覧、編集ページへのリンクもあり
        <Injuries />
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
