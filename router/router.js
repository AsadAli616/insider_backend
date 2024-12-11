const express = require('express')
const {getUser,creatUser, login, verify} = require('../controller/user_api')
const {getproduct,UpdateProduct,getProductById,DeletedProduct,creatProduct} = require("../controller/productapi")
const {placeOrder,getOrder} = require("../controller/order")
const router = express.Router()
var jwt = require('jsonwebtoken');
const { auth, ver } = require('../middleware/auth');
//user api
router.post("/create",creatUser)
router.post("/getuser",login)








// middle ware
router.post("/verify",ver,verify)



// product
router.get("/allproduct",getproduct)
router.get("/allproduct/:id",getProductById)




router.get("/all",auth, getUser)
router.delete("/delete",auth,DeletedProduct)
router.post("/creatProduct",auth,creatProduct)
router.put("/Update/:id",auth,UpdateProduct)









router.post("/fall",ver,placeOrder)

router.get("/order",auth,getOrder)











module.exports = router