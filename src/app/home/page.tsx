"use client";

import Injuries from "@/components/data/Injuries";
import { FirebaseApp } from "@/firebase/FirebaseConfig";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loading";

export default function Home() {
  const [user, load] = useAuthState(FirebaseApp.auth);

  if (load) {
    return <Loading />;
  }

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
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
