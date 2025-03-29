import { Button } from "@mui/material";
import React from "react";
import { displayModeAtom, draftBoardAtom, draftedBoardAtom, getCurrentBoardAtom } from "../Atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export const StartDraftButton: React.FC = () => {
    const setDisplayMode = useSetAtom(displayModeAtom);
    const setDraftBoardAtom = useSetAtom(draftBoardAtom);
    const setdraftedBoardAtom = useSetAtom(draftedBoardAtom);
    const currentBoard = useAtomValue(getCurrentBoardAtom);

    return (
        <>
            <Button variant="outlined" size="large" onClick={() => (setDisplayMode("draft"),  setDraftBoardAtom(currentBoard), setdraftedBoardAtom({Players: [], Pick: 0}))}>
                Start Draft
            </Button>
        </>
    );
}
