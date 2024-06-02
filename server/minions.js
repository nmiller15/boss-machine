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
    res.status(201).send(newMinion);
})

minionsRouter.get('/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.minionId);
    if (!minion) return res.status(404).send('There is no minion by that id.');
    res.status(200).send(minion);
})

minionsRouter.put('/:minionId', (req, res, next) => {
    const minionToUpdate = {
        id: req.minionId,
        name: req.body.name,
        title: req.body.title,
        salary: req.body.salary,
        weaknesses: req.body.weaknesses
    }
    const updatedMinion = updateInstanceInDatabase('minions', minionToUpdate);
    console.log(updatedMinion)
    res.status(201).send(updatedMinion);
})


module.exports = minionsRouter;