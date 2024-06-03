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
    const minion = getFromDatabaseById('minions', minionId);
    if (!minion) {
        res.status(404).send('No minion with that id.');
    } else {
        req.minion = minion;
        next();
    }
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
    res.status(200).send(req.minion);
})

minionsRouter.put('/:minionId', (req, res, next) => {
    const minionToUpdate = {
        id: req.minion.id,
        name: req.body.name,
        title: req.body.title,
        salary: req.body.salary,
        weaknesses: req.body.weaknesses
    }
    const updatedMinion = updateInstanceInDatabase('minions', minionToUpdate);
    res.status(201).send(updatedMinion);
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.minion.id);
    if (!deleted) return res.status(500).send('Resource not deleted.');
    res.status(204).send(`Removed ${req.minion.name}`);
})


module.exports = minionsRouter;