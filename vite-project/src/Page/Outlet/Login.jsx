import React from 'react';
import { ButtonComponat, InputComponat } from '../componant';
import { useForm } from "react-hook-form"
import userService from '../../DataBase/config';
import { useDispatch } from 'react-redux';
import { login } from "../../store/authSlice.js";
import { useNavigate } from 'react-router';

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  const onSubmit =async (data) => {
    const  respons = await userService.loginUser(data)

      if (!respons?.success) {
        console.log(respons?.message);
        return
        
      }
      if (respons?.success) {
        dispatch(login(respons?.data?.loginUser))
        navigate("/Profile")
      }
  };

    return (
      <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col justify-evenly h-full '>
          <div className=' w-full flex flex-col  items-center gap-8'>
            <div><h2>Login </h2></div>
           
            <div  className='w-full '>
               
                <InputComponat label='Email' type='email'
                placeholder='Enter Your Email'
                {...register("email", { required: true })}/>
                <InputComponat label='Password' type='password'
                placeholder='Enter Password'
                {...register("password", { required: true })}/>
               
            </div>
            <div>
                <ButtonComponat text='Log-In Account'  type='submit'/>
            </div>
           
        </div>
      </form>
    );
}

export default Login;
