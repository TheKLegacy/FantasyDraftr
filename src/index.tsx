import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import playerData from "../data/players.json";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useAtomValue, useSetAtom } from "jotai";
import { allBoardsAtom, cleanedPlayersAtom, currentBoardAtom, displayModeAtom } from "./Atoms";
import { initialBoard } from "./InitialData";
import { DraftModeContainer } from "./DraftMode/DraftModeContaier";
import { RankModeContainer } from "./RankMode/RankModeContainer";
import ProfileIcon from "./AuthComponents/ProfileIcon";
import { SleeperDraftContainer } from "./SleeperDraft/SleeperDraftContainer";
import type { Board } from "./Shared/Filters";
import type { Player } from "./player";
import { user } from "./Firebase/FirebaseAuth";

// Create a dark theme
const darkTheme = createTheme({ palette: { mode: "dark" } });

const App: React.FC = () => {
    const setBoards = useSetAtom(allBoardsAtom);
    const setCurrentBoard = useSetAtom(currentBoardAtom);
    const setCleanedPlayers = useSetAtom(cleanedPlayersAtom);
    const display = useAtomValue(displayModeAtom);

    if (!user) {
        const players = Object.values(playerData) as unknown as Player[];
        players.forEach((player: Player, index: number) => {
            player.rank = index + 1;
        });
        initialBoard.Players = players;
        const existingBoards = (JSON.parse(localStorage.getItem("DraftBoards") ?? "null") as Board[]) ?? [initialBoard];
        setCleanedPlayers(players);
        setBoards(existingBoards);
        setCurrentBoard(existingBoards[0].Name);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <ProfileIcon />
            {(() => {
                switch (display) {
                    case "rank":
                        return <RankModeContainer />;
                    case "draft":
                        return <DraftModeContainer />;
                    case "livedraft":
                        return <SleeperDraftContainer />;
                    default:
                        return null;
                }
            })()}
        </ThemeProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
