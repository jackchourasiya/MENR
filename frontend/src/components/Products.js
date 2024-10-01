import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom';

const Products = () => {
    
    const token = localStorage.getItem('token');

    const [produts, setproduts] = useState();

    const getproducts = async() => {
        try{
            const response = await axios.get('http://localhost:5000/getproduct',{
                headers:{
                    Authorization :  `Bearer ${token}`,
                }
            })
            setproduts(response.data.product_data)
            console.log('response-', response)
        }catch(err){
            console.log('response-',err.response)
        }
    }
    useEffect(()=>{
        getproducts()
    },[]);
    console.log('produts-',produts)

    const deleteproduct = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/deleteproduct/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('response-', response.data); // Access the response data
            getproducts();
        } catch (err) {
            if (err.response) {
                console.log('Error response:', err.response.data); // Log the error response
            } else {
                console.log('Error:', err.message); // Log any other errors
            }
        }
    }

    return(
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th> Name</th>
                    <th>image</th>
                    <th>edit</th>
                    <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        produts?produts.map((val,i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{val.productname}</td>
                                <td><img style={{width:'60px'}} src={`http://localhost:5000/uploads/${val.image}`} /></td>
                                <td><Link to={`/product_edit/${val._id}`}>edit</Link></td>
                                <button onClick={()=>{deleteproduct(val._id)}}>Deleted</button>
                            </tr>
        
                        )): <tr><td colSpan="5">No data found</td></tr>   
                    }
                </tbody>
            </Table>
        </>
    )
}
export default Products;