import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name,email,password,password2} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //get values from authslice state
  //How does it know to select auth slice???
  //by putting state.[name of the state]
  //name of state can be found in state tab in redux toolkit, maybe can be renamed?
  const {user, isLoading,isError, isSuccess, message} = useSelector((state) => state.auth) //pass function that has a state and the state we want (auth)


  useEffect(()=> {
    if(isError){
      toast.error("Error: " + message)
    }

    //Redirect when logged in 
    if(isSuccess || user){
      navigate('/') //direct to homepage
    }

    dispatch(reset())
  },[isError,isSuccess,user,message,navigate,dispatch])

  const onChange = (e) => {
    setFormData((prevState) =>({
      ...prevState,
      //This ties names to values making it grab everything on the form instead of 1 field
      [e.target.name]: e.target.value, //We have to do this for the text to show up in the field while being saved
    }) )
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2){
      toast.error("Passwords do not match")
    }else{
      //password match, get user data
      const userData = {
        name,
        email,
        password
      }
      //Call the register function from authSlice
      //Use dispatch cus its between react and redux
      dispatch(register(userData)) 
    }

  }
//On submit function to fire a verifcation when submitting
//We traget this field on change with the name field with e.target.name
//Add value to set value
  return(
    <>
      <section className = 'heading'>
        <h1>
          <FaUser />Register
        </h1>
        <p>Create An Account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}> 
          <div className="form-group">
          <input type="text"
           className='form-control'
           id='name'
           name = 'name' 
           value={name} 
           onChange={onChange}
           placeholder="Enter Name" 
           required/>
          </div>
          
          <div className="form-group">
          <input type="text"
           className='form-control'
           id='email'
           name = 'email' 
           value={email} 
           onChange={onChange}
           placeholder="Enter Email" 
           required/>
          </div>

          <div className="form-group">
          <input type="text"
           className='form-control'
           id='password'
           name = 'password' 
           value={password} 
           onChange={onChange}
           placeholder="Enter Password"
           required />
          </div>

          <div className="form-group">
          <input type="text"
           className='form-control'
           id='password2'
           name = 'password2' 
           value={password2} 
           onChange={onChange}
           placeholder="Verify Password" 
           required/>
          </div>
          <div className="form-group">
            <button className='btn btn-block'>
              Submit
            </button>
          </div>

        </form>
      
      </section>
    </>
    )
}

export default Register
