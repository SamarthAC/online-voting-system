# Cloud-Based Online Voting System

A complete online voting app built with:

- React + Vite
- Tailwind CSS
- Firebase Authentication (Email/Password)
- Firebase Firestore

## Features

- Signup/Login with Firebase Auth
- Persistent login session
- One vote per user (strictly enforced in Firestore transaction)
- Candidate voting cards
- Live vote results with progress bars
- Responsive modern UI with glassmorphism styling
- Alerts and loading states

## Project Structure

```text
online-voting-system/
  public/
  src/
    components/
      layout/
        AppShell.jsx
      results/
        ResultBar.jsx
      ui/
        Alert.jsx
        Button.jsx
        Input.jsx
        LoadingSpinner.jsx
      voting/
        CandidateCard.jsx
    constants/
      candidates.js
    context/
      AuthContext.jsx
    pages/
      AuthPage.jsx
      ResultsPage.jsx
      VotePage.jsx
    routes/
      ProtectedRoute.jsx
    services/
      authService.js
      voteService.js
    App.jsx
    firebase.js
    index.css
    main.jsx
  .env.example
  postcss.config.js
  tailwind.config.js
  package.json
```

## Firebase Setup

1. Create a Firebase project from [Firebase Console](https://console.firebase.google.com/).
2. Enable Authentication:
   - Go to Authentication > Sign-in method.
   - Enable Email/Password.
3. Create Firestore Database in production or test mode.
4. Add a web app in Firebase and copy config values.
5. Create `.env` file from `.env.example` and fill your Firebase values:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

## Recommended Firestore Security Rules

Use these rules so each user can write only one vote document under their own UID and only read votes:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /votes/{userId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
        && request.auth.uid == userId
        && !exists(/databases/$(database)/documents/votes/$(userId));
      allow update, delete: if false;
    }
  }
}
```

## Run the Project

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```
# online-voting-system
