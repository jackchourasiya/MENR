import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductEdit = () => {
    const {id} = useParams();
    const [productname ,Setproductname] = useState('');
    const [image ,Setimage]             = useState(null);
    const token                         = localStorage.getItem('token');

    const getdata = async () => {
        try{
            const response = await axios.get(`http://localhost:5000/GetProductId/${id}`,{
                headers:{
                    Authorization  : `Bearar ${token}`
                },
            });
            console.log('response-',response.data.product_data.productname)
            Setproductname(response.data.product_data.productname)
            Setimage(response.data.product_data.image)

        }catch(err){
            if(err.response){

            }
        }
    }

    useEffect(()=>{
        getdata();
    },[])

    const submit = async () => {
        if(!productname || !image){
            alert('all feild required');
            return false;
        }

        // console.log('image-',image)

        const formData = new FormData();
        formData.append("image", image);
        formData.append("productname", productname);

        try{
            const response = await axios.put(`http://localhost:5000/productEdit/${id}`,formData,{
                headers:{
                    Authorization  : `Bearar ${token}`
                },
            });

            console.log('response-',response)
        }catch(err){
            if(err.response){

            }
        }
        // console.log(formData)
    }

    return(
        <>  
             <input type="text" value={productname} onChange={(e)=>Setproductname(e.target.value)}/>
             <input type="file" onChange={(e)=>Setimage(e.target.files[0])}/>
             <button onClick={submit}>save</button>   
        </>
    )
}
export default ProductEdit;