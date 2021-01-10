const shopSchema = require("../models/shops");
const orderSchema = require("../models/orders");
const { json } = require("body-parser");

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
  const rating = req.body.rating;
  const imgUrl = req.body.imgUrl;
  const date = req.body.date;

  const order = new orderSchema({
    shopId: shopId,
    consumerId: consumerId,
    itemName: itemName,
    itemId: itemId,
    price: price,
    rating:rating,
    imgUrl:imgUrl,
    orderDate:date
  });
  console.log(order);
  // const savedOrder = await order.save();

  // res.json({ message: "Order Placed", result: savedOrder });

  order
    .save()
    .then((result) => {
      res.json({ message: "Order Placed", result: result });
    })
    .catch((err) => {
      res.status(500).json("Internal Server Error");
    });
};

exports.consumerOrder = async (req, res, next) => {
  //For User to check Orders
  const consumerId = req.body.userId;

  const myOrders = await orderSchema.find({ consumerId: consumerId });

  res.json({ message: "All the Order List", orders: myOrders });
};

exports.rating = async (req, res, next) => {
  const { rating, userId, itemId, shopId } = req.body;

  try {
    const updatedRating = await shopSchema.findOne({ _id: shopId });

    updatedRating.shopItem.forEach((element) => {
      console.log(element._id);
      if (element._id == itemId) {
        element.ratingArray.push({ rating: rating, consumerId: userId });
        res.json({ message: "Thank You for your Rating", element: element });
      }
    });
  } catch (err) {
    res.json(err);
  }
};
