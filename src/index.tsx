import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import playerData from "../data/players.json";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useAtomValue, useSetAtom } from "jotai";
import { allBoardsAtom, cleanedPlayersAtom, currentBoardAtom, displayMode } from "./Atoms";
import { initialBoard } from "./InitialData";
import { DraftModeContainer } from "./DraftMode/DraftModeContaier";
import { RankModeContainer } from "./RankMode/RankModeContainer";
import ProfileIcon from "./AuthComponents/ProfileIcon";

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
    const display = useAtomValue(displayMode);

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
            <ProfileIcon />
            {
                (() => {
                    switch (display) {
                        case "rank":
                            return <RankModeContainer />;
                        case "draft":
                            return <DraftModeContainer />;
                        default:
                            return null;
                    }
                })()
            }
        </ThemeProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
