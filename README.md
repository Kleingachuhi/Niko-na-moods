# MoodMate – Emotional Wellness Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Frontend: Netlify](https://img.shields.io/badge/Frontend-Netlify-brightgreen)](https://www.netlify.com/)
[![Backend: Render](https://img.shields.io/badge/Backend-Render-blueviolet)](https://render.com/)

MoodMate is a simple and friendly web app to help you track your moods, journal your thoughts, and set personal growth goals. Built as a beginner React project, MoodMate is designed for anyone seeking a better understanding of their emotions and mental well-being.

---

## 📝 About the Project

As a beginner developer, I created MoodMate to be a useful tool for emotional tracking while also learning React. It’s a personal and meaningful app that combines self-care with skill-building.

With **MoodMate**, you can:

- Log how you're feeling each day
- Write journal entries to reflect on your thoughts
- Set and track personal goals
- See patterns in your mood over time

---

## ✨ Features

- ✅ **Mood Tracking:** Choose from various moods and add personal notes  
- 📝 **Journaling:** Write daily entries to process your thoughts  
- 🎯 **Goal Setting:** Track your personal growth and accomplishments  
- 📱 **Responsive Design:** Works on mobile, tablet, and desktop  
- 🌟 **User-Friendly UI:** Clean, modern interface built for ease-of-use  

---

## ⚙️ Tech Stack

| Frontend       | Backend        | Deployment                |
|----------------|----------------|---------------------------|
| React.js       | JSON Server    | Netlify (Frontend)        |
| Tailwind CSS   | REST API       | Render (Backend)          |
| React Router   |                |                           |
| React Icons    |                |                           |

---

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- Basic understanding of React (optional)

---

### 🔧 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/moodmate.git
cd moodmate
Install dependencies:

bash
Copy
Edit
npm install
Start the frontend development server:

bash
Copy
Edit
npm start
🔌 Backend Setup (Mock API with JSON Server)
Install JSON Server globally:

bash
Copy
Edit
npm install -g json-server
Run the mock backend:

bash
Copy
Edit
json-server --watch db.json --port 3001
Make sure your frontend fetches data from http://localhost:3001.

🌐 Deployment
Frontend: Deployed via Netlify

Backend: Deployed using Render with a hosted version of db.json

Update your API base URL in the app to match your Render backend URL (e.g. https://your-render-api.onrender.com).

📂 Project Structure
pgsql
Copy
Edit
moodmate/
├── src/
│   ├── components/
│   │   ├── NavBar.jsx
│   │   ├── MoodEntry.jsx
│   │   └── JournalEntry.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MoodLog.jsx
│   │   ├── Journal.jsx
│   │   └── Goals.jsx
│   ├── App.js
│   └── index.js
├── db.json
├── package.json
└── README.md
🧠 ESLint & Plugins
MoodMate uses Vite with the following React plugins:

@vitejs/plugin-react – Uses Babel for Fast Refresh

@vitejs/plugin-react-swc – Uses SWC for faster development

Want to use TypeScript? Check out the Vite TS template to get started with type-safe development.

🤝 Contributing
Contributions are welcome! Here’s how to help:

Fork the project

Create your feature branch:

bash
Copy
Edit
git checkout -b feature/AmazingFeature
Commit your changes:

bash
Copy
Edit
git commit -m 'Add some AmazingFeature'
Push to the branch:

bash
Copy
Edit
git push origin feature/AmazingFeature
Open a Pull Request

📜 License
This project is licensed under the MIT License.
See the LICENSE file for more details.

