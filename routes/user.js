const express =require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const {createTokenUser} = require("../services/auth");
const saltRounds = 10;


router.get("/signin" , (req,res) => {
    return res.render("signin",{message: null});
});

router.get("/signup" , (req,res) => {
    return res.render("signup",{message: null});
});

router.post("/signup" , async (req,res) => {
    const {fullName, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
    });
    return res.redirect("/user/signin");
})
router.post("/signin", async (req,res) => {
    const {email, password} =req.body;
    const user = await User.findOne({
        email,
    });
    const hashedPassword = await bcrypt.hash(password,saltRounds);  
    if(!user) {
        return res.render("signup",{message : "User not Found"});
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid) {
        return res.render("signin",{message: "Invalid Password"});
    }
    const token = createTokenUser(user);
    res.cookie("token",token);
    return res.redirect("/");
});
router.get("/signout", (req,res) => {
    res.clearCookie("token");
    return res.redirect("/");
});

module.exports = router;