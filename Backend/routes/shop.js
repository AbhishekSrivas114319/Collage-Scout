const router = require("express").Router();
const isAuth = require("../middleware/isAuth");
const multer = require('multer');
const shopController = require('../controllers/shop')


const imageStorage = multer.diskStorage({ //for multer storage
    //these are two functions which are called by multer for incoming file
    destination: (req, file, cb)=> {
        cb(null,'item-Images'); // null tells the call backs that its ok to store the file because that place is for error
    },
    filename:(req, file, cb)=> {
        cb(null,new Date().toDateString() + "-" + file.originalname);
    }
});

const imageFilter = (req, file, cb) => { //For filtering the type of file
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true);  //if we want to store that file
    }
    else{
        cb(null,false); //if we dont want to store that file
        console.log("wrong file type");
    }
};

const imageMulter = multer({storage:imageStorage,fileFilter:imageFilter}).single('imageurl');

router.post('/shopInfo',isAuth,shopController.shopInfo)

router.post('/shop/addItem',isAuth,imageMulter,shopController.addItem)



module.exports = router;