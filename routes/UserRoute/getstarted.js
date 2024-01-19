var express = require('express');
var router = express.Router();
var indexmodel = require('../../model/UserApi')

router.get('/', async (req, res, next) => {
    try {
        if (req.session && req.session.user) {
            req.session.user;
            res.render('getstarted');
        } else {
            console.log("User not found in session");
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error rendering getstarted:", error);
        next(error);
    }
});



module.exports = router;


