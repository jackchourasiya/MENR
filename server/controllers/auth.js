const validator     = require('validator'); 
const authmodel     = require('../models/auth.model');
const productmodel  = require('../models/Addproduct.model') 
const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');

exports.signup = async (req,res) => {
    const {firstname,lastname,email,password,mobile} = req.body.user;
    console.log('req.body-',req.body.user)
    if(!firstname || !lastname || !email || !password || !mobile){
        return res.status(400).json({message:'All feilds are required',success:false})
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({message:'email is not valid',success:false})
    }

    if(password.length <= 8){
        return res.status(400).json({message:'password should be 8 digit',success:false})
    }

    try{
        const user = await authmodel.findOne({email});
        if(user){
            return res.status(400).json({message:'user already exist',success:false})
        }

        const create_user = new authmodel({
            firstname,
            lastname,
            email,
            password,
            mobile
        })

        create_user.password = await bcrypt.hash(password,10);

        await create_user.save();
        return res.status(200).json({message:'User Created',success:true})
    }catch(err){
        return res.status(400).json({message:'internal server error',success:false})
    }
}

exports.login = async (req,res) => {
    const {email , password} = req.body.user;
    
    if( !email || !password ){
        return res.status(400).json({message:'All feilds are required',success:false})
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({message:'email is not valid',success:false})
    }

    if(password.length <= 8){
        return res.status(400).json({message:'password should be 8 digit',success:false})
    }

    try{
        const user = await authmodel.findOne({email});
        if(!user){
            return res.status(400).json({message:'invalid credencial',success:false})
        }

        const passmatch = await bcrypt.compare(password,user.password);
        if(!passmatch){
            return res.status(400).json({message:'invalid credencial',success:false})
        }
        const token_obj = {
            id:user._id
        };

        const token = jwt.sign(token_obj, 'sourabh', {
            expiresIn: '1h'
          });
        return res.status(200).json({message:'user login',success:true, user:user,tokens:token})

    }catch(err){
        return res.status(400).json({message:'internal server error',success:false})
    }
}

exports.getuser = async (req,res) => {
    try{
        const user = await authmodel.find();
        if(!user){
            return res.status(400).json({message:'not any user',success:false})
        }

        return res.status(200).json({message:'users',success:true, user:user})

    }catch(err){
        return res.status(400).json({message:'internal server error',success:false})
    }
}

exports.addproduct      = async (req,res) => {
    const image         = req.file;
    const {productname} = req.body;
    console.log('productname-',productname)
    console.log('image-',image)

    try{
        const product_data = new productmodel({
            productname:productname,
            image:image.filename
        })
        await product_data.save();
        return res.status(200).json({message:'product uploaded',success:true})    

    }catch(err){
        return res.status(400).json({message:'internal server error',success:false})
    }
}

exports.getallproduct   = async (req,res) => {

    try{
        const product_data = await productmodel.find();
        console.log(product_data)
        return res.status(200).json({message:'products',success:true, product_data:product_data})    

    }catch(err){
        return res.status(400).json({message:'internal server error',success:false})
    }
}

exports.getproductbyid   = async (req,res) => {
    const {id} = req.params;
    try{
        const products = await productmodel.findOne({_id:id});
        // console.log(products)
        return res.status(200).json({message:'products',success:true, product_data:products})    

    }catch(err){
        return res.status(400).json({message:'internal server error',success:false})
    }
}

exports.productEdit     = async (req,res) => {
    const {id}          = req.params;
    const image         = req.file;
    const {productname} = req.body;

    try{
        const product = await productmodel.findOne({_id:id});
        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false });
        }
        product.productname = productname;
        if (image) {
            product.image = image.filename;
        }
        await product.save();
        return res.status(200).json({message:'product updated', success:true})    

    }catch(err){
        return res.status(400).json({message:'internal server error',success:false})
    }
}

exports.productdelete = async (req,res) =>{
    const {id} = req.params;
    try{
        const products = await productmodel.deleteOne({_id:id});
        // console.log(products)
        return res.status(200).json({message:'products deleted',success:true})    

    }catch(err){
        return res.status(400).json({message:'internal server error',success:false})
    }   
}