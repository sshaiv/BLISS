var express = require('express');
var router = express.Router();
const validateFiles = require('../../utils/validateFiles');
const clubmodel = require('../../model/ClubApi');
const createTokens3 = require('../../utils/JWT');
const upload = require('../../utils/clubImageUpload');


router.get('/', (req, res, next) => {
    res.render('club_register', { msg: '' });
});

//REGISTER club ROUTE
router.post('/', upload, validateFiles, function (req, res, next) {
    const accessToken = createTokens3("clubs");
    res.cookie("access-Token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
    });
    const Club_banner = req.files.Club_banner[0].filename;
    const Owner_dp = req.files.Owner_dp[0].filename;
    const Club_docs = req.files.Club_docs[0].filename;
    const password = req.body.password
    clubmodel.registerClub(req.body, Club_banner, Owner_dp, Club_docs,password, accessToken, (result) => {
        const club = req.body;
        console.log("Result:", result);
        if (result) {
            req.session.user = club;
            res.redirect('/addEvent');
            console.log("Club registered successfully");
        } else {
            res.send("Club already exists or invalid data");
            console.log("Club already exists or invalid data");
        }
    });
});



module.exports = router;


