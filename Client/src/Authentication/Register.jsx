import React, {useState} from 'react'

import { useForm } from 'react-hook-form'

import { useAuth } from '../router/AuthProvider'
import { Link } from 'react-router-dom'


const Register = () => {
  

  
  
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors,isSubmitting },
  } = useForm()
  const auth = useAuth();
  const [otp, setOtp] = useState(false);
  const [email, setEmail] = useState(null);
  const onSubmit = async (data) => {
    if(data.password !== data.confirmpassword){
        setError('password',{message:"Password and Confirm password are not matching"});
        
        return;
      }
    if(await auth.Register(data)){
      setEmail(data.email);
      setOtp(true);
    }
    
    
  }
  const onSubmitOtp = async (data) => { 
    if(await auth.verifyRegistration({email:email,otp:data.otp})){
        setOtp(false);  
      console.log("verified");
    }
  }
  
  
  
  

  return (
    <>
    <div className='flex items-center flex-row h-screen'>
      <div className="border mx-auto flex flex-row">
        
        <div className="h-full bg-white p-16 flex flex-col justify-center items-center gap-4">
            <h1 className='text-2xl'>CodeEditor</h1>
            <h1 className='text-l text-black'>Register</h1>
          {!otp && <form onSubmit={handleSubmit(onSubmit)} className='flex
           flex-col gap-6'>
            {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            <div>
              <p className='text-sm text-left text-slate-700'>Name</p>
              <input type="text" {...register("name")} className='border w-96 px-4 py-2 rounded outline-none'/>
              </div>
            <div><p className='text-sm text-left text-slate-700'>Email</p>
              <input type="email" {...register("email",{required:{value: true, message:"This is required",}})} className='border w-96 px-4 py-2 rounded outline-none' autoComplete='off'/> 
              </div>
              <div>
              <p className='text-sm text-left text-slate-700'>Password</p>
              <input type="password" {...register("password")} className='border w-96 px-4 py-2 rounded outline-none'/>
              </div>
              <div>
              <p className='text-sm text-left text-slate-700'>Confirm Password</p>
              <input type="password" {...register("confirmpassword")} className='border w-96 px-4 py-2 rounded outline-none'/>
              </div>
              <input disabled={isSubmitting} value={isSubmitting?"Submitting...": "Submit"} type="submit" className='border rounded w-1/2 mx-auto py-2 cursor-pointer hover:bg-blue-600 hover:text-white' />
           </form>
           
           }
           {otp && <form onSubmit={handleSubmit(onSubmitOtp)} className='flex flex-col gap-6'>
            {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            <div>
              <p className='text-sm text-left text-slate-700'>OTP</p>
              <input type="text" {...register("otp")} className='border w-96 px-4 py-2 rounded outline-none'/>
              </div>
              <input type="submit" value={isSubmitting?"Submitting...": "Submit"} disabled={isSubmitting} className='border rounded w-1/2 mx-auto py-2 cursor-pointer hover:bg-blue-600 hover:text-white' />
              </form>}
              <p className='text-sm'>Already Registered? <Link to='/login' className='underline cursor-pointer'>Login</Link></p>

           
           
        </div>
      </div>
    
    </div>
    </>
  )
}

export default Register