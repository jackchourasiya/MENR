import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate,Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux';
import { LoginUserData,Token } from '../redux/authsuerslice';
// import '../App.css';

function Navcomponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const logout = () => {
        dispatch(LoginUserData([]))
        dispatch(Token(''))
        localStorage.clear()
        navigate('/signup')   
    }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link className="nav-link" to="/">Home</Link>
            <Link to="/Signup" className="nav-link">signup</Link>
            <Link to="/login" className="nav-link">login</Link>
            <Link to="/addproduct" className="nav-link">AddProduct</Link>
            <Link className="nav-link" to="/signup" onClick={logout}>logout</Link>
            <Link className="nav-link" to="/products">Products</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navcomponent;