import { Button } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import React from "react";
import { useAtom, useSetAtom } from "jotai";
import { draftedBoardAtom, draftBoardAtom } from "../Atoms";

export const UndoPickButton: React.FC = () => {
    const [draftedBoard, setDraftedBoard] = useAtom(draftedBoardAtom);
    const setDraftBoard = useSetAtom(draftBoardAtom);

    const undoPick = () => {
        if (draftedBoard.Players.length > 0) {
          const lastPlayer = draftedBoard.Players.pop();
      
          if (lastPlayer) {
            setDraftBoard(prev => {
              const currentPlayers = prev!.Players;
      
              return {
                ...prev!,
                Players: [lastPlayer, ...currentPlayers],
              };
            });
      
            setDraftedBoard({
              Players: [...draftedBoard.Players],
              Pick: draftedBoard.Pick,
            });
          }
        }
      };

    return (
        <>
            <Button variant="contained" onClick={() => undoPick()} endIcon={<ReplayIcon />}>
                Undo Pick
            </Button>
        </>
    );
};
