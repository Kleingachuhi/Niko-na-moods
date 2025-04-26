// import express from 'express';
// import fs from 'fs';
// import path from 'path';

// const app = express();
// const port = process.env.PORT || 3000;

// app.get('/data', (req, res) => {
//   const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
//   res.json(data);
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


const express = require('express');
const cors = require('cors');

const app = express();

// Allow requests from your Netlify domain
app.use(cors({
  origin: 'https://niko-moody.netlify.app',  // Replace with your frontend domain
}));

// Your routes go here
app.get('/moods', (req, res) => {
  res.json({ moods: ['happy', 'sad', 'excited'] });
});

app.listen(5000, () => console.log('Server running on port 5000'));
