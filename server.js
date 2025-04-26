import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.get('/data', (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
