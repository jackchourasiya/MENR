import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Counter from './counter';

function Signup() {
  const [user, Setuser] = useState({
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    mobile:'',
  })

  const [validated, setValidated] = useState(false);

  const handlechange =(e)=>{
    Setuser({...user,[e.target.name]:e.target.value})
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
 
    try{
        const user_data = await axios.post('http://localhost:5000/signup',{user},{headers: {'Content-Type':'application/json'}});
        console.log('data-',user_data.data.message);
        toast(user_data.data.message)
    }
    catch(err){
        toast(err.response.data.message)
        console.log('err-',err.response.data.message)   
    }
  };

  return (
    <>
    <Counter/>
      <div className="form-container">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  name="firstname"
                  required
                  type="text"
                  val={user.firstname}
                  placeholder="First name"
                  onChange={(e)=>handlechange(e)}
                />
                <Form.Control.Feedback type="invalid">
                    Please choose a firstname.
                  </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  name="lastname"
                  required
                  type="text"
                  placeholder="Last name"
                  val={user.lastname}
                  onChange={(e)=>handlechange(e)}
                />
                  <Form.Control.Feedback type="invalid">
                    Please choose a lastname.
                  </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationCustomUsername">
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
            

            
              <Form.Group as={Col} md="12" controlId="validationCustom01">
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

              <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                <Form.Label>Mobile</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    name="mobile"  
                    type="text"
                    placeholder="mobile"
                    aria-describedby="inputGroupPrepend"
                    val={user.mobile}
                    onChange={(e)=>handlechange(e)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a mobile.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            <Button type="submit">Submit form</Button>
            <ToastContainer />
          </Form>
        </div>
    </>
  );
}

export default Signup;