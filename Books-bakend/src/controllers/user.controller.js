const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/user.model');


require('dotenv').config();

const SECRET_KEY=process.env.SECRET_KEY;


const users=async(req,res)=>{

    const {id}=req.body;

    const result=await User.find({_id:id});
    res.json(result);
   

}







const usersSignup=async(req,res)=>{
     const {username,password}=req.body;
    
        const result=await User.find({username:username});
    
        
    
        if(result.length!=0){
            return res.json({error:"This user already exists"})
        }
        let hashpass=await bcrypt.hash(password,10);
    
        let adduser=await User.create({username:username,password:hashpass,profileImageUrl:"https://static.vecteezy.com/system/resources/previews/029/364/941/non_2x/3d-carton-of-boy-going-to-school-ai-photo.jpg",address:{name:username}})
    
        res.json({msg:adduser});
    
    
    
      
}

const usersLogin=async(req,res)=>{
     const {username,password}=req.body;
    
        
        const result=await User.find({username:username});
    
      
    
        if(result.length==0){
            return res.json({msg:false});
        }
    
        let dbPass=result[0].password;
        let check=await bcrypt.compare(password,dbPass);
    
        if(!check){
            return res.json({msg:false})
        }else{
            const token=jwt.sign({username:username},SECRET_KEY,{expiresIn:'10h'})
          return  res.json({msg:true,result:result,token:token});
        }
    
    
    
}



const usersGatUserData=async(req,res)=>{
    const {id}=req.body;
    const result=await User.find({_id:id},{cartData:1,_id:0});
    console.log("get user=",result);
    res.json({msg:"Success",result:result})

}

const usersUserData=async(req,res)=>{
    const {cartData,id}=req.body;
    console.log("cartData=",cartData,"id=",id)

   data={
    productId:cartData._id,
    quantity:1, 
   }


    const result=await User.updateOne({_id:id},{$push:{cartData:data}})
    res.json({msg:"Successfully add to cart",result:result})
    
}


const usersQuantityUpdate=async(req,res)=>{
    const {id,productId,val}=req.body;

    let check;
    if(val=="+"){
        check=1;
    }else{
        check=-1;
    }


   
    let result=await User.updateOne(
        {_id:id,"cartData.productId":productId},
        {$inc:{"cartData.$.quantity":check}}
    
    
    );

    return res.json({msg:"Succesfull quantity updatae",result});
  
}


const usersDetail=async(req,res)=>{
     const {id}=req.body;
        let objectId= new mongoose.Types.ObjectId(id);
      
    
        let result=await User.aggregate([
            {$match:{_id:objectId}},
            {$unwind:"$cartData"},
            {$lookup:{
    
                  from:"products",
                    let:{productId: { $toObjectId: "$cartData.productId" }},
                    pipeline:[
                        {$match:{$expr:{$eq:["$_id","$$productId"]}}}
                    ],
                    as:"Details"
                }
            },
            
        ]
    );
    
    console.log(result);
    res.json(result);
}


const usersRemoveProduct=async(req,res)=>{
    const {id,productId}=req.body;
    let result=await User.updateOne(
        {_id:id},
        {$pull:{cartData:{productId:productId}}}
    );

    console.log(result);
    res.json(result);
}

const usersAddress=async(req,res)=>{
    const {address,userId}=req.body;

    const result=await User.updateOne(
        {_id:userId},
       {$set:{address:address}}
)
res.json({"Ok":result});
}









const userprofile=async(req,res)=>{
     const {UserId}=req.body;
        const objectId=new mongoose.Types.ObjectId(UserId);
    
        let result=await User.findOne({_id:objectId});
        res.json(result)
}

const getUser=async(req,res)=>{
    const {id}=req.body;
        let objectId=new mongoose.Types.ObjectId(id)
    
        let result=await User.findOne({
            _id:objectId
        })
        res.json({msg:"success",result:[result]});
}





const changeProfilePicture=async(req,res)=>{
    const {userId,url}=req.body;
       const objectId=new mongoose.Types.ObjectId(userId)
       let result=await User.updateOne(
           {_id:objectId},
           {$set:{profileImageUrl:url}}
       );
       res.json(result);
}

const cartDataEmpty=async(req,res)=>{
    const {id}=req.body;
   
    const result=await User.updateOne(
        {_id:id},
        {$set:{cartData:[]}}
    );
    res.json({"msg":result});
}




const orderHistory=async(req,res)=>{
    
        const {id,orderDetails}=req.body;
        console.log('orderDetails=',orderDetails)
        const objectId=new mongoose.Types.ObjectId(id);
        console.log(id,objectId);
    
        let result=await User.updateOne(
            {_id:objectId},
            {$push:{orderHistory:orderDetails}}
        );
        console.log(result);
        res.json(result);
}


const getOrderHistory=async(req,res)=>{
        const {userId}=req.body;
    const objectId=new mongoose.Types.ObjectId(userId);
    
        let result=await User.aggregate([
            {$match:{_id:objectId}},
            {$project:
                {
                    lastOrder:{$arrayElemAt:["$orderHistory",-1]}
                }
            }
        ]);
        console.log(result);
        res.json(result);
}


const searchHistory=async(req,res)=>{
      const {searchTerm,userId}=req.body;
        const objectId=new mongoose.Types.ObjectId(userId)
        let result=await User.updateOne(
            {_id:objectId},
            {$addToSet:{searchHistory:searchTerm}}
        );
        res.json(result);
}

const searchItems=async(req,res)=>{
    const {id}=req.body;
      const objectId=new mongoose.Types.ObjectId(id);
  
      let result=await User.find(
          {_id:objectId},
          {searchHistory:1,_id:0}
      );
      res.json(result)
}

const deleteHistory=async(req,res)=>{
    const {searchTerm,userId}=req.body;
      const objectId=new mongoose.Types.ObjectId(userId);
  
      let result=await User.updateOne(
          {_id:objectId},
          {$pull:{searchHistory:searchTerm}}
      );
      res.json(result);
  
  }




module.exports={
users,
usersSignup,
usersLogin,
usersGatUserData,
usersUserData,
usersQuantityUpdate,
usersDetail,
usersRemoveProduct,
usersAddress,
userprofile,
getUser,
changeProfilePicture,
cartDataEmpty,
orderHistory,
getOrderHistory,
searchHistory,
searchItems,
deleteHistory
}