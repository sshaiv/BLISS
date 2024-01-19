var express = require('express');
var router = express.Router();
const session = require('express-session');
var indexmodel = require('../../model/UserApi')




router.get('/', (req, res, next) => {
  res.render('user_login', { msg: '' });
});



router.post('/', async (req, res, next) => {
  try {
    indexmodel.userlogin(req.body, (results, user) => {
      console.log(results);
      if (results.length > 0) {
        req.session.user = user;
        if (results[0].role == "user") {
          res.redirect('/user_home');
        } else {
          console.log("login as an admin");
          res.redirect('/admin');
        }
      } else {
        res.render('user_login', { msg: 'Invalid user credential' });
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


