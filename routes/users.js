const express = require('express');
const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/users_controller');
console.log('Router file working');
router.get('/profile', passport.checkAuthentication,userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create', userController.create); 

// usemiddleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),userController.createSession);
// sign out
router.get('/sign-out', userController.destroySession);

module.exports=router; 