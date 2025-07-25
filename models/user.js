const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type:String,
        default: "/images/default.png",
    },
    role: {
        type: String,
        enum: ["user", "domain"],
        default: "user",
    }
})

const User = mongoose.model("user",userSchema);

module.exports = User;