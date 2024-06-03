const checkMillionDollarIdea = (req, res, next) => {
    const isMillionDollarIdea = req.numWeeks*req.weeklyRevenue >= 1000000;
    if (isMillionDollarIdea) {
        next();
    } else {
        res.status(400).send('Not created, this is not a million dollar idea.');
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
