---
name: getbestplayers-deploy
description: "Use when you need to refresh the player data with GetBestPlayers and then deploy the updated app to Firebase."
---

# Refresh player data and deploy

Use this skill when the player rankings or draft data need to be refreshed before publishing.

## Workflow

1. Run the player refresh script:
   - `node SleeperParser/GetBestPlayers.js`
2. Check the output for any errors or missing data.
3. Run the standard production build:
   - `npm run build`
4. Stage the updated files:
   - `git add .`
5. Create a deployment commit:
   - `git commit -m "Refresh player data and deploy"`
6. Push the branch:
   - `git push`
7. Deploy to Firebase:
   - `firebase deploy --only hosting`
8. Share the deployment result and the live site URL with the user.

## Notes

- This skill is the data-refresh and publish workflow combined.
- If the refresh script produces no files or no diffs, continue with the build and deployment steps anyway.
- The deployment flow should match the repo's standard Firebase hosting configuration.
