const router = require("express").Router();
const Order = require("../model/Order");
const Product = require("../model/Product");
const { orderValidation } = require("../validation");
const verify = require("./verifyToken");

router.post("/", verify, async (req, res) => {
  const { error } = orderValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const order = new Order({
    items: req.body.items,
    owner: req.user._id
  });
  try {
    const savedOrder = await order.save();
    // after saving the order, decrease the product quantity in the stocks
    savedOrder.items.forEach(async item => {
      const query = { _id: item.product };
      await Product.findOneAndUpdate(query, {
        $inc: { quantity: -item.quantity }
      });
    });
    res.send(savedOrder);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", verify, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const allOrders = await Order.find({})
        .populate("items.product", ["name", "image", "price"])
        .exec();
      res.send(allOrders);
    } else {
      const allOrders = await Order.find({ owner: req.user._id })
        .populate("items.product")
        .exec();
      res.send(allOrders);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update status
router.patch("/:id", verify, async (req, res) => {
  try {
    await Order.findByIdAndUpdate(
      {
        _id: req.params.id
      },
      {
        $set: { status: req.body.status }
      },
      {
        returnNewDocument: true
      },
      function(err, result) {
        if (result) {
          res.send(result);
        } else {
          res.status(400).send(err);
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id", verify, async (req, res) => {
  try {
    const orderDetails = await Order.findById(req.params.id);
    res.send(orderDetails);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
