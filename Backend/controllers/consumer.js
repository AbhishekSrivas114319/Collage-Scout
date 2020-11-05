const shopSchema = require("../models/shops");
const orderSchema = require("../models/orders");

/*------------------------------Consumer Section-------------------------------------------*/
exports.getShop = async (req, res, next) => {
  const collegeName = req.body.collegeName;
  console.log(collegeName);
  const shops = await shopSchema.find({ college: collegeName });
  // if(shops.isEmpty()){
  //     res.json("No Shops of your Collage are registered")
  // }
  res.json(shops);
};

exports.placeOrder = async (req, res, next) => {
  const shopId = req.body.shopId;
  const consumerId = req.body.consumerId;
  const itemId = req.body.itemId;
  const itemName = req.body.itemName;
  const price = req.body.price;

  const order = new orderSchema({
    shopId: shopId,
    consumerId: consumerId,
    itemName: itemName,
    itemId: itemId,
    price: price,
  });
  console.log(order);
  // const savedOrder = await order.save();

  // res.json({ message: "Order Placed", result: savedOrder });

  order
    .save()
    .then((result) => {
      console.log("1");
      res.json({ message: "Order Placed", result: result });
    })
    .catch((err) => {
      console.log("2");
      res.status(500).json("Internal Server Error");
    });
};

exports.consumerOrder = async (req, res, next) => {
  //For User to check Orders
  const consumerId = req.body.userId;

  const myOrders = await orderSchema.find({ consumerId: consumerId });

  res.json({ message: "All the Order List", orders: myOrders });
};
