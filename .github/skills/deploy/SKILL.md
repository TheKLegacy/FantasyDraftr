---
name: deploy
description: "Use when you need to build the app, commit the current changes, push them, and deploy the Firebase hosting site."
---

# Deploy to Firebase

Use this skill when you are ready to publish the latest code to production.

## Workflow

1. Run the production build:
   - `npm run build`
2. If the build fails, stop immediately and fix the errors before continuing.
3. Review the git status:
   - `git status --short`
4. Stage the current changes:
   - `git add .`
5. Create a deployment commit:
   - `git commit -m "Deploy to Firebase"`
6. Push the branch to the remote:
   - `git push`
7. Deploy the hosting site:
   - `firebase deploy --only hosting`
8. Report the deployment result and public URL to the user.

## Notes

- This is the standard publish workflow for the app.
- If the repo has no changes to commit, still continue with the build and Firebase deploy step.
- The project’s Firebase config is already set to host the app from the `dist` folder.
