const express = require ('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express(); //instantiating express app
const port = process.env.PORT || 3000; //specifying the port that will be used by server & if it doesn't exist 3000 is used

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down');
// });

app.use(express.json()); //use express to format data
app.use(userRouter);
app.use(taskRouter); 


app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

// const bcrypt = require('bcryptjs');

// const myFunction = async () => {
//     const password = 'batman';
//     const hashedPassword = await bcrypt.hash(password, 8);

//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare('batman', hashedPassword);
//     console.log(isMatch);
// };

// myFunction();

const jwt = require('jsonwebtoken');

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123'}, 'naughty', { expiresIn: '10 seconds'});
    console.log(token);

    const data = jwt.verify(token, 'naughty');
    console.log(data);
}

myFunction();