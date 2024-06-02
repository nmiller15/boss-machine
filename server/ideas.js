const express = require('express');
const ideasRouter = express.Router();
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase, } = require ('./db');


ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    if (!ideas) return res.status(404).send('Ideas could not be located.');
    res.status(200).send(ideas);
})

ideasRouter.post('/', (req, res, next) => {
    const newIdea = {
        description: req.body.description,
        name: req.body.name,
        numWeeks: req.body.numWeeks,
        weeklyRevenue: req.body.weeklyRevenue
    }
    const added = addToDatabase('ideas', newIdea);
    if (!added) return res.status(400).send('Not added.');
    res.status(201).send(`Successfully added idea: ${added.name}`);
})

module.exports = ideasRouter;