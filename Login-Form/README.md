# Internship Login Page Assessment

A responsive login page built with **React**, **Vite**, **TypeScript**, and **Material UI (MUI)**. The project includes form validation, Google Sign-In with Firebase Authentication, an access-token page, and Firebase Hosting deployment.

## Live Demo

- Firebase hosted link: ``
- GitHub repository: ``

## Features

- Login page based on the provided reference design
- Responsive layout for desktop, tablet, and mobile screens
- Email and password input fields
- Email format validation
- Required-field validation
- Show/hide password button
- Google Sign-In using Firebase Authentication
- Redirect after successful Google login
- Displays the signed-in user's Firebase access token
- Sign-out button
- Hosted using Firebase Hosting

> The email/password form validates the user's input only. It does not connect to a backend because the assessment does not require email/password authentication.

## Technologies Used

- React
- Vite
- TypeScript
- Material UI (MUI)
- React Router DOM
- React Hook Form
- Firebase Authentication
- Firebase Hosting
- Git and GitHub

## Suggested Project Structure

```text
src/
├── assets/
│   └── images/
├── components/
│   ├── FormInput.tsx
│   └── GoogleLoginButton.tsx
├── config/
│   └── firebase.ts
├── layouts/
│   └── AuthLayout.tsx
├── pages/
│   ├── LoginPage.tsx
│   └── TokenPage.tsx
├── routes/
│   └── AppRoutes.tsx
├── theme/
│   └── theme.ts
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

## Getting Started

### 1. Clone the repository

```bash
git clone ADD_YOUR_GITHUB_REPOSITORY_URL_HERE
cd internship-login-page
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the environment file

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

You can find these values in **Firebase Console → Project settings → General → Your apps → Firebase SDK snippet**.

Do not commit the `.env` file. Add it to `.gitignore`.

### 4. Run the project locally

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Firebase Authentication Setup

1. Open the Firebase Console.
2. Create a Firebase project.
3. Add a Web App to the project.
4. Open **Authentication**.
5. Select **Get started**.
6. Open the **Sign-in method** tab.
7. Enable **Google** as a sign-in provider.
8. Select a support email and save the settings.
9. Add your Firebase configuration values to `.env`.

For local testing, make sure `localhost` is listed under **Authentication → Settings → Authorized domains**.

## Application Flow

1. The user opens the login page.
2. The user may enter an email and password to test form validation.
3. The email must be in a valid format, and both fields are required.
4. The user clicks **Continue with Google**.
5. Firebase opens the Google Sign-In popup.
6. After successful authentication, the app retrieves the Firebase ID token.
7. The user is redirected to `/token`.
8. The token page displays the access token and provides a sign-out button.

## Form Validation

The form checks:

- Email is required
- Email follows a valid email format
- Password is required
- Password contains at least 6 characters

Clear error messages are displayed below invalid fields.

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates a production build in the `dist` folder.

```bash
npm run preview
```

Runs the production build locally for checking.

```bash
npm run lint
```

Checks the project for linting problems.

## Deploying to Firebase Hosting

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Log in to Firebase

```bash
firebase login
```

### 3. Initialize Firebase Hosting

```bash
firebase init hosting
```

Choose the following options:

- Select your existing Firebase project
- Public directory: `dist`
- Configure as a single-page app: `Yes`
- Set up automatic GitHub deployment: optional
- Do not overwrite `index.html` if Firebase asks

### 4. Build the project

```bash
npm run build
```

### 5. Deploy

```bash
firebase deploy
```

Firebase will display the hosted website URL after deployment.

## Important Security Note

Firebase web configuration values are used by the frontend and are not treated like server passwords. However, the `.env` file should still be excluded from Git so each environment can have its own configuration.

The access token is displayed only because the assessment specifically requires it. In a real application, avoid unnecessarily displaying or logging authentication tokens.

## Author

Yoonus Anees.

