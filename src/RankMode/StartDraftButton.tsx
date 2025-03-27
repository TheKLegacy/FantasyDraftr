import { Button } from "@mui/material";
import React from "react";
import {
    displayMode,
    draftBoard,
    draftedBoard,
    getCurrentBoard,
} from "../Atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export const StartDraftButton: React.FC = () => {
    const setDisplayMode = useSetAtom(displayMode);
    const setDraftBoardAtom = useSetAtom(draftBoard);
    const setdraftedBoardAtom = useSetAtom(draftedBoard);
    const currentBoard = useAtomValue(getCurrentBoard);

    return (
        <>
            <Button
                variant="outlined"
                size="large"
                onClick={() => (
                    setDisplayMode("draft"),
                    setDraftBoardAtom(currentBoard),
                    setdraftedBoardAtom({ Players: [], Pick: 0 })
                )}
            >
                Start Draft
            </Button>
        </>
    );
};
