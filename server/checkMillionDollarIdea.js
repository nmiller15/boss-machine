const checkMillionDollarIdea = (req, res, next) => {
    const isMillionDollarIdea = req.body.numWeeks*req.body.weeklyRevenue >= 1000000;
    if (isMillionDollarIdea) {
        console.log('This is a million dollar idea.');
        next();
    } else {
        res.status(400).send("This is not a million dollar idea");
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
