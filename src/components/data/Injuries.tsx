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

type injury = {
  name: string;
  part: string;
  diagnosis: string;
};

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

  const [digOpen, setDigOpen] = useState(false);

  return (
    <Box width="80%">
      <input type="text" ref={ref} onChange={handleSearch}></input>
      <InputDialog
        open={digOpen}
        onClose={() => {
          setDigOpen(false);
        }}
      />
      <Button
        onClick={() => {
          setDigOpen(true);
        }}
      >
        <AddIcon />
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>part</TableCell>
              <TableCell>diagnosis</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchQuery.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.part}</TableCell>
                <TableCell>{row.diagnosis}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Injuries;
