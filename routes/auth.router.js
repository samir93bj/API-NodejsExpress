const express = require('express');
const passport = require('passport');
const AuthService = require('./../services/auth.servece');

const router = express.Router();
const service = new AuthService();

//LOGIN
router.post('/login',
    passport.authenticate('local', {session: false}),
    async(req,res,next)=>{

      try{
        const user = req.user;

        //Al ser sincrono podemos resolverlo directamente en el res
        res.status(200).json(service.singToken(user));

      }
      catch(error){
        next(error);
      }
    }
);

//RESET PASSWORD
router.post('/recovery',
    async(req,res,next)=>{

      try{
        const { email } = req.body;
        const resp = await service.sendRecovery(email);

        res.status(200).json({
          resp
        });

      }
      catch(error){
        next(error);
      }
    }
);

//CHANGE PASSWORD
router.post('/change-password',
  //TODO:Verificar JWT
  //TODO:verificar new password schema
  async(req,res,next)=>{

      try{
        const { token, newPassword } = req.body;
        const resp = await service.changePassword( token, newPassword);

        res.status(200).json({
          resp
        });

      }
      catch(error){
        next(error);
      }
    }
);

module.exports = router;
