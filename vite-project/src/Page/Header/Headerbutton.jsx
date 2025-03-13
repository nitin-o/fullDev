import React, { useState, useEffect } from 'react';
import { ButtonComponat } from '../componant';
import { Link, useNavigate } from 'react-router';
import userService from '../../DataBase/config';
import { useDispatch, useSelector } from 'react-redux';
import { logout  } from '../../store/authSlice';


const Headerbutton = () => {
    const authStatus = useSelector((state) => state.auth.status);
    const [abc ,setAbc]= useState(false)
    const navigate = useNavigate();
    console.log(authStatus);
    const dispatch = useDispatch()
    

    useEffect(() => {
        setAbc(authStatus);
    }, [authStatus]);


console.log("authStatus :-",authStatus);


    const logoutButton = async () => {
        const data = await userService.logoutUser();
        console.log(data);
        dispatch(logout())
        navigate("/Home")
    };

    return (
        <div className='flex gap-2'>
            {!abc ? ( // Use `authStatus` directly
                <>
                    <ButtonComponat text='Log In' type='button' onClick={() => navigate("/Login")} />
                    <ButtonComponat text='Sign Up' type='button' onClick={() => navigate("/Registrar")} />
                </>
            ) : (
                <>
                 <Link to="/profile">
                    <img
                        className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                        src="/docs/images/people/profile-picture-5.jpg"
                        alt="User Avatar"
                        
                    /></Link>
                    <ButtonComponat text='Logout' type='button' onClick={logoutButton} />
                </>
            )}
        </div>
    );
};

export default Headerbutton;
