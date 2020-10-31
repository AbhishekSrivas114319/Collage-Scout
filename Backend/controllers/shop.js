//Schemas
const Users = require("../models/shops");

exports.shopInfo = (req, res, next) => {
  const name = req.body.name;
  const shopName = req.body.Shopname;
  const collage = req.body.collage;
  const email = req.User.email;

  Users.findOne({ email: email }).then((User) => {
    User.shopName = shopName;
    User.collage = collage;
    User.name = name;
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
  console.log(priceArray,email)

  Users.findOne({ email: email }).then((shopSchema) => {
    shopSchema.shopItem.push({
      name: itemName,
      imgUrl: imgUrl,
      isveg: isveg,
      category: category,
      priceArray: priceArray,
    });
    shopSchema.save().then(result =>{
      res.json(result)
    });
  }).catch(err => {
    res.status(500).json("Not saved")
  })
};



