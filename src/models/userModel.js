const mongoose = require("mongoose");

const Dataschema = new mongoose.Schema(
    {
        email :{ type: String, required :true, index: true, unique: true},
        firstName :{ type : String},
        lastName :{ type : String},
        mobile :{ type : String},
        passwoed: { type: String},
        photo:{ type: String},
        createDate:{ type:Date, default: Date.now()},
    },
    {versionKey: false}
);

const userModel = mongoose.model("users", Dataschema);
module.exports = userModel;