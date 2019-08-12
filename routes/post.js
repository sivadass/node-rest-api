const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Post = require("../model/Post");
const { postValidation } = require("../validation");
const verify = require("./verifyToken");

router.post("/", verify, async (req, res) => {
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    owner: req.user._id
  });
  try {
    const savedPost = await post.save();
    res.send(savedPost);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/", verify, async (req, res) => {
  try {
    console.log("user ===>", req.user);
    if (req.user.role === "admin") {
      const allPosts = await Post.find({});
      res.send(allPosts);
    } else {
      const allPosts = await Post.find({ owner: req.user._id });
      res.send(allPosts);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/:id", verify, async (req, res) => {
  try {
    const postDetails = await Post.findById(req.params.id);
    res.send(postDetails);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/:id", verify, async (req, res) => {
  try {
    const postDetails = await Post.findById(req.params.id);
    res.send(postDetails);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
