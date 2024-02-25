"use client";
import { FirebaseApp } from "@/firebase/FirebaseConfig";
import SignIn from "@/firebase/auth/SignIn";
import { useSignOut } from "@/firebase/hooks/useAuth";
import { Box, Button, Toolbar } from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import UserInfo from "../userinfo/UserInfo";

const FirstView = () => {
  const [user] = useAuthState(FirebaseApp.auth);

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Toolbar />
      {user ? <UserInfo /> : <SignIn />}
    </Box>
  );
};

export default FirstView;
