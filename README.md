
# Fluxon-NIE-BootCamp

This repository contains a full-stack app with a React frontend, Node.js and Express.js backend, and SQLite database. This README provides instructions for setting up, running, and extending the project.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the App](#running-the-app)
4. [Adding a New Endpoint and Database Table](#adding-a-new-endpoint-and-database-table)

---

## Prerequisites

### 1. Install [Node.js](https://nodejs.org/)

- **Verify installation**:
  ```bash
  node -v
  npm -v
  ```

### 2. Install SQLite

- Follow the [SQLite Installation Guide](https://www.sqlite.org/download.html) for your OS.
- **Verify installation**:
  ```bash
  sqlite3 --version
  ```
  
SQLite does not require server configuration and runs directly on the local filesystem.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/FluxonApps/nie-bootcamp-template.git
cd nie-bootcamp-template
```

### 1. Install Backend (Server) Dependencies

Navigate to the `server` directory and install dependencies:

```bash
cd server
npm install
```

### 2. Install Frontend (Client) Dependencies

Navigate to the `client` directory and install dependencies:

```bash
cd ../client
npm install
```

### 3. Set Up Database

1. In the `server` directory, create a `database.sqlite` file that SQLite will use as the database.
   ```bash
   echo database.sqlite
   ```

2. **Set up the table structure**:
   - Open SQLite and run the following SQL to create the sample table:
     ```bash
     sqlite3 database.sqlite
     ```

   - Inside the SQLite shell, create the table:
     ```sql
     CREATE TABLE sample_table (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT
     );

     INSERT INTO sample_table (name) VALUES ('John Doe'), ('Jane Smith');
     ```
   - Exit SQLite:
     ```bash
     .exit
     ```

### 4. Configure Environment Variables

1. In the `server` directory, create a `.env` file:
    ```plaintext
    PORT=5000
    DB_FILE=database.sqlite
    ```

---

## Running the App

1. **Start the Backend (Server)**:
   ```bash
   cd server
   npm run start
   ```

   The server will start on `http://localhost:5000`.

2. **Start the Frontend (Client)**:
   ```bash
   cd ../client
   npm start
   ```

   The React app will start on `http://localhost:3000` and display data from the backend.

---

## Adding a New Endpoint and Database Table

### 1. Create a New Table in SQLite

1. Open the SQLite shell with the database file:
   ```bash
   sqlite3 database.sqlite
   ```

2. Create a new table called `new_table`:
   ```sql
   CREATE TABLE new_table (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       description TEXT
   );

   INSERT INTO new_table (description) VALUES ('Sample description 1'), ('Sample description 2');
   ```

3. Exit the SQLite shell:
   ```bash
   .exit
   ```

### 2. Add a New Endpoint

1. **Create a new route**: In the `server/routes` directory, create a file called `newRoute.ts`.

   ```typescript
   import express from 'express';
   import { getNewData } from '../controllers/newController';

   const router = express.Router();

   router.get('/', getNewData);

   export default router;
   ```

2. **Create a new controller**: In the `server/controllers` directory, create a file called `newController.ts`.

   ```typescript
   import { Request, Response } from 'express';

   export const getNewData = (req: Request, res: Response) => {
     const query = 'SELECT * FROM new_table';
     const db = req.app.locals.db; // Access db instance

     db.all(query, (err, rows) => {
       if (err) {
         console.error(err);
         res.status(500).send('Server error');
       } else {
         res.json(rows);
       }
     });
   };
   ```

3. **Register the new route**: Open `server/index.ts` and add the route.

   ```typescript
   import newRoute from './routes/newRoute';
   app.use('/api/new', newRoute);
   ```

### 3. Connect the New Endpoint on the Frontend

1. **Create a new function** in `client/src/services/apiService.ts` to fetch data from the new endpoint:

   ```typescript
   import axios from 'axios';

   export const fetchNewData = () => {
     return axios.get<{ id: number; description: string }[]>('http://localhost:5000/api/new');
   };
   ```

2. **Update a React component** to call `fetchNewData()` and display the data. Here’s an example in `App.tsx`:

   ```typescript
   import React, { useEffect, useState } from 'react';
   import { fetchNewData } from './services/apiService';

   interface NewData {
     id: number;
     description: string;
   }

   const App: React.FC = () => {
     const [newData, setNewData] = useState<NewData[]>([]);

     useEffect(() => {
       fetchNewData().then(response => setNewData(response.data));
     }, []);

     return (
       <div>
         <h1>New Data</h1>
         <ul>
           {newData.map(item => (
             <li key={item.id}>{item.description}</li>
           ))}
         </ul>
       </div>
     );
   };

   export default App;
   ```

---

### Additional Notes

- **GitHub Actions CI/CD**: When you push changes to the `main` branch, GitHub Actions will automatically test and deploy the app to Heroku (configured in `.github/workflows/ci_cd.yml`).
- **Environment Variables in Production**: For deployment to Heroku, make sure to configure environment variables using `heroku config:set` as described in the `.env` setup.

This guide provides a foundational setup for further development and scaling of the app. Happy coding!
