const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const mustBeLoggedIn = require('../shared/middleware/mustBeLoggedIn');

function getCurrentUser(req, res) {
  console.log("get current user");

  const { id, username } = req.user;
  res.json({
    id, username
  });
}

router.route('/auth')

  .get((req, res) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'You are not currently logged in.'
      })
    }

    getCurrentUser(req, res);
  })

  .post(passport.authenticate('local'), (req, res) => {
    console.log(req);
    if (!req.user) {
      return res.status(401).json({
        message: 'Invalid username or password.'
      })
    }

    getCurrentUser(req, res);
  })

  .delete((req, res) => {
    req.logout();
    req.session.destroy();
    res.json({
      message: 'You have been logged out.'
    });
  });

router.route('/users')

  .post((req, res) => {
    db.User.create(req.body)
      .then(user => {
        console.log(user);
        const { id, username } = user;
        res.json({
          id, username
        });
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.route('/users')

  .post((req, res, next) => {
    db.User.create(req.body)
      .then(user => {
        console.log("then");
        const { id, username } = user;
        res.json({
          id, username
        });
      })
      .catch(err => {
        console.log("Error here")
        if (err.code === 11000) {
          res.status(400).json({
            message: 'Username already in use.'
          })
        }

        next(err);
      });
  });

router.route('/usertabs')

  .get((req, res) => {
   db.Tab
   .find(req.query)
   .then(data=>res.json(data))
   .catch(err=>res.status(422).json(err));
  })

  .post((req, res) => {
    console.log(req.session.passport);
    console.log(req.body);
    db.Tab
    .create(req.body)
    .then(data=>{
      console.log(data);
      // db.User
      // .update({_id:req}),{
      //   $push:{
      //     tabs:data._id
      //   }
      // }
    })
    .then(data2=>console.log(data2))
    .catch(err=>console.log(err));

  })

  .delete((req, res) => {
     db.Tab
      .remove({ _id: req.body.tabId })
      .then(data => db.User.update({_id:req.body.userid},{
        $pull:{
          tabs:req.body.tabId
        }
      }))
      .catch(err=>console.log(err));
  });


module.exports = router;