var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        if (req.session && req.session.user) {
            const user = req.session.user;
            res.render('addEventView', { user });
        } else {
            console.log("Club not found in session");
            res.status(404).send({ 'error': 'event not found', 'status': 404 });
        }
    } catch (error) {
        console.error("Error rendering addEvent Page:", error);
        res.status(500).send({ 'error': 'Internal Server Error', 'status': 500 });
    }
});

module.exports = router;
