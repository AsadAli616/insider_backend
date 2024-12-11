const db = require("../config/db")
        const getproduct = async (req,res) =>{
    try{


        const page = req.query.page
        const limit = req.query.limit

        const startindex = (page-1)*limit
        const endIndex = page*limit


        const data = await db.query("SELECT * FROM e_comerce.product")
       
       const data1 = data[0]
        const data2 =data1.slice(startindex,endIndex) 
       
        res.status(200).send({
            message:"good hogia",
            data1 : data2
        })

    }
    catch(error){
    
    res.status(404).send({
            message:"not good",
            data1 : error
        })
    }
       
    }


        const getProductById = async (req,res) =>{


    try{
            const {id} = req.params 
            const data = await db.query("SELECT * FROM e_comerce.product WHERE id_product=? ",[id])
            res.status(200).send({
                message:"good hogia",
                data1 : data[0]
            })
        }
        catch(error){
        
        res.status(404).send({
                message:"not good",
                data1 : error
            })
        }
           
        }



        const DeletedProduct = async (req,res) =>{
            

        try{
                    const {id} = req.body 
                    const data = await db.query("DELETE  FROM e_comerce.product WHERE id_product=? ",[id])
                    res.status(200).send({
                        message:"good delete",
                        data1 : ""
                    })
                }
                catch(error){
                
                res.status(404).send({
                        message:"not good",
                        data1 : error
                    })
                }
                   
                }


        const creatProduct = async (req , res ) =>{
          try{
            const {name,productdetail,price,stock,categorie,productimg } = req.body  
            const data = await db.query("INSERT INTO e_comerce.product (product_name , product_detail , product_price , product_stock , product_categories,product_img) VALUES (?,?,?,?,?,?) ",[name,productdetail,price,stock,categorie,productimg])

            res.status(200).send({message:"done",data1:data[0]})}
          catch(error){
            res.status(404).send({
                message:"not good",
                data1 : error
            })
          }
        }
        const UpdateProduct = async (req, res)=>{
    try{
        const {id}= req.params
        const {name,productdetail,price,stock,categorie,productimg } = req.body  
        const data = await db.query("UPDATE e_comerce.product SET product_name=? , product_detail=? , product_price=? , product_stock=? , product_categories=?,product_img=? WHERE id_product=? ",[name,productdetail,price,stock,categorie,productimg,id])

        res.status(200).send({message:"done",data1:data[0]})}
      catch(error){
        res.status(404).send({
            message:"not good",
            data1 : error
        })
      }
}
        


    module.exports = {getproduct , getProductById,DeletedProduct,creatProduct,UpdateProduct}