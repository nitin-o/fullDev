import React from 'react';
import { ButtonComponat } from '../componant';
import { useNavigate } from 'react-router';

const Headerbutton = () => {
    const navigate = useNavigate()

    return (
        <div className='flex gap-2'>
            {true? (<>
                <ButtonComponat text='Log In' type='button' onClick={(()=>{navigate("/Login")})}/>
                <ButtonComponat text='Sign Up' type='button' onClick={(()=>{navigate("/Registrar")})}/> 
            </>):
            (<>
                <img class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="/docs/images/people/profile-picture-5.jpg" alt="Bordered avatar"/>
                <ButtonComponat text='Logout' type='button' onClick={(()=>{navigate("/Registrar")})}/>
            </>)}
        </div>
    );
}

export default Headerbutton;
