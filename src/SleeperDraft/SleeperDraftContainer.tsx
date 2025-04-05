import React from "react";
import { EndDraftButton } from "../Shared/EndDraftButton";
import { Filters } from "../Shared/Filters";
import { RemainingPlayersTable } from "./RemainingPlayersTable";
import { remainingPlayersAtom } from "../Atoms";
import { useAtom } from "jotai";

export const SleeperDraftContainer: React.FC = () => {
    const [board, setBoard] = useAtom(remainingPlayersAtom);

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
                <EndDraftButton />
            </div>
            <Filters board={board!} setBoard={setBoard} />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    margin: "2em",
                }}
            >
                <RemainingPlayersTable />
            </div>
        </>
    );
};
