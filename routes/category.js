const router = require("express").Router();
const Category = require("../model/Category");
const { categoryValidation } = require("../validation");
const verify = require("./verifyToken");

router.post("/", verify, async (req, res) => {
  const { error } = categoryValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = new Category({
    name: req.body.name
  });
  try {
    const savedCategory = await category.save();
    res.send(savedCategory);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/", verify, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const allCategories = await Category.find({});
      res.send(allCategories);
    } else {
      res.status(400).send(err);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
// router.get("/:id", verify, async (req, res) => {
//   try {
//     const postDetails = await Post.findById(req.params.id);
//     res.send(postDetails);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });
// router.get("/:id", verify, async (req, res) => {
//   try {
//     const postDetails = await Post.findById(req.params.id);
//     res.send(postDetails);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

module.exports = router;
