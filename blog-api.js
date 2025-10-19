import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

// Error logging helper
function logErrorToFile(error) {
  try {
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
    const logPath = path.join(logDir, 'custom-error.log');
    fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${error.stack || error}\n`);
  } catch (e) {
    // Fallback: ignore logging errors
  }
}

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BLOG_FILE = path.join(__dirname, 'blog-posts.json');

function readPosts() {
  if (!fs.existsSync(BLOG_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(BLOG_FILE, 'utf-8'));
}
function writePosts(posts) {
  fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2), 'utf-8');
}

router.get('/api/blog-posts', (req, res) => {
  res.json(readPosts());
});

router.post('/api/blog-posts', (req, res) => {
  try {
    const posts = readPosts();
    const newPost = { ...req.body, id: Date.now().toString() };
    posts.unshift(newPost);
    writePosts(posts);
    res.status(201).json(newPost);
  } catch (err) {
    logErrorToFile(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/api/blog-posts/:id', (req, res) => {
  try {
    const posts = readPosts();
    const idx = posts.findIndex(p => p.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Not found' });
    }
    posts[idx] = { ...posts[idx], ...req.body };
    writePosts(posts);
    res.json(posts[idx]);
  } catch (err) {
    logErrorToFile(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/api/blog-posts/:id', (req, res) => {
  try {
    let posts = readPosts();
    const idx = posts.findIndex(p => p.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Not found' });
    }
    const deleted = posts[idx];
    posts = posts.filter(p => p.id !== req.params.id);
    writePosts(posts);
    res.json(deleted);
  } catch (err) {
    logErrorToFile(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
