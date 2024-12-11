const db = require("../config/db")
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config()
var jwt = require('jsonwebtoken');

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com" ,
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user:process.env.USER_EMAIL,
      pass:process.env.ACC_PASS,
    },
  });




const getUser = async (req,res) =>{
try{
    const data =await db.query("SELECT * FROM e_comerce.user")
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
const creatUser = async (req,res) =>{
    try{
        const {name,email,pasword1,dob,Address} = req.body
        
        const saltRounds = 10;
    // const user = await db.query("SELECT email FROM e_comerce.user WHERE email=?",[email])
    //     if(user){
    //         res.status(401).send({
    //             message:"already exist",
    //             data1 : user
    //         })
    //     }
    //     else{
    // }
            const twofactor = Math.round(Math.random()*100000) 
        const info = await transporter.sendMail({
                from:process.env.USER_EMAIL, // sender address
                to: process.env.RECIVER_EMAIL, // list of receivers
                subject: "MAil from asad", // Subject line
                text: "", // plain text body
                html: `
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verification Code</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f9f9f9;
                        margin: 0;
                        padding: 0;
                        color: #333;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .email-header {
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 20px;
                        color: #555;
                    }
                    .verification-code {
                        font-size: 24px;
                        font-weight: bold;
                        color: #4CAF50;
                        margin: 20px 0;
                        text-align: center;
                    }
                    .email-footer {
                        font-size: 14px;
                        color: #888;
                        margin-top: 30px;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="email-header">Your Verification Code</div>
                    <p>Dear <strong>${name}</strong>,</p>
                    <p>Thank you for using <strong>ecomerce</strong>. To complete your verification, please use the code below:</p>
                    <div class="verification-code">${twofactor}</div>
                    <p>For your security, please do not share this code with anyone.</p>
                    <p>If you did not request this code, please ignore this email or contact our support team immediately at <strong>[Support Email/Phone]</strong>.</p>
                    <div class="email-footer">
                        Thank you,<br>
                        <strong>asad</strong><br>
                        ecomerce<br>
                        ma nahi btao ga
                    </div>
                </div>
            </body>
            `,
            
                });

 const pasword = await bcrypt.hash(pasword1,saltRounds)
    console.log(pasword)
         const data = await db.query("INSERT INTO e_comerce.user (name,email,pasword,dob,Address,two_factor) VALUES (?,?,?,?,?,?) ",[name,email,pasword,dob,Address,twofactor])
            
         
         
         const token = jwt.sign({ name1:name ,id: data[0].insertId,email1:email}, process.env.JWT_ID);

         console.log(token)
         res.status(200).send({
                message:"good hogia",
                tkn : token
            })
        
        // console.log(ran)
 }
    catch(error){
    
    res.status(404).send({
            message:"not good",
            data1 : error
        })
    }
       
    }
  const login = async (req,res) =>{
        try{
            const {email,pasword1} = req.body
            const pasword2 = await db.query("SELECT pasword  FROM e_comerce.user WHERE email=? ",[email])
            const  pasword  = pasword2[0][0].pasword
            bcrypt.compare(pasword1, pasword, async function(err, result) {
            if(result){
            const data = await db.query("SELECT * FROM e_comerce.user WHERE email=? AND pasword=? ",[email,pasword])
                 
            
            const {id_user,name,verify,role } = data[0][0]
            const token = jwt.sign({ role1:role ,id:id_user,email1:email }, process.env.JWT_ID);

            res.status(200).send({
                    message:"good hogia",
                    data1:data[0][0],
                    token:token 
                })
            }
            
               else{
                res.status(400).send({
                    message:"bad hogia",
                    data1 : err
                })     
               }
           
            });
            
            // res.status(200).send({
            //     message:"goood"
            // })
            
          
        }
        catch(error){
        
        res.status(404).send({
                message:"not good",
                data1 : error
            })
        }
           
        }

const verify = async (req,res) =>{
    try{
        const {token} = req.headers
        const {code} = req.body
        var {id} =  jwt.verify(token,process.env.JWT_ID);
       const twofactor1 = await db.query("SELECT two_factor FROM e_comerce.user WHERE id_user=? ",[id])
        const dbcode = twofactor1[0][0].two_factor
        if(!code){
            res.status(404).send({
                message : "ples enter code"
               })  
        }
if(code!=dbcode){
    res.status(404).send({
        message : "wrong code"
       })  
}



const verfYCode= true
const verify = await db.query("UPDATE\ e_comerce.user SET verify=? WHERE id_user=?",[verfYCode,id] )

        res.status(200).send({
            verify1:  "done"
        })  
    }
    
    catch(err){

    }
    
    } 









module.exports = {getUser,creatUser,login,verify}