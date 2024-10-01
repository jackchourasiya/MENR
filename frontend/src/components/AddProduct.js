import axios from "axios";
import { useState } from "react";

const Addproduct = () => {
    const [productname ,Setproductname] = useState('');
    const [image ,Setimage]             = useState(null);

    const submit = async () => {
        const token = localStorage.getItem('token');
        console.log('image-',image)
        if(!productname || !image){
            alert('all feild required');
            return false;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("productname", productname);

        try{
            const response = await axios.post('http://localhost:5000/addproduct',formData,{
                headers:{
                    Authorization  : `Bearar ${token}`
                },
            });

            console.log('response-',response)
        }catch(err){
            if(err.response){

            }
        }

        console.log(formData)
    }



    return(
        <>  
             <input type="text" onChange={(e)=>Setproductname(e.target.value)}/>
             <input type="file" onChange={(e)=>Setimage(e.target.files[0])}/>
             <button onClick={submit}>save</button>   
        </>
    )
}
export default Addproduct;