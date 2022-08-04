const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
const router = express.Router();


//GET USERS

router.post('/login',
    passport.authenticate('local', {session: false}),
    async(req,res,next)=>{

      try{
        const user = req.user;

        const jwtConfig = {
          expiresIn: 60 * 60,
        };

        const payload = {
          sub : user.id,
          role: user.role
        }

        const token = jwt.sign(payload, config.JWT_SECRET, jwtConfig);

        res.status(200).json({
          user,
          token
        });

      }
      catch(error){
        next(error);
      }
    }
);

router.get('/', (req,res)=>{
    res.status(200).json({
      msg:'Router Get'
    })
  }
);

module.exports = router;
