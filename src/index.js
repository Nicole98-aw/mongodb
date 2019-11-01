const express = require ('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express(); //instantiating express app
const port = process.env.PORT || 3000; //specifying the port that will be used by server & if it doesn't exist 3000 is used

app.use(express.json()); //use express to format data 

app.post('/users', async (req, res) => { // path for creating through /users
    const user = new User(req.body);

    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // });
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/users', (req, res) => { //path for retrieving data through /users
    User.find({}).then((users) => {
        res.send(users);
    }).catch((error) => {
        res.status(500).send();
    })
});

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send();
        }

        res.send(user);
    }).catch((e) => {
        res.status(500).send();
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((e) => {
        res.status(500).send();
    });
});

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    }).catch((e) => {
        res.status(500).send();
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});