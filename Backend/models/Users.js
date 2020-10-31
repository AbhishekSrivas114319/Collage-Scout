var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 6,
  },
  number: {
    type: String,
    require: false,
    max: 10,
    min: 10,
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  isverified: {
    type: String,
    require: true,
  },
  shopName: {
    type: String,
    require: false,
    min: 3,
  },
  collage: {
    type: String,
    require: false,
  },
  shopItem: [
    {
      name: {
        type: String,
      },
      imgUrl: {
        type: String,
      },
      itemsAvailable: {
        type: Number,
      },
      isveg: {
        type: String,
      },
      priceArray: [
        {
          size: {
            type: String,
          },
          price: {
            type: Number,
          },
        },
      ],
      category: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("shopkeepers", userSchema); //stored in users collection  and uses user schema
