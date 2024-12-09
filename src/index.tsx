import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import playerData from '../data/players.json';
import { PlayerTable } from './PlayerTable';
import { Actions } from './Actions';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useAtom } from 'jotai';
import { currentBoardAtom, currentPlayersAtom } from "./Atoms";

// Create a dark theme
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App: React.FC = () => {
  const [players] = useAtom(currentPlayersAtom);
  const [board, setBoard] = useAtom(currentBoardAtom);

  useEffect(() => {
    //TODO: Make a call to my API to get the data
    const filteredPlayers = Object.values(playerData)
        .filter(player => typeof player.search_rank === 'number' && !isNaN(player.search_rank))
        .sort((a, b) => a.search_rank - b.search_rank)
        .slice(0, 2500) as PlayerRaw[];

    filteredPlayers.forEach((player, index) => {
        player.rank = index + 1;
    });
    
    const propertiesToRemove = ["metadata", "search_last_name", "oddsjam_id", "sport", "pandascore_id", "espn_id",
      "news_updated", "practice_description", "birth_city", "fantasy_data_id", "hashtag",
      "yahoo_id", "birth_date", "birth_state", "birth_country", "search_full_name", "high_school",
      "injury_body_part", "team_abbr", "competitions", "injury_start_date", "swish_id", "rotowire_id",
      "stats_id", "team_changed_at", "rotoworld_id", "search_first_name", "opta_id", "gsis_id"
    ];

    const cleanedPlayers = filteredPlayers.map(player => {
      const cleanedPlayer = { ...player }; // Create a shallow copy of the player object
      propertiesToRemove.forEach(property => {
          delete cleanedPlayer[property]; // Remove each specified property
      });
      return cleanedPlayer;
    }) as Player[];

    const jsonData = JSON.stringify(cleanedPlayers);
    const file = new Blob([jsonData], { type: "application/json" });
    const sizeInMB = file.size / (1024 * 1024);
    console.log(`File size: ${sizeInMB.toFixed(2)} MB`);

    setBoard({...board, Players: cleanedPlayers})
  }, []);

    

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline /> {/* Ensures dark theme is applied globally */}
            <Actions data={players} />
            <PlayerTable/>
        </ThemeProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(<App />);
