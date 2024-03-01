"use client";

import { useFirestore } from "@/firebase/hooks/useFirestore";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useRef, useState } from "react";
import InputDialog from "./InputDialog";
import EditIcon from "@mui/icons-material/Edit";
import EditDialog from "./EditDialog";
import { injury } from "../types/injury";

const Injuries = () => {
  const { documents: data } = useFirestore("Injuries");
  const [searchQuery, setSearchQuery] = useState<injury[]>([]);
  const ref = useRef<HTMLInputElement>(null);

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

  const [inputOpen, setInputOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<injury | null>(null);

  const handleEditClick = (row: injury) => {
    setSelectedRow(row);
    setEditOpen(true);
    console.log(row);
  };

  return (
    <Box width="80%" my={5}>
      <input type="text" ref={ref} onChange={handleSearch}></input>
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>name</TableCell>
              <TableCell>part</TableCell>
              <TableCell>diagnosis</TableCell>
              <TableCell>category</TableCell>
              <TableCell>note</TableCell>
              <TableCell>injuryDate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchQuery.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Button onClick={() => handleEditClick(row)}>
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.part}</TableCell>
                <TableCell>{row.diagnosis}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.note}</TableCell>
                <TableCell>
                  {row.injuryDate
                    ? row.injuryDate.toDate().toDateString()
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
