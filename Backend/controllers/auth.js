//Schemas
const User = require('../models/Users')
const Otp = require('../models/otp') 
//
const bcrypt = require('bcryptjs')
const { validationResult } = require("express-validator");
const otpGenerator = require('otp-generator')
const emailSender = require('../utils/mailsender');
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();
// const { authSchema } = require('../helpers/validation_Schema');
 const { signAccessToken } = require('../helpers/jwt_helper'); 



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
        
        const otp = new Otp({
            otp:OTP,
            email:email
        })

        otp.save().then(result=>{
            console.log("Otp saved in database")
        }).catch(err => {
            res.json("Otp not Saved in database")
        })

        res.send("OTP SEND CHECK YOUR EMAIL");
        return emailSender.sendemail(email,OTP);
        
        
    }).catch(err =>{
        console.log("here")
        next(err);
    })
};

exports.checkOTP = (req,res,next) =>{
    console.log("here at OTP check")
    const email = req.body.email;
    const checkOtp = req.body.otp;
    console.log("1"+ email + checkOtp)
    Otp.findOne({email:email}).then(otpResult =>{
        console.log("2")
        if(otpResult.otp === checkOtp){
            console.log("3")
            User.findOne({email:email}).then(user => {

                user.isverified = "True";

                // const signAccessToken = signAccessToken(user.email,user._id.toString()); 
                const signAccessToken  = JWT.sign(
                    {
                      email: user.email,
                      userId:user._id.toString()
                    },
                    process.env.ACCESS_TOKEN_KEY,
                    { expiresIn:'1h' } 
                  );
    
                  const verifyAccessToken  = JWT.sign(
                    {
                      email: user.email,
                      userId:user._id.toString()
                    },
                    process.env.REFRESH_TOKEN_KEY,
                    { expiresIn:'1y' } 
                  );
    
                res.json({message:"Otp Verified",signAccessToken,verifyAccessToken})
            }).catch(err => {
                res.json({message:"Provide a registered Email"})
            })
            
        }else{
            res.json("otp Entered is incorrect")
        }
    }).catch(err => {
        res.json("Otp expire, Please resend the email")
    })
}

exports.refreshToken = (req,res,next) =>{
    const refreshToken = req.body.refreshToken

    const payload = JWT.verify(refreshToken,process.env.REFRESH_TOKEN_KEY)

    const signAccessToken  = JWT.sign(
        {
          email:payload.email,
          userId:payload.userId
        },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn:'1h' } 
      );

      const verifyAccessToken  = JWT.sign(
        {
            email:payload.email,
            userId:payload.userId
        },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn:'1y' } 
      );

      res.json( {signAccessToken,verifyAccessToken} )
    
}
exports.login = (req,res,next) =>{
    console.log("here at Login")
    const errors = validationResult(req); 
    if(errors){
      const error = new Error('Validation Failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const email = req.body.name;
    const password = req.body.password
}