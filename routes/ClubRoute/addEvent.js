var express = require('express');
var router = express.Router();
var clubmodel = require('../../model/ClubApi');
const upload3 = require('../../utils/eventImage');

router.get('/', async (req, res, next) => {
    try {
        if (req.session && req.session.user) {
            const user = req.session.user;
            res.render('addEvent', { user });
        } else {
            console.log("Club not found in session");
            res.status(404).send({ 'error': 'Club not found', 'status': 404 });
        }
    } catch (error) {
        console.error("Error rendering addEvent Page:", error);
        res.status(500).send({ 'error': 'Internal Server Error', 'status': 500 });
    }
});

router.post('/', upload3, async (req, res, next) => {
    const data = req.session.user;
    clubmodel.addEvent(req.body, (result) => {
        if (result) {
            req.session.user = data;
            res.redirect('/addEventView');
            console.log("Club event added successfully");
        } else {
            console.log("Failed to add club event");
            res.status(500).send({ 'error': 'Failed to add club event', 'status': 500 });
        }
    });
});

module.exports = router;
