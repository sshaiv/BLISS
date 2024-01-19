var express = require('express');
var router = express.Router();
const indexmodel = require('../../model/UserApi')
const createTokens = require('../../utils/JWT');


router.get('/', (req, res, next) => {
  res.render('user_register', { msg: '' });
});

//REGISTER ROUTE
router.post('/', async function (req, res, next) {
  try {
    // Phone validation
    if (!/^[0-9]{10}$/.test(req.body.phone)) {
      res.render('user_register', { 'msg': 'Invalid phone number' });
      return;
    }

    // Generate access token
    const accessToken = createTokens("users");
    res.cookie("access-Token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });

    // Call registeruser function
    await indexmodel.registeruser(req.body, accessToken, (success, error) => {
      const user = req.body;
      console.log("Result :", success);
      if (success) {
        req.session.user = user;
        // res.send("User registered successfully");
        console.log("User registered successfully");
        res.redirect('/user_profile');
      } else {
        if (error && error.msg === 'Invalid phone number') {
          res.render('user_register', { 'msg': 'Invalid phone number' });
          console.log('Invalid phone number');
        } else {
          res.render('user_register', { 'msg': 'User already exists' });
          console.log('User already exists');
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.render('register', { 'msg': 'Error occurred during registration' });
  }
});


module.exports = router;


