import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const NavItem = ({}) => {
    const authStatus = useSelector((state) => state.auth.status);

    const navItem = [
        {
            name :"Home",
            url : "/",
            isActive : true
        },{
            name :"Admin",
            url : "/Admin",
            isActive : authStatus
        },{
            name :"Dashboard",
            url : "/Dashboard",
            isActive : authStatus
        }
    ]
    return (
        <div>
            <ul className='bg- flex gap-7'>
                {navItem.map((item)=>(
                    item.isActive ? (<li key={item.name}>
                        <Link to ={item.url}>
                            {item.name}
                        </Link>
                    </li>):null
                ))
                }
            </ul>
        </div>
    );
}

export default NavItem;
