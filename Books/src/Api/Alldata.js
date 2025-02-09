

class Alldata{

    
    
    async fetch({skip,limit,token}){

        
        if(!token){
           
            return;

        }



      
        try {
            let res=await fetch(`http://localhost:3000/api/cart/books`,{
                method:"post",
                headers:{
                    Authorization:`Bearer ${token}`,
                    'Content-type':'application/json'
                },
                body:
                JSON.stringify({
                    skip:skip,
                    limit:limit
                })
            });
            if(res){
                let ress=await res.json();
              
              return await ress;
            }
        } catch (error) {
           
        }
       
    }

    }
        
const allData=new Alldata();
export default allData


