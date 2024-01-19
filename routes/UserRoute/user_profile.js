var express = require('express');
var router = express.Router();
const createTokens2 = require('../../utils/JWT')
const upload1 = require('../../utils/UserImageUpload')
const validateFiles = require('../../utils/validateFiles');
const indexmodel = require('../../model/UserApi')

router.get('/', (req, res, next) => {
    try {
        if (req.session && req.session.user) {
            const user = req.session.user;
            res.render('user_profile', { user, msg: "" });
        } else {
            console.log("User not found in session");
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error rendering general_home:", error);
        next(error);
    }
});



router.post('/', upload1, validateFiles, async (req, res, next) => {
    try {
        // Generate access token
        const accessToken = createTokens2("user_profile");
        res.cookie("access-Token", accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
        });

        if (!req.files || !req.files.ProfileImage || req.files.ProfileImage.length === 0) {
            return res.status(400).json({ errors: [{ msg: "No files were uploaded." }] });
        }

        const ProfileImage = req.files.ProfileImage[0].filename;
        const data = req.session.user
        await indexmodel.userProfile(req.body, ProfileImage, accessToken, (success, error) => {
            console.log("Result:", success);
            if (success) {
                req.session.user = data;
                console.log("User profile added successfully");
                res.redirect('/onboarding_que');
            } else {
                res.render('user_profile', { 'msg': 'User profile already exists' });
                console.log('User profile already exists');
            }
        });
    } catch (error) {
        console.error(error);
        res.render('user_profile', { 'msg': 'Error occurred during user_profile addition' });
    }
});

module.exports = router;
