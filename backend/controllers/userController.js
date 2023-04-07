//File to handle user registeration and login

//ASYNC handler at npm, wrap async functions with the handler
//and make them async
//Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const asyncHandler = require('express-async-handler')
//bcrypt to hash passwords
const bcrypt = require('bcryptjs')
//User model 
const User = require('../models/userModel')
//Json web token is given to user after logging in to give access to the rest of the app
const jwt = require('jsonwebtoken')


//@desc register a new user
//@route /api/users
//@access Public
const registerUser = asyncHandler(async(req,res) => {
    //We are sending a url encoded json, so we use
    //request.body to disect it (req.body)
    //const names have to be the same as the ones in json
    const {name,email,password} = req.body

    //Validation
    if(!name || !email || !password){
        //instead of sending like this
        //res.status(400).send("Please fill all fields") 
        //we return a json file which the function returns and the server.js sends

        //we can send the json file using this, but then u will need to make it for every error
        //return res.status(400).json({message: "Please fill all the fields"})
        //Instead we use a custome error handler in middleware called errormiddleware.js
        res.status(400)
        throw new Error('Fill all fields')
    } 

    //all the input is there, continue

    //Find if user exists
    //check if user exists by searching email, 
    //findOne function finds it
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Create user using our model which has a create function
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    //If user create successfully return, ID and name,email
    if(user){
        res.status(201).json({
            _id: user._id, //_id mongo syntax
            name: user.name,
            email: user.email,
            token: generateToken(user._id),//Generate a signed token
        })
    }else{
        res.status(400)
        throw new Error('user data error')
    }
})

//@desc login existin user
//@route /api/users/login
//@access Public
const loginUser = asyncHandler(async(req,res) => {
    //get login info
    const {email,password} = req.body
    //find the user
    const user = await User.findOne({email})
    //Check password hash
    //(if user exists and password patches)
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id: user._id, //_id mongo syntax
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }

})          

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}

//@desc get current user
//@route /api/users/me
//@access Private
const getMe = asyncHandler(async(req,res)=>{
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    }
    res.status(200).json(user)
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
}