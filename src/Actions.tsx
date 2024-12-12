import {
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
import { useAtomValue, useSetAtom } from "jotai";
import { getCurrentBoard, updateBoardName, allBoardsAtom } from "./Atoms";
import { AddBoardButton } from "./AddBoardButton";

export function Actions() {
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const board = useAtomValue(getCurrentBoard);
    const allBoards = useAtomValue(allBoardsAtom);
    const updatename = useSetAtom(updateBoardName);

    const onNameChange = (e: any) => {
        const newName = e.target.value;
        updatename({ ...board, NewName: newName });
    };

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
                    label="Draft Board"
                    variant="outlined"
                    value={board.Name}
                    onChange={onNameChange}
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Draft Boards</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={board.Name}
                        label="Draft Boards"
                        onChange={() => {}}
                    >
                        {allBoards.map(({ Name }) => (
                            <MenuItem key={Name} value={Name}>
                                {Name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <AddBoardButton />
                <IconButton
                    aria-label="delete"
                    onClick={() => setOpenDeleteModal(true)}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
            <Filters />
            <DeleteModal
                open={openDeleteModal}
                onClose={() => {
                    setOpenDeleteModal(false);
                }}
            />
        </>
    );
}
