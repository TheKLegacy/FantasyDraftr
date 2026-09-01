import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React, { useRef, useState } from "react";
import { Filters } from "../Shared/Filters";
import DeleteModal from "./DeleteModal";
import { useAtomValue, useSetAtom } from "jotai";
import {
    currentBoardAtom,
    getCurrentBoardAtom,
    updateBoardNameAction,
    allBoardsAtom,
    updateBoardAction,
    cleanedPlayersAtom,
} from "../Atoms";
import { AddBoardButton } from "./AddBoardButton";
import { StartDraftButton } from "./StartDraftButton";
import { LiveDraftButton } from "./LiveDraftButton";
import GetDraftModal from "../SleeperDraft/GetDraftModal";
import { writeUserBoards } from "../Firebase/Firestore";
import type { BoardPayload } from "../Types";
import type { Board } from "../Shared/Filters";

const nextAvailableName = (desiredName: string, boards: Board[]) => {
    const existingNames = new Set(boards.map((item) => item.Name));
    if (!existingNames.has(desiredName)) return desiredName;

    let copyNumber = 2;
    while (existingNames.has(`${desiredName} (${copyNumber})`)) copyNumber += 1;
    return `${desiredName} (${copyNumber})`;
};

const isBoardPayload = (value: unknown): value is BoardPayload => {
    if (!value || typeof value !== "object") return false;
    const board = value as BoardPayload;
    return typeof board.Name === "string" && Array.isArray(board.Players) && !!board.Filters;
};

export const Actions: React.FC = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openLiveDraftModal, setOpenLiveDraftModal] = useState<boolean>(false);
    const board = useAtomValue(getCurrentBoardAtom);
    const setBoard = useSetAtom(updateBoardAction);
    const allBoards = useAtomValue(allBoardsAtom);
    const cleanedPlayers = useAtomValue(cleanedPlayersAtom);
    const updatename = useSetAtom(updateBoardNameAction);
    const setCurrentBoard = useSetAtom(currentBoardAtom);
    const importInput = useRef<HTMLInputElement>(null);
    const [openCloneModal, setOpenCloneModal] = useState(false);
    const [cloneName, setCloneName] = useState("");

    const onNameChange = (e: any) => updatename({ ...board, NewName: e.target.value });

    const saveBoards = (boards: Board[], currentBoardName?: string) => {
        writeUserBoards(boards);
        setBoardList(boards);
        if (currentBoardName) setCurrentBoard(currentBoardName);
    };
    const setBoardList = useSetAtom(allBoardsAtom);

    const exportBoards = () => {
        const exportedBoards: BoardPayload[] = allBoards.map((item) => ({
            Name: item.Name,
            Filters: item.Filters,
            Players: item.Players.map((player) => player.player_id),
        }));
        const file = new Blob([JSON.stringify({ version: 1, boards: exportedBoards }, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.download = "fantasy-draftr-boards.json";
        link.click();
        URL.revokeObjectURL(url);
    };

    const importBoards = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file) return;

        try {
            const content: unknown = JSON.parse(await file.text());
            const payloads = Array.isArray(content)
                ? content
                : content && typeof content === "object" && Array.isArray((content as { boards?: unknown }).boards)
                  ? (content as { boards: unknown[] }).boards
                  : [];
            const playersById = new Map(cleanedPlayers.map((player) => [player.player_id, player]));
            const boardNames = [...allBoards];
            const importedBoards = payloads.filter(isBoardPayload).map((payload) => {
                const name = nextAvailableName(payload.Name.trim() || "Imported Board", boardNames);
                const importedBoard = {
                    Name: name,
                    Filters: payload.Filters,
                    Players: payload.Players.map((id) => playersById.get(id)).filter((player): player is NonNullable<typeof player> => !!player),
                };
                boardNames.push(importedBoard);
                return importedBoard;
            });

            if (importedBoards.length) saveBoards([...allBoards, ...importedBoards], importedBoards[0].Name);
        } catch {
            console.error("Unable to import draft boards. The selected file is not valid board JSON.");
        }
    };

    const openClone = () => {
        setCloneName(nextAvailableName(`${board.Name} Copy`, allBoards));
        setOpenCloneModal(true);
    };

    const cloneBoard = () => {
        const name = cloneName.trim();
        if (!name) return;
        const clonedBoard = { ...board, Name: nextAvailableName(name, allBoards), Players: [...board.Players] };
        saveBoards([...allBoards, clonedBoard], clonedBoard.Name);
        setOpenCloneModal(false);
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "3.5em",
                    marginBottom: "1em",
                }}
            >
                <TextField
                    id="board-name"
                    label="Draft Board"
                    variant="outlined"
                    size="small"
                    value={board.Name}
                    onChange={onNameChange}
                    sx={{ minWidth: 220 }}
                />
                <FormControl size="small" sx={{ minWidth: 220 }}>
                    <InputLabel id="select-board">Draft Boards</InputLabel>
                    <Select labelId="select-board" value={board.Name} label="Draft Boards">
                        {allBoards.map(({ Name }) => (
                            <MenuItem key={Name} value={Name} onClick={() => setCurrentBoard(Name)}>
                                {Name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <AddBoardButton />
                <StartDraftButton />
                <LiveDraftButton openModal={setOpenLiveDraftModal} />
                <Tooltip title="Clone board">
                    <IconButton aria-label="clone board" onClick={openClone}>
                        <ContentCopyIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Export boards">
                    <IconButton aria-label="export boards" onClick={exportBoards}>
                        <FileDownloadIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Import boards">
                    <IconButton aria-label="import boards" onClick={() => importInput.current?.click()}>
                        <FileUploadIcon />
                    </IconButton>
                </Tooltip>
                <input ref={importInput} type="file" accept="application/json,.json" hidden onChange={importBoards} />
                <IconButton aria-label="delete" onClick={() => setOpenDeleteModal(true)}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <Filters board={board!} setBoard={setBoard} />
            <DeleteModal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} />
            <GetDraftModal open={openLiveDraftModal} onClose={() => setOpenLiveDraftModal(false)} />
            <Dialog open={openCloneModal} onClose={() => setOpenCloneModal(false)} aria-labelledby="clone-board-dialog-title">
                <DialogTitle id="clone-board-dialog-title">Clone Draft Board</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Draft Board Name"
                        fullWidth
                        value={cloneName}
                        onChange={(event) => setCloneName(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCloneModal(false)} color="secondary">Cancel</Button>
                    <Button onClick={cloneBoard} color="primary" variant="contained" disabled={!cloneName.trim()}>Clone</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
