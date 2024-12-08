import {
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { Filters } from "./Filters";
import DeleteModal from "./DeleteModal";
import CreateBoardModal from "./CreateBoardModal";

interface PlayerDataProps {
    data: Player[];
}

export function Actions({ data }: PlayerDataProps) {
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openBoardModal, setOpenBoardModal] = useState<boolean>(false);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    margin: "2em",
                }}
            >
                <TextField
                    id="board-name"
                    label="Board Name"
                    variant="outlined"
                    value="Unnamed Board"
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Board</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={2}
                        label="Board"
                        onChange={() => {}}
                    >
                        <MenuItem value={1}>Redraft</MenuItem>
                        <MenuItem value={2}>Dynasty</MenuItem>
                        <MenuItem value={3}>2025 Rookie</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" size="large" onClick={() => setOpenBoardModal(true)}>
                    Add Board
                </Button>
                <IconButton aria-label="delete" onClick={() => setOpenDeleteModal(true)}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <Filters data={data} />
            <DeleteModal open={openDeleteModal} onClose={() => {setOpenDeleteModal(false)}}/>
            <CreateBoardModal open={openBoardModal} onClose={() => {setOpenBoardModal(false)}}/>
        </>
    );
}
