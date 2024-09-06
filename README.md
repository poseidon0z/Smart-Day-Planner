### **Smart Day Planner - MERN Stack Application**

---

#### **Project Overview**

The **Smart Day Planner** is a productivity tool designed to optimize daily scheduling and task management using AI. By breaking down complex tasks into smaller, manageable units and offering real-time scheduling adjustments, this app aims to enhance users' time management and overall productivity.

This application is built using the **MERN stack** (MongoDB, Express, React, and Node.js) and hosted on **Vercel**.

You can find the hosted link of the website [here](https://smart-day-planner.vercel.app/)

---

### **Table of Contents**

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Installation and Setup](#installation-and-setup)
5. [Scripts](#scripts)
6. [Contributing](#contributing)

---

### **Features**

- **AI-Powered Task Breakdown:** Automatically split complex tasks into smaller, manageable subtasks.
- **Real-Time Schedule Adjustment:** Dynamic timetable updates in response to task completion and delays.
- **Task Difficulty Highlighting:** Identify challenging tasks for better prioritization.
- **Optimized Timetable Generation:** AI-generated schedules based on task input and time estimates.
- **Time Management Alerts:** Highlights tasks with inadequate or excessive time allocation.
- **Completion Tracking:** Compare expected vs. actual task completion times.

---

### **Tech Stack**

- **Frontend:**

  - React
  - TailwindCSS
  - Vercel (Hosting)

- **Backend:**

  - Node.js
  - Express
  - MongoDB (Database)
  - Vercel (Hosting API)

- **AI Integration:**
  - Task complexity evaluation and schedule optimization (to be implemented with custom AI logic).

---

### **Folder Structure**

```
|-- Client               # React frontend using TailwindCSS
|-- Server               # Backend (Express)
|-- Docs                 # Documentation files for the project
```

---

### **Installation and Setup**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/smart-day-planner.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd smart-day-planner
   ```

3. **Install dependencies for both the frontend and backend:**

   - For the **Client**:

     ```bash
     cd Client
     npm install
     ```

   - For the **Server**:
     ```bash
     cd ../Server
     npm install
     ```

4. **Set up environment variables:**

   Create a `.env` file in the `Server` folder with the following variables:

   ```bash
   MONGO_URI=<your-mongodb-connection-string>
   PORT=<your-server-port>
   ```

5. **Run the Client and Server:**

   - To run both the client and server locally:

     Open two terminals and run the following commands in separate terminals:

     - **Client (React Frontend):**

       ```bash
       cd Client
       npm start
       ```

     - **Server (Node.js + Express Backend):**
       ```bash
       cd Server
       npm start
       ```

6. **Deploying to Vercel:**

   - Make sure you have the Vercel CLI installed globally. If not, run:

     ```bash
     npm install -g vercel
     ```

   - Deploy the **Client** and **Server** to Vercel by running:

     ```bash
     vercel
     ```

---

### **Scripts**

- **Client Scripts:**

  ```bash
  npm start      # Start the React app
  npm build      # Build the app for production
  npm test       # Run tests
  ```

- **Server Scripts:**

  ```bash
  npm start      # Start the Express server
  npm run dev    # Start the server with nodemon for development
  npm test       # Run tests
  ```

---

### **Contributing**

This project is currently a personal endeavor, but contributions are welcome for improvements and bug fixes.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

---
