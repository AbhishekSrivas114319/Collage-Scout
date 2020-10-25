const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const { validationResult } = require("express-validator");
const otpGenerator = require('otp-generator')
const emailSender = require('../utils/mailsender')
// const { authSchema } = require('../helpers/validation_Schema');
// const { signAccessToken } = require('../helpers/jwt_helper'); 



exports.signup =  (req,res,next) =>{
    
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      const error = new Error('Validation Failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    // const { error } = authSchema.validate({
    //     email,password,name
    // })
    // if(error){
    //     next(error) ;
    // }
    
    // User.findOne({email:email}).then(result =>{
    //     // const error = new Error("Email Alreasdy Registered")
    //     // error.status = 422;
    //     // next(error);
    //     res.json({message:"email already exist",result:result})
    // }).catch(err => {
    //     console.log("2")
    //     next(err);
    // })
    console.log("1")
    bcrypt.hash(password, 12).then((hashedPass) => {
       
        const user = new User({
            isverified: "false",
            email: email,
            name: name,
            password: hashedPass,
        });

        // const savedUser =  user.save() //saved user saved here 
        // const accessToken =   signAccessToken(savedUser._id)
        // console.log(accessToken)
        // res.send(accessToken)

        user.save().then( result =>{
            console.log("User Saved");
            //  res.status(200).json({message:"User Saved",result:result})
        }).catch(err => {
            res.status(400).json({message:"User Not Saved",error:err});
        });

        const OTP = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
        
        res.send("OTP SEND CHECK YOUR EMAIL");
        return emailSender.sendemail(email,OTP);
        
        
    }).catch(err =>{
        console.log("here")
        next(err);
    })
};

exports.login = (req,res,next) =>{
    console.log("here at Login")
}