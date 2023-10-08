const JWT = require("jsonwebtoken");

const userModel = require("../models/userModel");
const OTPModel = require("../models/OTPModel");
const sendEmailUtillity = require("../utility/sendEmailUtility");


/////registration
exports.registration = (req, res) => {
    let reqBody = req.body;
    userModel.create(reqBody, (err, data) => {
        if(err) {
            res.status(200).json({ status:"fail", data: err});
        }else{
            res.status(200).json({ status:"success", data: data});
        }
    })
};

////login

exports.login = (req, res) => {
    let reqBody = req.body;

    userModel.aggregate(
        [
            {$match: reqBody},
            {
                $project: {
                    _id:1,
                    email:1,
                    firstName:1,
                    lastName:1,
                    mobile:1,
                    photo:1
                }
            } 
        ]
    );
};

////profile update

exports,profileUpdate = (req, res) => {
    let email = req.eaders["email"];
    let reqBody = req.body;

    userModel.updateOne({ email:email}, reqBody, (error, data) => {
        if(error){
            req.status(400).json({
                status: "fail",
                data:error
            });
        }
        else{
            res.status(200).json({
                status: "success",
                data:data
            })
        }
    });    
};

///profile details for update profile

exports.updateProfileDetails = (req, res) => {
    let email = req.headers["email"];
    userModel.aggregate(
        [
            {$match: {email:email}},
            {
                $project: {
                    _id:1,
                    email:1,
                    firstName:1,
                    lastName:1,
                    mobile:1,
                    photo:1,
                    password:1
                },
            },
        ],
        (error, data) => {
            if(error){
                res.status(400).json({
                    status:"fail",
                    data:"error"
                })
            }
            else{
                res.status(200).json({
                    status:"success",
                    data:data
                });
            }
        }
    );
};

////recovery Email Account

exports.recoveryEmail = async (req, res) => {
    let emal = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);

    try{
        //email account query
        let UserAccount = await  userModel.aggregate([
            {$match: {email:email}},
            {$count:"total"},
        ]);
        
        if(UserAccount.length > 0) {
            ///create OTP
            let CreateOTP = await OTPModel.create({
                email: email,
                otp: OTPCode,
            });
            //send email
            let sendEmail = await sendEmailUtility(
                email,
                "your PIN code is =" + OTPCode,
                "Task manager PIN verification"
            );
            res.status(200).json({
                status:"fail",
                data:sendEmail,
            });
        }
        else{
            res.status(200).json({
                status:"success",
                data:"email not found",
            });
        }
    }
    catch(e){
        res.status(200).json({
            status:"fail",
            data:e
        });
    }
};

////recoveryVerifyOTP 

exports.recoverVerifyOTP = async (req, res) => {
    let eamil = req.params.email;
    let OTPCode = req.params.otp;
    let status = 0;
    let update = 1;
    try{
       let OTPCount = await OTPModel.aggregate([
           { $match: { email: email} },
           { $count:"total"},
       ]);
       if(OTPCount.length > 0) {
            let OPTUpdate = await OTPModel.updateOne(
                {
                    email:email,
                    otp:OTPCode,
                    status:update,
                }
            );
            res.status(200).json({
                status: "success",
                data :OPTUpdate
            });
        }
        else {
            res.status(200).json({
                status:"fail",
                data:"Invalid OTP",
            });
        }
    }catch(e){
        res.status(200).json({
            status:"fail",
            data:e
        });
    }
};

////recoveryResetPassword

exports.recoverResetPassword = async (req, res) =>{
    let email = req.body["email"];
    let OTPCode = req.body["OTP"];
    let newPassword = req.body["password"];
    let statusUpdate = 1;

    try{
        let OTPCount = await OTPModel.aggregate([
        { $match: { email:email, otp: OTPCode, status: statusUpdate}},
        { $count: "total"},
        ]);
        if(OTPCount.length > 0){
            let passUpdate = await userModel.updateOne(
                {email:email },
                {password:newPassword },
            )
            res.status(200).json({
                status:"success",
                data:passUpdate,
            });
        }
        else{
            res.status(200).json({
                status:"fail",
                data:"Something is worng",
            })
        }
    }catch(e){
        res.status(200).json({
            status:"fali",
            data:e,
        });
    }
};













