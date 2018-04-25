const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
const mustBeLoggedIn = require('../shared/middleware/mustBeLoggedIn');

function getCurrentUser(req, res) {
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
    if(!req.user) {
      return res.status(401).json({
        message: 'Invalid username or password.'
      });
    }

    getCurrentUser(req, res);
  })

  .delete((req, res) => {
    req.logout();
    req.session.destroy();
    res.json({
      message: 'You have been logged out.'
    });
  })

router.route('/users')

  .post((req, res) => {
    db.User.create(req.body)
      .then(user => {
        const { id, username } = user;
        res.json({
          id, username
        });
      })
      .catch(err => {
        console.log("caught an error");
        res.json(err);
      });
  })

router.route('/usertabs')

  .get((req, res) => {
   db.User
   .findOne({_id:req.session.passport.user}).populate("tabs")
   .then(data=>res.json(data))
   .catch(err=>res.status(422).json(err));
  })

  .post((req, res) => {
    db.Tab
    .create(req.body)
    .then(data=>{
      db.User.update({_id:req.session.passport.user},{
        $push:{
          tabs:data._id
        }
      }).catch(err=>console.log(err));
    
      res.json(data);
    }).catch(err=>console.log(err));

  })

  router.route('/onetab/:tabId')

    .get((req, res) => {
      console.log(req.params);
     db.Tab
     .findOne({_id:req.params.tabId})
     .then(data=>res.json(data))
     .catch(err=>res.status(422).json(err));
    })

    .put((req, res) => {
      db.Tab.update({_id: req.params.tabId}, {
        $set: req.body
      }).then(data=>res.json(data)).catch(err=>res.json(err));
    })

    .delete((req, res) => {
      db.Tab
      .remove({ _id: req.params.tabId })
      .then(data => { 
        db.User.update({_id:req.session.passport.user},{
          $pull:{
            tabs:req.params.tabId
          }
        }).then(tab=>res.json(tab)).catch(err=>res.json(err));
      }).catch(err=>res.json(err));
    })




module.exports = router;