import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { sentOtpFunction } from '../services/Apis';
import '../style/mix.css';
import {useNavigate} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


const Login = () => {

  const [email,setEmail] = useState('');
  const [spiner, setSpiner] = useState(false);

  const navigate = useNavigate()

  // send otp
  const sendOtp = async(e)=>{
    e.preventDefault();
    if(email === ''){
      toast.error('Enter your Email!')
    }
    else if(!email.includes('@')){
      toast.error('Enter Valid Email!')
    }else {
      setSpiner(true);
      const data = {
        email:email
      }
      const response = await sentOtpFunction(data);
      console.log(response);
      if(response.status === 200){
        setSpiner(false);
        navigate('/user/otp', {state:email});
      }else{
        toast.error(response.response.data.error);
      }
    }
  }
 

  return (
    <>
    <section>
      <div className='form_data'>
        <div className='form_heading'>
          <h1>Welcom Back, Log In</h1>
          <p>Hi, we are you glad you are back, Please login.</p>
        </div>
        <form>
          <div className='form_input'>
            <label htmlFor='email'>Email</label>
            <input 
            type='email' 
            name='email'  
            onChange={(e)=>setEmail(e.target.value)}
            required='required' 
            id='' 
            placeholder='Enter Your Email'
            />
          </div>
          <button 
          className='btn'
          onClick={sendOtp}
          >
            Login
          {
          spiner ? <span> <Spinner animation='border' role="status"></Spinner></span>:""          
          }
          </button>
          <p>Don't have an account <NavLink to='/register'>Sign up</NavLink></p>
        </form>
        </div>
        <ToastContainer />
        </section>      
    </>
  )
}

export default Login
