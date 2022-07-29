const express = require('express');
const passport = require('passport');
const router = express.Router();

//GET USERS

router.post('/login',
    passport.authenticate('local',{session: false}),
    async(req,res,next)=>{
      try{
        res.status(200).json(req.user);
      }catch(error){
        next(error);
      }
    }
);

module.exports = router;
