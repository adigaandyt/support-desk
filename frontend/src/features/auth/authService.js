import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/users' //the url path (sending info from app like poastman)

// Register user
// Sending info like in postman
const register = async (userData) => {
    //wait for post request
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

//Logout user
const logout = () => {localStorage.removeItem('user')}



const authService = {
    register,
    logout
}

export default authService