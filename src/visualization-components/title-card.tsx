import { motion, useScroll, useTransform } from 'framer-motion'
import '../App.css'
import './vcomp.css'
import { ReactNode } from 'react';

function TitleCard({name, price, change, date, model} : {name: String, price: Number, change: Number, date: any, model: String}) {
    return (
        <motion.div className="w-[30vw] h-[30vh] box-simple font-istok text-black tracking-wider  " onMouseMove={(e) => 
    {const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
    e.currentTarget.style.transform = 'scale(0.95) rotateY(10deg)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'scale(1)';
  }}>
            <div className='flex flex-wrap gap-1 p-[10%] justify-between'>
                <p className='title-company text-[300%]'>
                    {name}
                </p>
                <p className='title-date text-[300%]'>
                    {date}
                </p>
                <div className='w-full border-2 m-1' />
                <p className='title-date text-[200%]'>
                    $179.54
                </p>
                <p className='title-time text-[200%]'>
                    4:05 PM
                </p>
                <div className = 'w-full'/>
                <p className = "title-change text-[150%]">
                    +0.05%
                </p>
            </div>


        </motion.div>
    )
}

export default TitleCard