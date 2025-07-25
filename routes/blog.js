const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../utils/cloudinary'); // cloudinary storage
const upload = multer({ storage }); // use cloudinary storage

const Blog = require("../models/blog");
const Comment = require("../models/comment");

// Route to render blog creation form
router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

// Route to show a blog and its comments
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");

  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

// Route to handle blog submission with cloudinary image upload
router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;

  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: req.file.path, // Cloudinary gives a URL
  });

  return res.redirect(`/blog/${blog._id}`);
});

// Route to handle comment submission
router.post("/comment/:id", async (req, res) => {
  const { content } = req.body;
  const blogId = req.params.id;

  await Comment.create({
    content,
    blogId,
    createdBy: req.user._id,
  });

  return res.redirect(`/blog/${blogId}`);
});

module.exports = router;
