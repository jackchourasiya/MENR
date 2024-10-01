import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {LoginUserData, Token} from '../redux/authsuerslice'
import { useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

import '../App.css';

function Login() {
  const navigate            = useNavigate();
  const dispatch            = useDispatch();
  let [loading, setLoading] = useState(false);

  const [user, Setuser] = useState({
    email:'',
    password:''
  })

  const [validated, setValidated] = useState(false);

  const handlechange =(e)=>{
    Setuser({...user,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
 
    try{
        setLoading(true)
        const user_data = await axios.post('http://localhost:5000/login',{user},{headers: {'Content-Type':'application/json'}});
        toast(user_data.data.message)
        dispatch(LoginUserData(user_data.data.user))
        console.log('user_data.data.tokens-',user_data.data.tokens)
        localStorage.setItem("token", user_data.data.tokens);
        dispatch(Token(user_data.data.tokens))
        setTimeout(()=>{
            navigate('/home')
        },2000)
    }
    catch(err){
      if (err.response) {
        setLoading(false)
        // If the error has a response, log the data
        console.error('Error data:', err.response.data);
        toast(err.response.data.message);
      }   
    }
  };

  return (
    <>
    <div className="form-container"> 
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3 justify-content-center">
          <Form.Group as={Col}  controlId="validationCustomUsername">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="email"  
                type="text"
                placeholder="email"
                aria-describedby="inputGroupPrepend"
                val={user.email}
                onChange={(e)=>handlechange(e)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="mb-3 justify-content-center">
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              required
              type="text"
              val={user.password}
              placeholder="First name"
              onChange={(e)=>handlechange(e)}
            />
            <Form.Control.Feedback type="invalid">
                Please choose a password.
              </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {
          loading? <Spinner animation="border" variant="primary" /> : <Button type="submit">Submit form</Button>
        }
        
        <ToastContainer />
      </Form>
    </div>
    </>

  );
}

export default Login;