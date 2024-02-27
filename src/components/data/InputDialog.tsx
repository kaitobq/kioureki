"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { FirebaseApp } from "@/firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const InputDialog = (props: any) => {
  const { open, onClose } = props;

  const [name, setName] = useState("");
  const [part, setPart] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    setDialogOpen(!dialogOpen);
    onClose();
  };

  const handleSubmit = async () => {
    const firestore = FirebaseApp.firestore;

    try {
      const docRef = collection(firestore, "Injuries");

      await addDoc(docRef, { name, part, diagnosis });

      setName("");
      setPart("");
      setDiagnosis("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ component: "form" }}
      onSubmit={handleSubmit}
    >
      <DialogTitle>既往歴登録</DialogTitle>
      <DialogContent>
        <TextField
          required
          id="name"
          label="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: 1 }}
          fullWidth
        />
        <TextField
          required
          id="part"
          label="part"
          value={part}
          onChange={(e) => setPart(e.target.value)}
          sx={{ marginBottom: 1 }}
          fullWidth
        />
        <TextField
          required
          id="diagnosis"
          label="diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          sx={{ marginBottom: 1 }}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InputDialog;
