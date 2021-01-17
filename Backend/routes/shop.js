const router = require("express").Router();
const isAuth = require("../middleware/isAuth");
// const multer = require('multer');
const shopController = require("../controllers/shop");

// const imageStorage = multer.diskStorage({ //for multer storage
//     //these are two functions which are called by multer for incoming file
//     destination: (req, file, cb)=> {
//         cb(null,'FoodItem-Images'); // null tells the call backs that its ok to store the file because that place is for error
//     },
//     filename:(req, file, cb)=> {
//         cb(null,new Date().toDateString() + "-" + file.originalname);
//     }
// });

// const imageFilter = (req, file, cb) => { //For filtering the type of file
//     if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
//         cb(null,true);  //if we want to store that file
//     }
//     else{
//         cb(null,false); //if we dont want to store that file
//         console.log("wrong file type");
//     }
// };

// const imageMulter = multer({storage:imageStorage,fileFilter:imageFilter}).single('image');

router.post("/shopInfo", isAuth, shopController.shopInfo);
router.post("/shop/addItem", isAuth, shopController.addItem);
router.post("/shop/getItem", shopController.getItem);
router.post("/shop/shopOrder", shopController.shopOrders);
router.post("/shop/verifyOrder", shopController.verifyOrder);
router.post("/todaysTop", shopController.todaysTop);
router.post("/shop/orderStatus",shopController.orderStatus);

router.get("/getCollage", shopController.getCollege);
router.get("/getCategory", shopController.getCategory);
router.get("/weeklyStat", shopController.weeklyStat);

router.get("/shopDeatils/:email",shopController.shopDeatils);
router.post("/shop/timing",shopController.shopTiming);

router.post("/shopitem/availability",shopController.availability);

module.exports = router;
