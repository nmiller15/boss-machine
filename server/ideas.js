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

module.exports = ideasRouter;