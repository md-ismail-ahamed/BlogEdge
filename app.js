const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const {connectToMongoDB} = require("./connection");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { checkAuthenticationCookie } = require("./middlewares/auth");
const Blog = require("./models/blog");
const app = express();
const port = process.env.PORT || 3004;

//connction for MongoDB
connectToMongoDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkAuthenticationCookie("token"));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views","./views");
app.get("/", async (req,res) => {
    //this is for getting all the blogs from the database
    const allBlogs = await Blog.find({});

    //this is for rendering the user and blogs in the home page
    return res.render("home",{
        user: req.user,
        blogs: allBlogs,
    });
});

//routes 

app.use("/user", userRoute);
app.use("/blog", blogRoute);

//listener
app.listen(port, () => {
    console.log("Server is Running at 3004");
});
 