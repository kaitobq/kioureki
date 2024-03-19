"use client";

import SignUp from "@/firebase/auth/SignUp";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 20 }}>
      <SignUp router={router} />
    </Box>
  );
}
