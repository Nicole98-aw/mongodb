// CRUD create, read, update, delete
const { MongoClient, ObjectID } = require('mongodb'); //IMPORTING MONGODB PACKAGE INTO THE DATABASE
// const MongoClient = mongodb.MongoClient; // using MongoClient method on mongodb package to connect to the database

const connectionURL = 'mongodb://127.0.0.1:27017'; // database URL
const databaseName = 'task-manager'; // database name


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => { // using connect method on MongoClient to connect to the database  (error,client) are what we use to inquire the database
    if (error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName); // use db method on client then pass the database name

    // db.collection('users').insertOne({ // use collection method on db to insert our data-
    //     name: 'Nicole',
    //     age: 21
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Bianca',
    //         age: 30
    //     }, {
    //         name: 'Scott',
    //         age: 28
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents');
    //     }
    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Clean the house',
    //         completed: true
    //     }, {
    //         desription: 'Renew inspection',
    //         completed: false
    //     }, {
    //         description: 'Pot plants',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks');
    //     }
    //     console.log(result.ops);
    // });

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     console.log(tasks);
    // });

    // db.collection('users').updateOne({
    //     id: new ObjectID("5db2973e68b27d225c472a30")
    // }, {
    //     $inc: {
    //         age: 3
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });


    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount);
    // }).catch((error) => {
    //     console.log(error);
    // });

    db.collection('tasks').deleteOne({
        description: 'Clean the house'
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
});