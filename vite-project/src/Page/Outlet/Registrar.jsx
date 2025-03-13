import React, { useState } from 'react';
import { ButtonComponat, InputComponat } from "../componant/index.js"; // ✅ Fixed typo in imports
import { useForm } from 'react-hook-form';
import userService from '../../DataBase/config.js'; // ✅ Ensure this is the correct path


const Register = () => {

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const [preview, setPreview] = useState(null);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("email", data.email);
        formData.append("password", data.password);
    
        // ✅ Fix File Upload Handling
        const selectedFile = watch("avatar"); // Retrieve file from state
        if (selectedFile && selectedFile.length > 0) {
            console.log("Adding File:", selectedFile[0]); // Debugging
            formData.append("avatar", selectedFile[0]); 
        } else {
            console.warn("No file selected");
        }
    
        try {
            const response = await userService.registerUser(formData)
    
            console.log("Response:", response);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Selected File:", file); // Debugging
            setValue("avatar", e.target.files);
            setPreview(URL.createObjectURL(file));
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
