import React from 'react';
import { Link } from 'react-router';

const NavItem = ({}) => {
    const navItem = [
        {
            name :"Home",
            url : "/",
            isActive : true
        },{
            name :"Admin",
            url : "/Admin",
            isActive : true
        },{
            name :"Dashboard",
            url : "/Dashboard",
            isActive : true
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
