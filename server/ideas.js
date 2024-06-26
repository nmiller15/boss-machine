const express = require('express');
const ideasRouter = express.Router();
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase, } = require ('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (!idea) {
        res.status(404).send('No idea with that id found.');
    } else {
        req.idea = idea;
        req.ideaId = idea.id;
        next();
    }
})

ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    if (!ideas) return res.status(404).send('Ideas could not be located.');
    res.status(200).send(ideas);
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = {
        name: req.body.name,
        description: req.body.description,
        weeklyRevenue: req.body.weeklyRevenue,
        numWeeks: req.body.numWeeks
    }
    const added = addToDatabase('ideas', newIdea);
    if (!added) return res.status(400).send('Not added.');
    res.status(201).send(added);
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.status(200).send(req.idea);
})

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updated = updateInstanceInDatabase('ideas', req.body);
    if (!updated) return res.status(400).send('Not updated.');
    res.status(201).send(updated);
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.ideaId);
    if (!deleted) return res.status(500).send('Resource not deleted.');
    res.status(204).send(`Successfully deleted idea: ${req.idea.name}`);
})

module.exports = ideasRouter;