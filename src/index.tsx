import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import playerData from "../data/players.json";
import { PlayerTable } from "./RankingTable/PlayerTable";
import { Actions } from "./Actions";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useSetAtom } from "jotai";
import { allBoardsAtom, cleanedPlayersAtom, currentBoardAtom } from "./Atoms";
import { initialBoard } from "./InitialData";
import type { Board } from "./Types";

// Create a dark theme
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const App: React.FC = () => {
    const setBoards = useSetAtom(allBoardsAtom);
    const setCurrentBoard = useSetAtom(currentBoardAtom);
    const setCleanedPlayers = useSetAtom(cleanedPlayersAtom);

    useEffect(() => {
        const localStorageData = localStorage.getItem("DraftBoards");
        const initialBoards = (JSON.parse(
            localStorageData ?? "null"
        ) as Board[]) ?? [initialBoard];

        //TODO: Make a call to my API to get the data
        const filteredPlayers = Object.values(playerData) as unknown as Player[]

        filteredPlayers.forEach((player: Player, index: number) => {
            player.rank = index + 1;
        });

        // const jsonData = JSON.stringify(filteredPlayers);
        // const file = new Blob([jsonData], { type: "application/json" });
        // const sizeInMB = file.size / (1024 * 1024);
        // console.log(`File size: ${sizeInMB.toFixed(2)} MB`);
        initialBoards[0].Players = filteredPlayers;
        setCleanedPlayers(filteredPlayers);
        const existingBoards =
            JSON.parse(localStorage.getItem("DraftBoards") ?? "null") ??
            initialBoards;
        setBoards(existingBoards);
        setCurrentBoard(existingBoards[0].Name);
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Actions />
            <PlayerTable />
        </ThemeProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
