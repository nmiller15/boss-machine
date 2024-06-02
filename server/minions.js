const express = require('express');
const minionsRouter = express.Router();
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase, } = require ('./db');

minionsRouter.param('minionId', (req, res, next, minionId) => {
    req.minionId = minionId;
    next();
})

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

minionsRouter.get('/:minionId', (req, res, next) => {
    const id = req.minionId;
    const minion = getFromDatabaseById('minions', id);
    if (!minion) return res.status(404).send('There is no minion by that id.');
    res.status(200).send(minion);
})


module.exports = minionsRouter;