const mongoose=require('mongoose');

const jwt=require('jsonwebtoken');

const Product=require('../models/product.model');

require('dotenv').config();

const SECRET_KEY=process.env.SECRET_KEY;



const ratingsAndReview=async(req,res)=>{
     const {productId,review,userDetail,userId}=req.body;
         let objectId=new mongoose.Types.ObjectId(productId);
    
        let result1=await Product.aggregate([
            {$match:{_id:objectId}},
            {$unwind:"$review"},
            {$match:{"review.userId":userId}},
            {$project:{review:1}}
         ]);
    
    
         if(result1.length!==0){
    
    let result2=await Product.updateOne(
        {_id:objectId,"review.userId":userId},
        {
            /* The line `:{'review.$.review':review}` is updating the value of the `review` field
            within an array element in a MongoDB document. */
            $set:{'review.$.review':review,'review.$.lastModified':new Date()}
        
        }
    );
    /* The `$` symbol in MongoDB is used as a placeholder to represent the matched element in an array when
    updating a specific element within an array in a document. */
    
    
    
            // let result2=await Product.aggregate([
               
            //         {$match:{_id:objectId}},
            //          {$unwind:"$review"},
            //         {$match:{"review.userId":userId}},
            //         {$set:{"review.review":review}}
            // ])
            console.log(result2);
         }else{
            let result3=await Product.updateOne(
                {_id:objectId},
                {$push:{review:{review:review,username:userDetail,userId:userId,lastModified:new Date()}},$inc:{reviewCount:1}},
                
            )
         }
    
    
        res.json(result1);
    
}

const search=async(req,res)=>{
     const {text,skip,limit}=req.body;
    
        const token=req.headers.authorization?.split(' ')[1];
    
          
        
            if(!token){
        
               return res.json({msg:"Token not provided"})
            }
        
            jwt.verify(token,SECRET_KEY,async(err,decode)=>{
                if(err){
                    return res.json({msg:"Unauthorized"})
                }
               
        
                //After authorization 
        
                if(decode.username){
        
        
        
                    let result=await Product.aggregate([
                        {$match:{
                            "title":{$regex:`^${text}`,$options:"i"}
                        }},
                        {$skip:skip},
                        {$limit:8},
                        {$unwind:"$review"},
                        {$addFields:{
                           "review.userId":{$toObjectId:"$review.userId"}
                        }
                        },
                        {
                            $lookup:{
                                from:"users",   
                                localField:"review.userId",
                                foreignField:"_id",
                                as:"userDetails"
                            }
                        },
                        {
                           $unwind:{
                            path:"$userDetails",
                            preserveNullAndEmptyArrays: true 
                           }
                        },
                        {
                            $project:{
                                title: 1,
                                authors: 1,
                                image: 1,
                                description: 1,
                                language: 1,
                                inStock: 1,
                                price: 1,
                                stock: 1,
                                review: 1,  // Include the review data
                                "userDetails.profileImageUrl": 1,  // Include user details (you can add more fields as necessary)
                                 
                            }
                        },
                        {
                            $group:{
                                _id:"$_id",
                                title:{$first:"$title"},
                                authors:{$first:"$authors"},
                                image:{$first:"$image"},
                                description: { $first: "$description" },  // Keep the first encountered description for the group
                                language: { $first: "$language" },  // Keep the first encountered language for the group
                                inStock: { $first: "$inStock" },  // Keep the first encountered inStock value for the group
                                price: { $first: "$price" },  // Keep the first encountered price for the group
                                stock: { $first: "$stock" },  // Keep the first enc,
                                review:{$push:{review:"$review",userDetails:"$userDetails"}}
                            }
                        }
                    ]);
                    res.json(result);
        
        
                }
               
            })
}



//After



const usersUpdate=async(req,res)=>{

    const {id,stock}=req.body;
      const objectId=new mongoose.Types.ObjectId(id)
      const result=await Product.updateOne({_id:objectId},{$inc:{stock:-stock}})
  
      res.json(result);
  
}

const productUpdate=async(req,res)=>{
    
 const {id,stock}=req.body;

    const objectId=new mongoose.Types.ObjectId(id);
    if(mongoose.Types.ObjectId.isValid(id)){
        console.log(true)
    }else{
        console.log(false)

    }


    const result=await Product.updateOne(
        {_id:objectId}
        ,{$inc:{stock:-stock}}
    );

    res.json({"msg":result});
}


const books=async(req,res)=>{
     const {skip,limit}=req.body;
    
        console.log("SKIP====",skip)
        console.log("LIMIT====",limit)
        const token=req.headers.authorization?.split(' ')[1];
    
        if(!token){
    
           return res.json({msg:"Token not provided"})
        }
    
        jwt.verify(token,SECRET_KEY,async(err,decode)=>{
            if(err){
                return res.json({msg:"Unauthorized"})
            }
            console.log("decode==",decode)
    
            //After authorization 
    
            if(decode.username){
    
    
    
                let result=await Product.aggregate([
                    {$skip:skip},
                    {$limit:4},
                    {$unwind:"$review"},
                    {$addFields:{
                       "review.userId":{$toObjectId:"$review.userId"}
                    }
                    },
                    {
                        $lookup:{
                            from:"users",   
                            localField:"review.userId",
                            foreignField:"_id",
                            as:"userDetails"
                        }
                    },
                    {
                       $unwind:{
                        path:"$userDetails",
                        preserveNullAndEmptyArrays: true 
                       }
                    },
                    {
                        $project:{
                            title: 1,
                            authors: 1,
                            image: 1,
                            description: 1,
                            language: 1,
                            inStock: 1,
                            price: 1,
                            stock: 1,
                            discount:1,
                            review: 1,  // Include the review data
                            "userDetails.profileImageUrl": 1,  // Include user details (you can add more fields as necessary)
                             
                        }
                    },
                    {
                        $group:{
                            _id:"$_id",
                            title:{$first:"$title"},
                            authors:{$first:"$authors"},
                            image:{$first:"$image"},
                            description: { $first: "$description" },  // Keep the first encountered description for the group
                            language: { $first: "$language" },  // Keep the first encountered language for the group
                            inStock: { $first: "$inStock" },  // Keep the first encountered inStock value for the group
                            price: { $first: "$price" },  // Keep the first encountered price for the group
                            stock: { $first: "$stock" },  // Keep the first enc,
                            discount:{$first:"$discount"},
                            review:{$push:{review:"$review",userDetails:"$userDetails"}}
                        }
                    }
                ]);
                res.json(result);
    
    
            }
           
        })
    
    
       
}


module.exports = {
ratingsAndReview,
search,
usersUpdate,
productUpdate,
books
};