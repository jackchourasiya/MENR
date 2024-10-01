const express = require('express');
const route = express.Router();
const {login,signup,getuser,addproduct,getallproduct,getproductbyid,productEdit,productdelete} = require('../controllers/auth')
const authverify = require('../middleware/authtoken')
const upload = require('../middleware/Multer');

route.post('/signup', signup);
route.post('/login' , login);
route.get('/getuser' ,authverify, getuser);
route.post('/addproduct' , authverify, upload.single('image'), addproduct);
route.get('/getproduct' ,authverify, getallproduct);
route.get('/GetProductId/:id' ,authverify, getproductbyid);
route.put('/productEdit/:id' ,authverify,upload.single('image'), productEdit);
route.delete('/deleteproduct/:id',authverify, productdelete)
module.exports = route