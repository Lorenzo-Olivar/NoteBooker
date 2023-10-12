// imports
const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
// get route to access the db/tasks.json
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for tasks`);
    readFromFile('./db/tasks.json').then((tasks) => res.json(JSON.parse(tasks)));
  });
// post route to add to the db/tasks.json
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a task`);
    const {title,text} = req.body;
    if (req.body) {
        const newTask = {
            title,
            text,
        };
        readAndAppend(newTask, './db/tasks.json');
        alert(`Task was added successfully`)
    } else {
        res.errored('Error in adding task')
    }
});
// export
module.exports = notes;