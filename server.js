// imports
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001;
const api = require('./routes/index');
// middleware
const zoMiddleware = (req,res,next) => {
    const yellow = '\x1b[33m%s\x1b[0m';
    console.log(yellow, `${req.method} request to ${req.path}`);
    next();
};
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(zoMiddleware);
// home route
app.use(express.static('public'));
// api route
app.use('/api', api);
// app listened
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});