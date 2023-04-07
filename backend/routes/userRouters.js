const express = require('express')
const router = express.Router()

//we export functions from the path at require
//Function names are in the path file exported as modueles
const {registerUser,loginUser,getMe} = require('../controllers/userController')



const {protect} = require('../middleware/authMiddleware')
//Routers that take a post request from their paths
//Instead of putting logic in the functions 
//Make controllers with the logic
//router.post('/',(req,res) => {
//    res.send('Main page')
//    })
//Instead of having the logic in here with req res
//we import functions from controllers who handle all the logic
//Routes: 
router.post('/api/users', registerUser)
router.post('/api/users/login', loginUser)
router.get('/api/users/me',protect, getMe) //put in the protect as a 2nd argument to create a protected route


module.exports = router