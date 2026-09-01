# FantasyDraftr repository context

## Project summary
This repository contains a TypeScript + React fantasy football draft planning app. It helps users manage fantasy draft boards, rank players, compare draft value, and optionally connect with Sleeper draft data.

## Tech stack
- React 18
- TypeScript
- Material UI
- Jotai state management
- Webpack + Babel
- Firebase Hosting
- LocalStorage for board persistence

## Core commands
- Install dependencies: `npm install`
- Start local app: `npm run start`
- Production build: `npm run build`
- Deploy hosting: `firebase deploy --only hosting`

## Common workflow
- Make code changes in the React app under `src/`
- Use `data/players.json` or the Sleeper refresh script when player lists need updating
- Validate with a production build before deployment
- If this repo is being published, use the `deploy` skill for the normal build + commit + push + deploy flow
- If player rankings need to be refreshed first, use the `getbestplayers-deploy` skill

## Important repo details
- Firebase hosting is configured to serve the built app from the `dist` directory
- The app uses local storage for board state and user session behavior when no authenticated user is active
- Do not treat `src/index.tsx` as a standalone page; it bootstraps the app and initializes board state
- The Sleeper parser script is under `SleeperParser/GetBestPlayers.js` and is used for refreshed player rankings

## Working conventions
- Keep changes small and focused
- Prefer existing patterns and file structure over new abstractions
- If a feature touches player data or deployment-related workflows, verify the build afterward
- Use descriptive commit messages when publishing changes
