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

})


module.exports = minionsRouter;