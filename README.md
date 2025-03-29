# FantasyDraftr

## To run

Recommended Node Version: v22.14.0

```
git clone https://github.com/TheKLegacy/FantasyDraftr.git
cd FantasyDraftr
npm install
npm run start
```

## Todo

- Add sleeper integrated draft board
  - Modal to provide link or id of draft
  - Poll api request to get picks that have been made (may need a query parameter to cache bust)
  - Display remaining players, highlight worst case scenerio for your upcoming picks
- Fix actions move buttons with filtered out players
- Add some confirm modals (Delete board)
- Add users to draft mode
- Add accounts
  - Cleanup login UI
  - Sync draft boards to the account (Continue to use localstorage when not logged in.)
  - Database set up, need to apply data received when logging in
- Host online
  - Done via firebase, need a better URL
- Undo Draft Picks
- Code Cleanup
  - Ongoing
- Get Player data via API call.
- Field validation in inputs
- Notes? (I'm concerned that this will take too much storage)
- Cleanup main Actions.tsx
- Add modal when clicking on player to view stats
- reorder based on other draft adps
