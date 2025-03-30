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
import { Filters } from "../Shared/Filters";
import DeleteModal from "./DeleteModal";
import { useAtomValue, useSetAtom } from "jotai";
import { currentBoardAtom, getCurrentBoardAtom, updateBoardNameAction, allBoardsAtom, updateBoardAction } from "../Atoms";
import { AddBoardButton } from "./AddBoardButton";
import { StartDraftButton } from "./StartDraftButton";
import { LiveDraftButton } from "./LiveDraftButton";
import GetDraftModal from "../SleeperDraft/GetDraftModal";

export const Actions: React.FC = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openLiveDraftModal, setOpenLiveDraftModal] = useState<boolean>(false);
    const board = useAtomValue(getCurrentBoardAtom);
    const setBoard = useSetAtom(updateBoardAction)
    const allBoards = useAtomValue(allBoardsAtom);
    const updatename = useSetAtom(updateBoardNameAction);
    const setCurrentBoard = useSetAtom(currentBoardAtom);

    const onNameChange = (e: any) => 
        updatename({ ...board, NewName: e.target.value });
    
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
                    <InputLabel id="select-board">Draft Boards</InputLabel>
                    <Select
                        labelId="select-board"
                        value={board.Name}
                        label="Draft Boards"
                    >
                        {allBoards.map(({ Name }) => (
                            <MenuItem key={Name} value={Name} onClick={() => setCurrentBoard(Name)}>
                                {Name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <AddBoardButton />
                <StartDraftButton/>
                <LiveDraftButton openModal={setOpenLiveDraftModal}/>
                <IconButton
                    aria-label="delete"
                    onClick={() => setOpenDeleteModal(true)}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
            <Filters board={board!} setBoard={setBoard}/>
            <DeleteModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
            />
            <GetDraftModal
                open={openLiveDraftModal}
                onClose={() => setOpenLiveDraftModal(false)}
            />
        </>
    );
}
