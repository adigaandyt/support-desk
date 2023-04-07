import React from 'react'
import { useState } from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {login} from '../features/auth/authSlice'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email,password} = formData
  const onChange = (e) => {
    setFormData((prevState) =>({
      ...prevState,
      //This ties names to values making it grab everything on the form instead of 1 field
      [e.target.name]: e.target.value, //We have to do this for the text to show up in the field while being saved
    }) )
  }

  const dispatch = useDispatch()
  const {user, isLoading, isSuccess, message} = 
  useSelector(
    (state) => state.auth
    )
  

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }
//On submit function to fire a verifcation when submitting
//We traget this field on change with the name field with e.target.name
//Add value to set value
  return(
    <>
      <section className = 'heading'>
        <h1>
          <FaSignInAlt />Sign In
        </h1>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}> 
          
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
            <button className='btn btn-block'>
              Submit
            </button>
          </div>

        </form>
      
      </section>
    </>
    )
}

export default Login
