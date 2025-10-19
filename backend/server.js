const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/questionnaire/send-code', (req, res) => {
  res.json({ success: true });
});

app.post('/api/questionnaire/verify-code', (req, res) => {
  res.json({ success: true });
});

app.post('/api/questionnaire/submit', (req, res) => {
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
