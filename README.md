# Synergistic User Management App

This project is a **React** application that performs CRUD (Create, Read, Update, Delete) operations on user data using the **JSONPlaceholder** API. The app is styled with **CSS** and is developed using **Vite** for fast and optimized performance.

## Live Demo

To run the app locally:
1. Clone the repository
2. Install the dependencies (`npm install`)
3. Run the app locally (`npm run dev`)

## Folder Structure

├── node_modules        # Dependencies
├── public              # Static assets
├── src
│   ├── assets          # Project assets (e.g., images, fonts, etc.)
│   ├── Components      # React components
│   │   ├── GettingData.jsx   # Component to fetch and display user data
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # React entry point
│   ├── style.css       # Global styling for the application
├── .gitignore          # Ignoring unnecessary files for version control
├── eslint.config.js    # ESLint configuration for linting JavaScript and JSX
├── index.html          # Root HTML file for the project
├── package.json        # Project dependencies and scripts
├── vite.config.js      # Vite configuration for build optimization

## Technologies Used

- **React**: The main framework for building the user interface.
- **Axios**: Used for making HTTP requests to the JSONPlaceholder API.
- **Vite**: Build tool that provides a fast development environment.
- **JavaScript (ES6)**: Modern JavaScript features like hooks (`useState`, `useEffect`) are used throughout the app.
- **CSS**: For styling the app.

## Features

- **User Management**: Add, edit, delete, and list users dynamically.
- **Dynamic IDs**: Each new user gets a unique ID, ensuring there are no duplicate IDs.
- **Responsive Design**: Fully responsive design that adapts to different screen sizes.
- **Axios for API Requests**: All CRUD operations are done using Axios to interact with a remote API.

## Components

### 1. **GettingData.jsx**
   - Fetches user data from the API.
   - Handles the CRUD operations for the users.
   - Tracks the next available ID for new users.

### 2. **App.jsx**
   - The root component for the application that wraps the user management logic.

### 3. **main.jsx**
   - React entry point that renders the application into the `index.html`.

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
