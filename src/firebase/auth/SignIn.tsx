"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { useSignIn } from "../hooks/useAuth";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useSignIn();

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <Container component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom color="black">
        login
      </Typography>
      <TextField
        required
        id="email"
        label="メールアドレス"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 1 }}
        fullWidth
      />
      <TextField
        required
        id="password"
        label="パスワード"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 1 }}
        fullWidth
      />
      <Button type="submit" variant="contained" fullWidth>
        Submit
      </Button>
      <Link href="/signup" style={{ marginTop: 15 }}>
        初めてご利用の方はこちら
      </Link>
    </Container>
  );
};

export default SignIn;

const Container = styled(Box)(({ theme }) => ({
  width: 250,
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));
