var express = require('express');
var router = express.Router();
const onboardingModel = require('../../model/OnBoardingApi')
router.get('/', (req, res, next) => {
    try {
        if (req.session && req.session.user) {
            const user = req.session.user;
            if (user) {
                res.render('onboarding_que', { user });
            } else {
                res.render('onboarding_que', { 'msg': 'User object not found in the session' });
            }

        } else {
            console.log("User not found in session");
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error rendering general_home:", error);
        next(error);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const user = req.session.user;
        const uuid = user.uuid;
        await onboardingModel.onboardingQuestion(req.body,uuid, (success, user) => {
            console.log("Result:", success);
            if (success) {
                req.session.user = user
                console.log("User profile added successfully");
                res.redirect('/get_started');
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


