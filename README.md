# FantasyDraftr

FantasyDraftr is a fantasy football draft management app built to help users build rankings, compare draft value, manage team boards, and track live draft decisions. It combines a custom draft board workflow with Sleeper integration and Firebase-hosted deployment.

## Overview

The app lets users:
- create and manage multiple draft boards
- filter players by position and other draft preferences
- rank players and organize draft strategy
- switch between rank mode, draft mode, and live draft mode
- review player details in a dedicated modal with stats and notes
- persist board state in local storage and support Firebase-based authentication flows

## Tech stack

- React + TypeScript
- Material UI for interface components
- Jotai for state management
- Webpack for bundling
- Firebase Hosting for deployment
- Sleeper player data integration for draft workflows

## Requirements

- Node.js v22.x recommended
- npm
- Firebase CLI for deployment

## Local setup

```bash
git clone https://github.com/TheKLegacy/FantasyDraftr.git
cd FantasyDraftr
npm install
npm run start
```

The app will run in development mode via webpack and open the local app in the browser.

## Available scripts

```bash
npm run start
npm run build
```

### Script details
- `npm run start`: start the local webpack dev server
- `npm run build`: generate the production bundle for deployment

## Deployment

This project is configured for Firebase Hosting.

```bash
npm run build
firebase deploy --only hosting
```

The Firebase config in `firebase.json` points hosting to the `dist` directory.

## Repo workflows

Two workspace skills are included for deployment flows:

- `deploy`: build the app, commit changes, push, and deploy to Firebase
- `getbestplayers-deploy`: refresh player data with `SleeperParser/GetBestPlayers.js`, build, commit, push, and deploy

These are intended for release workflows when the app is ready to publish.

## Project structure

```text
FantasyDraftr/
├── src/                     # React app source
├── data/                    # static player data
├── SleeperParser/           # player refresh scripts
├── .github/                 # repo-level Copilot instructions and skills
├── firebase.json            # Firebase hosting configuration
├── package.json             # project scripts and dependencies
├── webpack.config.js        # bundling configuration
├── tsconfig.json            # TypeScript config
├── README.md                # project documentation
└── dist/                    # production build output
```

## Key app behavior

### Modes
- rank mode: organize player rankings and draft-board planning
- draft mode: manage picks and drafted players in the draft flow
- live draft mode: connect with Sleeper draft data

### Data
- `data/players.json` contains the player catalog used by the app
- `SleeperParser/GetBestPlayers.js` can be used to regenerate player data based on current Sleeper inputs

### Persistence
- board state is stored in local storage for quick use across sessions
- Firebase auth is also integrated for app account management and identity-aware flows

## Current roadmap

The repo still has several planned improvements:
- add a Sleeper-integrated draft board with scenario analysis
- fix action move buttons when filtered players are excluded
- improve code cleanup and maintainability
- add stronger login/logout defaults for board selection
- add email verification requirements for authenticated users
- reorder rankings based on ADP trends closer to preseason
- add automated tests for core behavior
- add branding and site metadata polish

## Contributing

1. Create a feature branch
2. Make focused edits
3. Run `npm run build` to validate the app
4. Use the deployment skills when publishing to Firebase

## License

This project is licensed under the ISC license.
