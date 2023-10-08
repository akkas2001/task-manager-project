const mongoose = require("mongoose");

const OTPSchema = mongooe.Schema(
    {
        email: { type: String},
        otp: { type: String},
        status: { type: Number,default: Date.now()},
        createDate: { type: Date, default: Date.now()},
    },
    {versionKey: false}
);
const OTPModel = mongoose.model("otps", OTPSchema);
module.exports = OTPModel;