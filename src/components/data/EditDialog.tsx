// EditDialog.tsx

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { FirebaseApp } from "@/firebase/FirebaseConfig";
import { updateDoc, doc, collection, Timestamp } from "firebase/firestore";
import { injury } from "../types/injury";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type EditDialogProps = {
  open: boolean;
  onClose: () => void;
  initialValues: injury | null;
};

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onClose,
  initialValues,
}) => {
  const [name, setName] = useState(initialValues?.name || "");
  const [part, setPart] = useState(initialValues?.part || "");
  const [diagnosis, setDiagnosis] = useState(initialValues?.diagnosis || "");
  const [category, setCategory] = useState(initialValues?.category || "");
  const [note, setNote] = useState(initialValues?.note || "");
  const [injuryDate, setInjuryDate] = useState<Dayjs | null>(
    initialValues?.injuryDate
      ? dayjs((initialValues.injuryDate as unknown as Timestamp).toDate())
      : null
  );

  const handleSubmit = async () => {
    const firestore = FirebaseApp.firestore;
    try {
      await updateDoc(
        doc(collection(firestore, "Injuries"), initialValues?.id),
        {
          name,
          part,
          diagnosis,
          category,
          note,
          injuryDate: injuryDate ? injuryDate.toDate() : null,
        }
      );
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>編集</DialogTitle>
        <DialogContent>
          <TextField
            label="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ my: 1 }}
            required
          />
          <TextField
            label="部位"
            value={part}
            onChange={(e) => setPart(e.target.value)}
            fullWidth
            sx={{ my: 1 }}
            required
          />
          <TextField
            label="診断"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            fullWidth
            sx={{ my: 1 }}
            required
          />
          <TextField
            label="カテゴリ"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            sx={{ my: 1 }}
            required
          />
          <TextField
            label="備考"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            fullWidth
            sx={{ my: 1 }}
          />
          <DatePicker
            label="受傷日"
            value={injuryDate}
            onChange={(newValue) => {
              setInjuryDate(newValue);
            }}
            sx={{ my: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>保存</Button>
          <Button onClick={onClose}>キャンセル</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default EditDialog;
