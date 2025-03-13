import React from 'react';
import { ButtonComponat, InputComponat } from "../componant/index.js"; // ✅ Fixed typo in imports
import { useForm } from 'react-hook-form';
import userService from '../../DataBase/config.js'; // ✅ Ensure this is the correct path


const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (data.password == data.confirmPassword) {
            alert("Confirm Password does not match");
            return;
        }

        try {


            
            const respons =await userService.registerUser(data)
            
            if (!respons.success) {
                console.log(respons.message);
                return 
                
            }

            if (respons.success) {
                console.log(respons.message);
                return 
            }
            
            
        } catch (error) {
            console.error("Registration Failed:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-evenly h-full'>
            <div className='w-full flex flex-col items-center gap-8'>
                <h2>Create Account</h2>

                <div className='w-full'>
                    <InputComponat {...register("firstName", { required: true })} 
                        label='First Name' type='text' placeholder='Enter Your First Name ...' />
                    {errors.name && <span className="text-red-500">First Name is required</span>}

                    <InputComponat {...register("lastName", { required: true })} 
                        label='Last Name' type='text' placeholder='Enter Your Last Name ...' />
                    {errors.lastName && <span className="text-red-500">Last Name is required</span>}

                    <InputComponat {...register("email", { required: true })} 
                        label='Email' type='email' placeholder='Enter Your Email' />
                    {errors.email && <span className="text-red-500">Email is required</span>}

                    <InputComponat {...register("password", { required: true })} 
                        label='Password' type='password' placeholder='Enter Password' />
                    {errors.password && <span className="text-red-500">Password is required</span>}

                    <InputComponat {...register("confirmPassword", { required: false })} 
                        label='Confirm Password' type='password' placeholder='Confirm Password' />
                    {errors.confirmPassword && <span className="text-red-500">Confirm Password is required</span>}
                </div>

                <div>
                    <ButtonComponat text='Create Account' type='submit' />
                </div>
            </div>
        </form>
    );
};

export default Register;
