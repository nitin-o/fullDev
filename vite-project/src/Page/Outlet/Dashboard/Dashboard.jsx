import React from 'react';
import clsx from 'clsx';
import "./abc.css";

const Dashboard = ({ className = "" }) => {
    const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

    return (

<>
<div className="flex gap-3 w-full">
  <div className="self-center">k</div> 
  <div className="self-end ml-auto">l</div> 
</div>



    
        <section className="bg-amber-200 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4 place-items-start">
            {items.map((item, index) => (
                <div 
                    key={index} 
                    className={clsx("bg-gray-700 border rounded-2xl p-4 text-white text-center max-w-[350px] w-full  min-h-[200px] flex items-center justify-center", className)}
                >
                    {item}
                </div>
            ))}
        </section>
        </>
    );
};

export default Dashboard;
