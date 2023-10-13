// imports
const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); 
// get route to access the db/tasks.json
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for tasks`);
    fs.readFile('./db/tasks.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data));
        }
    });
  });
// post route to add to the db/tasks.json
notes.post('/', (req,res) => {
    console.info(`${req.method} request received to add tasks`);
    const { title , text } = req.body;
    if (req.body) {
        const newTask = {
            title,
            text,
            id: uuidv4(),
        }
        fs.readFile('./db/tasks.json', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(newTask);
                fs.writeFile('./db/tasks.json', JSON.stringify(parsedData), (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('A new task has been written to tasks.json!')
                    }
                })
            }
        });
        res.json('Task added');
    } else {
        res.json('Unable to add newTask');
    };
})
// export
module.exports = notes;