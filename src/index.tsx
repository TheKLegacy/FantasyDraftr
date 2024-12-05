import React from 'react';
import ReactDOM from 'react-dom/client';
import playerData from '../data/players.json';

const App: React.FC = () => {

const filteredPlayers = Object.values(playerData)
  .filter(player => typeof player.search_rank === 'number' && !isNaN(player.search_rank) && player.search_rank <= 50)
  .sort((a, b) => a.search_rank - b.search_rank);
    
    console.log(filteredPlayers)

  return <div>{JSON.stringify(filteredPlayers)}</div>;
};

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(<App />);