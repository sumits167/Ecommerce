

class User {

    async userData(id,cartData,val){
    
        if(Array.isArray(cartData)){
            cartData=cartData[0];
        }
        
    
        let res= await fetch('http://localhost:3000/api/user/getUserData',{
         method:"post",
         headers:
         {'Content-type':'application/json'},
         body:
         JSON.stringify({id:id})
                
           

      });

       let data=await res.json();
        
      
       let check=0;

       let outputData=data.result[0].cartData;
      for(let i=0;i<outputData.length;i++){
        if(outputData[i].productId==cartData._id){
          
            check=1;
            try {
                fetch("http://localhost:3000/api/user/quantityUpdate",{
                    method:"post",
                    headers:
                    {'Content-type':'application/json'},
                    body:
                    JSON.stringify({
                        
                        id:id,
                        productId:outputData[i].productId,
                        val:val
                    })
                }    )
                .then((res)=>{

                    return res.json();
                })
                .then((data)=>{

                  
                    return data.result.acknowledged;
                    

                })
                
            } catch (error) {
                console.log("update error=",error);
            }
        }
      }






    // //      let sim=[];
    //      data.result.map((el)=>{
    //         sim.push(el);
    //      })
    //      sim.push(cartData);
         
    //      console.log("forn=",data.result);

       

    //     let userData=data.result;
    //     if(cartData){
    //         userData.push(cartData);

    //     }


    //    let arr=userData.filter((el)=>el.cartData!==null);
    //      console.log("usr data=",userData)
       
        
    //      console.log("arry=",arr);
    //     //  console.log("parse=",JSON.parse(arr[0].cartData))









if(!check){


        try {
            fetch('http://localhost:3000/api/user/userData',{
                method:"post",
                headers:
                {'Content-type':'application/json'},
                body:
                JSON.stringify({
                    cartData:cartData,
                    id:id,
                })
            })
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
              
                return data.result.acknowledged;
                
            })
            .catch((err)=>[
               
            ])
        } catch (error) {
            
        }
    }
    }


      
    

    async updateProduct(userId,productId){

        let res= await fetch('http://localhost:3000/api/user/removeProduct',{
            method:"post",
            headers:
            {'Content-type':'application/json'},
            body:
            JSON.stringify(
                {
                    id:userId,
                    productId:productId
                }
            
            )
                   
              
   
         });
         let data=await res.json();

        
         return data.acknowledged;

    }

    async address(address,userId){

        let res=await fetch("http://localhost:3000/api/user/address",{
            method:'post',
            headers:
            {"Content-type":"application/json"},
            body:
            JSON.stringify({
                userId:userId,
                address:address
            })
        });
        let data=res.json();
        

    }

}

const user=new User();

export default user