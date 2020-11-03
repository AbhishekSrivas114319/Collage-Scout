//Schemas
const Users = require("../models/shops");
const collageSchema = require("../models/collages");
const categorySchema = require("../models/categories");

/*------------------------------Shop Section-------------------------------------------*/
exports.shopInfo = (req, res, next) => {
  const name = req.body.name;
  const shopName = req.body.Shopname;
  const college = req.body.college;
  const email = req.User.email;
  const inCollege = req.body.inCollege;

  Users.findOne({ email: email }).then((User) => {
    User.shopName = shopName;
    User.college = college;
    User.name = name;
    User.inCollege = inCollege;
    User.save().then((Result) => {
      res.json("User Saved");
    });
  });
};

exports.addItem = (req, res, next) => {
  const itemName = req.body.itemName;
  const imgUrl = req.file.filename;
  const isveg = req.body.isveg;
  const category = req.body.category;
  const email = req.User.email;
  const priceArray = req.body.price; // Object required {price:"60",size:"Half"} in this syntax
  console.log(priceArray, email);

  Users.findOne({ email: email })
    .then((shopSchema) => {
      shopSchema.shopItem.push({
        name: itemName,
        imgUrl: imgUrl,
        isveg: isveg,
        category: category,
        priceArray: priceArray,
      });
      shopSchema.save().then((result) => {
        res.json(result);
      });
    })
    .catch((err) => {
      res.status(500).json("Not saved");
    });
};

exports.getCollege = async (req, res, next) => {
  const colleges = await collageSchema.find();
  res.json(colleges);
};

exports.getCategory = async (req, res, next) => {
  const category = await categorySchema.find();
  res.json(category);
};

exports.shopOrders = async (req, res, next) => {
  //For ShopOwner to check Orders
  const shopId = req.body.shopId;

  const myOrders = await orderSchema.find({ shopId: shopId });

  res.json({ message: "All the Order List", orders: myOrders });
};

exports.verifyOrder = async (req, res, next) => {
  const orderId = req.body.orderId;

  const verifyOrder = await orderSchema.findById(orderId);

  verifyOrder.isaccepted = true;

  const verifiedOrder = await verifyOrder.save();

  res.json({ message: "Order Accepted", result: verifiedOrder });
};
