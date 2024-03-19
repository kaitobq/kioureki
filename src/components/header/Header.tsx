"use client";

import { FirebaseApp } from "@/firebase/FirebaseConfig";
import { useSignOut } from "@/firebase/hooks/useAuth";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const [user] = useAuthState(FirebaseApp.auth);
  const { logout } = useSignOut();

  return (
    <AppBar sx={{ zIndex: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link
          href="/home"
          style={{
            cursor: "pointer",
            textDecoration: "none",
            color: "white",
            fontSize: 25,
          }}
        >
          既往歴
        </Link>
        {user ? (
          <Button onClick={logout} sx={{ color: "black" }}>
            signout
          </Button>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
