import { motion, useScroll, useTransform } from 'framer-motion'
import '../App.css'
import './vcomp.css'
import { ReactNode,useState,  useEffect } from 'react';


interface TitleCard {
    Name: string;
    Date: string;
}


function TitleCard({ticker} : {ticker: string}) {
    const [titlecard, setTitlecard] = useState<TitleCard | null>(null);

    useEffect(() => {
        async function getTitleComp(ticker: string) {
            const res = await fetch(`/api/titlecard?ticker=${encodeURIComponent(ticker)}`);

            if (!res.ok) {
                throw new Error("Failed to fetch info");
            }
            const data: TitleCard = await res.json();
            setTitlecard(data);
        }
        getTitleComp(ticker)
    }, [ticker])

   

    return (
        <motion.div className="absolute translate-y-1 w-[30vw] h-[30vh] box-simple font-istok text-black tracking-wider transition-all" onMouseMove={(e) => 
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
                    {titlecard?.Name}
                </p>
                <p className='title-date text-[300%]'>
                    {titlecard?.Date}
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