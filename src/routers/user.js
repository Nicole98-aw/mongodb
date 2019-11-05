const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();


router.post('/users', async (req, res) => { // path for creating through /users
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

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.get('/users', auth, async (req, res) => { //path for retrieving data through /users
    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch((error) => {
    //     res.status(500).send();
    // });
       try {
           const users = await User.find({});
           res.send(users);
       } catch {
           res.status(500).send();
       }
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    // User.findById(_id).then((user) => {
    //     if(!user) {
    //         return res.status(404).send();
    //     }

    //     res.send(user);
    // }).catch((e) => {
    //     res.status(500).send();
    // });
       try {
           const user = await User.findById(_id);
           if (!user) {
               return res.status(404).send();
           }
           res.send(user);
       } catch (e) {
           res.status(500).send();
       }
    });

    router.patch('/users/:id', async (req, res) => { //patch is a http method that is used to update info in the database
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'age'];
        const isValidOperation = updates.every((update) => 
        allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates '});
        }

        try {
            const user = await User.findById(req.params.id);

            updates.forEach((update) => {
                return user[update] = req.body[update];
            });

            await user.save();

            if (!user) {
                return res.status(404).send();            
            }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user) {
             res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;