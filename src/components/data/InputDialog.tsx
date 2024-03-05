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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const InputDialog = (props: any) => {
  const { open, onClose } = props;

  const [name, setName] = useState("");
  const [part, setPart] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [injuryDate, setInjuryDate] = useState<Dayjs | null>(dayjs());
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    setDialogOpen(!dialogOpen);
    onClose();
  };

  //preventdefault追加した方がいい？
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    if (name === "" || part === "" || diagnosis === "" || category === "") {
      return;
    }

    e.preventDefault();
    const firestore = FirebaseApp.firestore;

    try {
      const docRef = collection(firestore, "Injuries");

      await addDoc(docRef, {
        name,
        part,
        diagnosis,
        category,
        note,
        injuryDate: injuryDate ? injuryDate.toDate() : null,
      });

      setName("");
      setPart("");
      setDiagnosis("");
      setCategory("");
      setNote("");
    } catch (e) {
      console.log(e);
    }
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ component: "form" }}
      >
        <DialogTitle>既往歴登録</DialogTitle>
        <DialogContent>
          <TextField
            required
            id="name"
            label="名前"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: 1 }}
            fullWidth
          />
          <TextField
            required
            id="part"
            label="部位"
            value={part}
            onChange={(e) => setPart(e.target.value)}
            sx={{ marginBottom: 1 }}
            fullWidth
          />
          <TextField
            required
            id="diagnosis"
            label="診断"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            sx={{ marginBottom: 1 }}
            fullWidth
          />
          <TextField
            required
            id="category"
            label="カテゴリ"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ marginBottom: 1 }}
            fullWidth
          />
          <TextField
            id="note"
            label="備考"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            sx={{ marginBottom: 1 }}
            fullWidth
          />
          <DatePicker
            label="受傷日"
            value={injuryDate}
            onChange={(newValue) => {
              setInjuryDate(newValue);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            fullWidth
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default InputDialog;
