const express = require('express');
const minionsRouter = express.Router();
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase, } = require ('./db');

minionsRouter.get('/', (req, res, next) => {
    const minionsArray = getAllFromDatabase('minions');
    res.send(minionsArray);
})

minionsRouter.post('/', (req, res, next) => {
    const id = null;
    const name = req.body.name;
    const title = req.body.title;
    const salary = Number(req.body.salary);
    const weaknesses = req.body.weaknesses;

    const instance = {
        id,
        name,
        title,
        salary,
        weaknesses
    }
    const newMinion = addToDatabase('minions', instance);
    res.status(201).send(`Successfully created new minion: ${newMinion.name}`);
})


module.exports = minionsRouter;