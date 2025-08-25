# TRASH-CLASH | Full-Stack Clash of Clans Strategy Platform

![Project Banner](https://raw.githubusercontent.com/your-username/your-repo-name/main/assets/banner.png)
A dynamic, full-stack web application built for the Clash of Clans community, providing a centralized platform to discover, share, and manage game strategies and base layouts.

**Live Demo:** [**trash-clash.vercel.app**](https://trash-clash.vercel.app)

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Contact](#contact)

---

## 🚀 About The Project

TRASH-CLASH was created to solve a common problem for Clash of Clans players: finding up-to-date, effective, and well-organized base layouts and attack strategies. Unlike static guide websites, this platform provides a dynamic and interactive experience where users can filter content by game mode (Town Hall vs. Builder Hall) and type.

The application features a public, read-only view for all users and a secure admin panel for content management, all powered by a robust RESTful API.

---

## ✨ Key Features

- **Dynamic Content Filtering:** Users can instantly filter troops, layouts, and strategies by game mode and type.
- **Interactive UI:** A responsive and modern user interface built with React and styled with Tailwind CSS.
- **Image Carousels:** Base layout cards feature auto-sliding image carousels with a pause-on-hover feature to preview multiple base designs.
- **Secure Admin Panel:** A JWT-based authentication system protects CRUD (Create, Read, Update, Delete) operations for all content.
- **Pagination:** Efficiently handles large sets of data by paginating layout and strategy lists.
- **Detailed View Pages:** Clicking on a layout takes the user to a dedicated page with a larger image carousel, detailed description, and a "Use This Layout" link.
- **CI/CD Pipeline:** Automated deployments for both frontend and backend ensure seamless updates.

---

## 🛠️ Tech Stack

| Category           | Technology                               |
| :----------------- | :--------------------------------------- |
| **Frontend** | React, Tailwind CSS, Axios, React Router |
| **Backend** | Node.js, Express.js                      |
| **Database** | PostgreSQL                               |
| **Authentication** | JSON Web Tokens (JWT)                    |
| **Deployment** | Vercel (Frontend), Render (Backend & DB) |

---

## 🏗️ Architecture

The application follows a classic client-server model:

-   **Frontend (Client):** A Single Page Application (SPA) built with **React**. It communicates with the backend via RESTful API calls to fetch and display data.
-   **Backend (Server):** A **Node.js/Express.js** server that handles business logic, interacts with the database, and exposes a set of API endpoints.
-   **Database:** A **PostgreSQL** database hosted on Render stores all application data, including users, troops, layouts, and strategies.

```

\+-----------------+      HTTP (REST API)     +-----------------+      SQL    +-----------------+
|                 | \<---------------------\> |                 | \<-------\> |                 |
|  React Frontend |                           |  Node.js Backend|             |   PostgreSQL DB |
|   (on Vercel)   |                           |   (on Render)   |             |   (on Render)   |
|                 |                           |                 |             |                 |
\+-----------------+                          +-----------------+             +-----------------+

````

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18.x or later)
-   npm or yarn
-   PostgreSQL installed locally

### Installation

1.  **Clone the Frontend & Backend Repositories**
    ```sh
    # Clone the frontend
    git clone [https://github.com/your-username/trash-clash-frontend.git](https://github.com/your-username/trash-clash-frontend.git)
    cd trash-clash-frontend
    npm install

    # Clone the backend
    git clone [https://github.com/your-username/trash-clash-backend.git](https://github.com/your-username/trash-clash-backend.git)
    cd trash-clash-backend
    npm install
    ```

2.  **Configure Environment Variables**

    Create a `.env` file in the root of your **backend** directory and add the following:
    ```env
    PORT=5000
    DATABASE_URL="postgresql://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/trashclash"
    JWT_SECRET="YOUR_SUPER_SECRET_KEY"
    ```
    Create a `.env` file in the root of your **frontend** directory:
    ```env
    VITE_API_URL="http://localhost:5000/api"
    ```

3.  **Set Up the PostgreSQL Database**
    -   Create a new database named `trashclash`.
    -   Run the SQL scripts located in the `/db` folder of the backend to create the necessary tables (`troops`, `layouts`, `strategies`).

4.  **Run the Application**
    ```sh
    # Run the backend server
    cd trash-clash-backend
    npm start

    # Run the frontend development server
    cd trash-clash-frontend
    npm start
    ```

---

## 🌐 Deployment

This project is deployed using a modern CI/CD pipeline:

-   The **React frontend** is deployed on **Vercel**, which is connected directly to the `main` branch of the frontend GitHub repository. Every push triggers an automatic build and deployment.
-   The **Node.js backend** and **PostgreSQL database** are hosted on **Render**. The backend service is also connected to its GitHub repository and redeploys automatically on every push to the `main` branch.

---

## 👤 Contact

Ram - [LinkedIn](https://www.linkedin.com/in/your-linkedin-profile/) - your.email@example.com

Project Link: [https://github.com/your-username/trash-clash](https://github.com/your-username/trash-clash)
