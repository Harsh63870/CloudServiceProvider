const express = require('express');
const path = require('path');
const postRoutes = require('./routes/post.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();

app.use(express.json());
app.use('/api/posts', postRoutes);
app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route nahi mila: ${req.method} ${req.originalUrl}` });
});

app.use(errorHandler);

module.exports = app;
