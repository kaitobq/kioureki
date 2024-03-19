"use client";

import { Box, Button, TextField, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import { useSignUp } from "../hooks/useAuth";

const SignUp = ({ router }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useSignUp();

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    await signUp(email, password);
    router.push("/home");
  };

  return (
    <Container component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom color="black">
        Sign Up
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
    </Container>
  );
};

export default SignUp;

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
