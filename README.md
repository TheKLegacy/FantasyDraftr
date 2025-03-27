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

- Fix bug which requires you to change a toggle or create a new list on initial load.
- Add sleeper integrated draft board
  - Modal to provide link or id of draft
  - Poll api request to get picks that have been made (may need a query parameter to cache bust)
  - Display remaining players, highlight worst case scenerio for your upcoming picks. 
- Fix actions move buttons with filtered out players
- Add some confirm modals
- Add users to draft mode
- Add accounts
  - Add basic firebase auth
  - Cleanup login UI
  - Sync draft boards to the account (Continue to use localstorage when not logged in.)
- Host online
- Undo Draft Picks
- Code Cleanup
- Get Player data via API call.
