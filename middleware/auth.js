var jwt = require('jsonwebtoken');
require('dotenv').config()



const auth = (req, res, next) => {
    const {token} = req.headers
    if(!token){
        res.status(404).send({
            messsage:"not admin"
        })
    }   
    
    const {id,role1,email1} = jwt.verify(token,process.env.JWT_ID);
        console.log(role1)
        if(role1=="admin"){
    
            next()
        }
        else{
            res.status(404).send({
                messsage:"not admin"
            })
        }
      }



const ver = ()=>{
    const {token} = req.headers
    if(!token){
        res.status(404).send({
            messsage:"not token"
        })
    }
    const {id,role1,email1} = jwt.verify(token,process.env.JWT_ID);

    if(!id){
        res.status(404).send({
            messsage:"not id"
        })
    }

}
 module.exports = {auth,ver}