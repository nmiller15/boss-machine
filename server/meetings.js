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
    const meeting = createMeeting();
    if (!meeting) return res.status(400).send('Meeting failed to create.');
    res.status(201).send(meeting);
})

meetingsRouter.delete('/', (req, res, next) => {
    const deleted = deleteAllFromDatabase('meetings');
    if (deleted === null) res.status(400).send(`Meeting removal unsuccessful.`);
    res.status(200).send(deleted);
})

module.exports = meetingsRouter;