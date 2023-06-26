// // const http=require('http');

// // http.createServer(function(request,response){
// //     console.log(request);

// //     response.writeHead(200,{'Content-type':'text/plain'});
// //     response.end("hello World");
// // }).listen(3000);

// const express=require('express');
// const app=express();
// const BlogList=require('./blog_module/blog')
// const PORT=3001;
// const bcrypt=require('bcrypt');
// const plainPassword='#@weareyou';
// const saltRounds =10;
// const logger=(request,response,next)=>{
//     console.log("logging ",request.url);
//     next();
// }
// const sendResponse=(request,response,next)=>{
//     console.log("Sending response");
//     response.sendStatus(200);
// }

// app.use(logger);
// app.get("/",(request,response)=>{
//     response.send("HELLO WORLD Arvind");
   
// })
// app.get('/register',(request,response)=>{
//     // bcrypt.genSalt(saltRounds, function(error,salt){
//     //     if(error){
//     //         response.send(401);
//     //     }
//     //     else{
//     //        bcrypt.hash(plainPassword,salt,(error,hashPassword)=>{
//     //         if(error)
//     //         {
//     //            response.send(401);
//     //         }
//     //         else{
//     //             response.send(hashPassword)
//     //         }
//     //        })
//     //     }
//     // })
//    bcrypt.hash(plainPassword,saltRounds,(error,hashPassword)=>{
//     if(error){
//         response.send(401);
//     }
//     else{
//         response.send(hashPassword);
//     }
//    })
// })
// app.get("/list",sendResponse,(request,response)=>{
//     response.send(BlogList.blogList());
// })
// app.listen(PORT,()=>{
//     console.log("server is running very fast");
// });

const mongoose=require('mongoose');
const url="mongodb://127.0.0.1:27017/DonorList";
let cors = require("cors");


mongoose.connect(url,(err,connection)=>{
    if(err)
    console.log(err);
    else
    console.log("connection is successful");
});


const express=require('express')
const PORT=3001;
// const Login_main_container =require('E:/Blood Relation/my-app/src/login-main-container.js');
const app=express();
const BlogList=require('./blog_module/blog');
const donorlistSchema=mongoose.Schema({
    name:String,
    contact:Number,
    email:String,
    city:String,
    state:String,
    bloodGroup:String,
    password:String,
})
const donor=mongoose.model("donorName",donorlistSchema);

app.use(cors());
app.listen(PORT,()=>{
    console.log("server is running");
})
app.get('/home',(req,res)=>{
    donor.find({ bloodGroup :req.query.bloodGroup,city:req.query.city},(err,result)=>{
            if(err) console.log(err);
            else console.log(result);
            result.forEach((document)=>
            console.log(document.name));
        })
    console.log(req.query);
   
})
app.get('/register',(req,res)=>{
    const donor1=new donor({
            name:req.query.name,
            contact:req.query.contact,
            email:req.query.email,
            city:req.query.city,
            state:req.query.state,
            bloodGroup:req.query.bloodGroup,
            password:req.query.password
        })
        donor1.save((err,result)=>{
            if(err)
            console.log(err)
            else console.log(result)
        });
        
    console.log(req.query);
   
})
// // const donor1=new donor({
// //     name:"Arvind",
// //     contact:6269310566,
// //     email:"malviyyarvind232323@mail.com",
// //     city:"Indore",
// //     state:"MadhyaPradesh",
// //     bloodGroup:"B+",
// //     password:"Arvind"
// // })
// // const donor2=new donor({
// //     name:"Akarshit",
// //     contact:6269310567,
// //     email:"akarshit@mail.com",
// //     city:"Indore",
// //     state:"MadhyaPradesh",
// //     bloodGroup:"A+",
// //     password:"Akarshit"
// // })
// // const donor3=new donor({
// //     name:"deepak",
// //     contact:6269310568,
// //     email:"deepak@mail.com",
// //     city:"Indore",
// //     state:"MadhyaPradesh",
// //     bloodGroup:"AB+",
// //     password:"Deepak"
// // })

// // donor1.save((err,result)=>{
// //     if(err)
// //     console.log(err);
// //     else 
// //     console.log(result);
// // });

// // donor.insertMany([donor1,donor2,donor3],(err,result)=>{
// //     if(err)
// //     console.log(err);
// //     else 
// //     console.log(result);
// // });
// donor.find({ bloodGroup :"A+"},(err,result)=>{
//     if(err) console.log(err);
//     else console.log(result);
//     result.forEach((document)=>
//     console.log(document.name));
// })


