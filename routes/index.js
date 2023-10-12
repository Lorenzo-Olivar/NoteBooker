// imports
const express = require('express');
const app = express();
const notesRouter = require('./notes');
// middleware
app.use('/notes', notesRouter);
// export
module.exports = app;