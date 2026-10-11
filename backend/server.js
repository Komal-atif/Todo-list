const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'data', 'lists.json');

app.use(express.json());

// CORS: frontend will come from different ports (8080 / Live Server) , so allowing is necessary
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

function readLists() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeLists(lists) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(lists, null, 2));
}

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Saari lists
app.get('/api/lists', (req, res) => res.json(readLists()));

// Ek list
app.get('/api/lists/:id', (req, res) => {
  const list = readLists().find(l => l.id === Number(req.params.id));
  if (!list) return res.status(404).json({ error: 'List not found' });
  res.json(list);
});

// Create or update
app.put('/api/lists/:id', (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  if (!body || !body.name || !Array.isArray(body.tasks)) {
    return res.status(400).json({ error: 'name and tasks are required' });
  }
  const lists = readLists();
  const index = lists.findIndex(l => l.id === id);
  const list = { ...body, id };
  if (index !== -1) lists[index] = list;
  else lists.push(list);
  writeLists(lists);
  res.json(list);
});

// Delete
app.delete('/api/lists/:id', (req, res) => {
  const id = Number(req.params.id);
  const lists = readLists();
  const filtered = lists.filter(l => l.id !== id);
  if (filtered.length === lists.length) {
    return res.status(404).json({ error: 'List not found' });
  }
  writeLists(filtered);
  res.json({ deleted: true });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));