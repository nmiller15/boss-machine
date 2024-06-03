const express = require('express');
const meetingsRouter = express.Router();
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase, } = require ('./db');

meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.status(200).send(meetings);
});

meetingsRouter.post('/', (req, res, next) => {
    const added = addToDatabase('meetings', req.body);
    if (!added) return res.status(400).send('Instance is not valid.');
    res.status(201).send(`Successfully added meeting on ${added.day}`);
})

module.exports = meetingsRouter;