const db = require("../config/db")




const placeOrder = async (req , res) =>{


    try{
   const {coustumer_id} = req.body
   const product_arry = req.body.product_arry
// const product_arry = [1003,1004,1005]
console.log("aary=>",product_arry)
    const data = await db.query("INSERT INTO e_comerce.order (custumer_id) VALUES (?) ",[coustumer_id])
    const Order_id = data[0].insertId
    product_arry.map((data)=>db.query(
    "INSERT INTO e_comerce.orderdetail (productid, orderrid) VALUES (?, ?)",
    [data, Order_id]
))

    
res.status(200).send({
 message:"done"
})

} 
catch(error){
    res.status(404).send({
        message:error

    })
}




}


const getOrder = async (req , res ) =>{
  try{
   const data =await db.query(`
  SELECT orderid,name,productid,product_name,product_detail,product_price,product_stock,product_categories,product_img FROM e_comerce.order JOIN e_comerce.user ON 
    e_comerce.user.id_user =  e_comerce.order.custumer_id 
    JOIN e_comerce.orderdetail ON  e_comerce.order.orderid = e_comerce.orderdetail.orderrid 
    JOIN e_comerce.product ON e_comerce.product.id_product = e_comerce.orderdetail.productid
`)

// let order = [{}] 
const data1 = data[0]
// for(let i = 0 ; i<=data1.length-1; i++ ){
    
// }
// let order = [{}]
// data1.map(async (jol)=>  
    
// {
//      const gol = await db.query(`
//     SELECT 
//     FROM e_comerce.orderdetail 
//     JOIN e_comerce.product 
//     ON e_comerce.product.id_product = e_comerce.orderdetail.productid WHERE orderrid=?`,[jol.orderid])
// order.push(gol)
// console.log(gol)

// }  )
// return
 res.status(200).send({
    message:"done",
    data :data1
})
  } 
  catch(error){
    res.status(200).send({
        message:"done",
        data1:error
    })
  } 
}
module.exports = {placeOrder,getOrder}