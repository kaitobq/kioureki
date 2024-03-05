"use client";

// Injuries.tsx
import { Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useRef, useState } from "react";
import InputDialog from "./InputDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDialog from "./EditDialog";
import { injury } from "../types/injury";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useFirestore } from "@/firebase/hooks/useFirestore";
import { Timestamp, collection, deleteDoc, doc } from "firebase/firestore";
import { FirebaseApp } from "@/firebase/FirebaseConfig";

const Injuries = () => {
  const { documents: data } = useFirestore("Injuries");
  const [searchQuery, setSearchQuery] = useState<injury[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  const [inputOpen, setInputOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<injury | null>(null);

  useEffect(() => {
    setSearchQuery(data);
  }, [data]);

  const handleSearch = () => {
    if (ref.current) {
      setSearchQuery(
        data.filter((row) => row.name.includes(ref.current!.value))
      );
    }
  };

  const handleEditClick = (row: injury) => {
    setSelectedRow(row);
    setEditOpen(true);
    console.log(row);
  };

  const handleDelete = async (row: injury) => {
    const firestore = FirebaseApp.firestore;
    const docRef = doc(firestore, "Injuries", row.id);
    try {
      await deleteDoc(docRef);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "name", width: 200 },
    { field: "part", headerName: "part", width: 200 },
    { field: "diagnosis", headerName: "diagnosis", width: 200 },
    { field: "category", headerName: "category", width: 200 },
    { field: "note", headerName: "note", width: 200 },
    {
      field: "injuryDate",
      headerName: "injuryDate",
      width: 200,
      renderCell: (params) =>
        params.value ? params.value.toDateString() : "-",
      // params.value ? new Date(params.value).toDateString() : "-",
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleEditClick(params.row as injury)}>
          <EditIcon />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.row as injury)}>
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  const rowsWithDateConverted = searchQuery.map((row) => ({
    ...row,
    injuryDate: (row.injuryDate as unknown as Timestamp).toDate(),
  }));

  return (
    <Box width="90%" my={5}>
      <input
        type="text"
        name="searchform"
        ref={ref}
        onChange={handleSearch}
      ></input>
      <InputDialog
        open={inputOpen}
        onClose={() => {
          setInputOpen(false);
        }}
      />
      <Button
        onClick={() => {
          setInputOpen(true);
        }}
      >
        <AddIcon />
      </Button>
      <DataGrid rows={rowsWithDateConverted} columns={columns} />
      {selectedRow && (
        <EditDialog
          open={editOpen}
          onClose={() => {
            setEditOpen(false);
            setSelectedRow(null);
          }}
          initialValues={selectedRow}
        />
      )}
    </Box>
  );
};

export default Injuries;
