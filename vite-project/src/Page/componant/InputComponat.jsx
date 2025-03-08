import React from 'react';

const InputComponat = ({
    className="",
    type="text",
    placeholder="",
    label = "",
    ...props
}) => {
    return (
        <div className={`${className} flex flex-col "bg-white text-black p-2 dark:text-white gap-2 w-full`}>
            {label ? (<label  className='ms-4'>{label}</label>):null}

            <input className='border border-gray-700 p-2 pl-4 pr-3 w-full rounded-2xl' type={type} placeholder={placeholder} {...props} />
        </div>
    );
}

export default InputComponat;
