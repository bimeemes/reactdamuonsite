const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Basic test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Simple Node.js API is working!',
    timestamp: new Date().toISOString(),
  });
});

// Catch all
app.get('*', (req, res) => {
  res.json({
    message: 'Node.js app is running',
    path: req.path,
    method: req.method,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
