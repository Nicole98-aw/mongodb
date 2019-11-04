const express = require('express');
const Task = require('../models/task');
const router = new express.Router();


router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    // task.save().then(() => {
    //     res.status(201).send(task);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // });
       try {
           await task.save();
           res.status(201).send(task);
       } catch (e) {
           res.status(400).send(e);
       }
});

router.get('/tasks', async (req, res) => {
    // Task.find({}).then((tasks) => {
    //     res.send(tasks);
    // }).catch((e) => {
    //     res.status(500).send();
    // });
       try {
           const tasks = await Task.find({});
           res.send(tasks);
       } catch (e) {
           res.status(500).send(e);
       }
});

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send();
    //     }

    //     res.send(task);
    // }).catch((e) => {
    //     res.status(500).send();
    // });
       try {
           const task = await Task.findById(_id);

           if(!task){
               return res.status(404).send();
           }
           res.send(task);
       } catch (e) {
           res.status(500).send();
       }
});

router.delete('/task/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task){
            res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;