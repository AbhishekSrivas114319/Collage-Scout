const router = require('express').Router();
const authController = require('../controllers/auth')
const User = require('../models/Users')
const { body } =  require('express-validator');

router.post('/signup',[
    body('email')
   .isEmail()
   .withMessage('Please Enter a Valid Email') //Stored in error object which can be retrived.
   .custom((value) => { //to check whether the email adress already exist or not. 
    return User.findOne({email: value}).then(UserDoc => {
        console.log("userdoc = " + UserDoc );
        if(UserDoc){ // return a promise if validation done a async task
            return Promise.reject('E-mail Already already Exist');
        }
    })
}).normalizeEmail(), // check for  .. or + - in the email and remove it

    body('password')
        .trim()
        .isLength({min:8}),
    
    // body('name')
    //     .isEmpty()
    //     .isLength({min:6}) 
],authController.signup)

router.post('/login',authController.login)

module.exports = router;