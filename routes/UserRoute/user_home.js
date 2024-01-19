var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        if (req.session && req.session.user) {
            const user = req.session.user;
            res.render('general_home', { user });
        } else {
            console.log("User not found in session");
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error rendering general_home:", error);
        next(error);
    }
});



module.exports = router;


