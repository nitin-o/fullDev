import React from 'react';
import { Outlet } from 'react-router';
import { ButtonComponat } from '../componant';
import Headerbutton from './Headerbutton';
import NavItem from './NavItem';



const Header = () => {
    return (
            <div className='flex flex-col justify-evenly '>
                <div className='bg-gray-900 border-1  border-gray-700 flex justify-between h-15 items-center '>
                    <div>logo</div>
                    <div><NavItem/> </div>
                    <div className='flex m-2'>
                        <Headerbutton/>
                    </div>
                
                    </div>
                    {false ?(<div className="fixed top-15 rounded-tl-2xl right-0 z-40 h-screen p-4 bg-white w-64 dark:bg-gray-800 ">
                        <div>
                            <button>ok</button>
                        </div>
                    </div>):null}
            </div>
       
    );
}

export default Header;
