
import '../App.css'
import './vcomp.css'
import { ReactNode,useState,  useEffect, useRef } from 'react';
import { CardSlide, CardReset } from '.';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
  AnimatePresence
} from "framer-motion";


interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({children, baseVelocity = 100}: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });
    const x = useTransform(baseX, (v) => `${wrap(-20, -40, v)}%`); // transform style

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });
  return (
    <div className="overflow-hidden tracking-widest whitespace-nowrap flex flex-nowrap">
        <motion.div className="text-[2rem] whitespace-nowrap flex flex-nowrap" style = {{x}}>
            <span className='mx-8'>{children} </span>
            <span className='mx-8'>{children} </span>
            <span className='mx-8'>{children} </span>
            <span className='mx-8'>{children} </span>
            <span className='mx-8'>{children} </span>
        </motion.div>

    </div>
  )
}

interface TitleCard {
    Name: string;
    Date: string;
    Price?: string;
    ChangeInt?: string;
    ChangePct?: string;
    Time?: string;
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
        <motion.div className=" w-[30vw] h-[30vh] box-simple font-istok text-black tracking-wider transition-all" onMouseMove={(e) => 
                {CardSlide(e)}}
            onMouseLeave={(e) => {
                {CardReset(e)}
            }}>
                <div className='flex flex-wrap gap-1 p-[10%] justify-between truncate'>
                    <p className='title-company text-[300%]'>
                        <ParallaxText baseVelocity={-0.5}>
                            {titlecard!.Name}
                        </ParallaxText>
                        
                    </p>
                    <p className='title-date text-[300%]'>
                        {titlecard?.Date}
                    </p>
                    <div className='w-full border-2 m-1' />
                    <p className='title-date text-[200%]'>
                        ${titlecard?.Price}
                    </p>
                    <p className='title-time text-[200%]'>
                        {titlecard?.Time}
                    </p>
                    <div className = 'w-full'/>
                    <p className = "title-change text-[150%]">
                        Today's Change: {titlecard?.ChangeInt}
                    </p>
                    <p className = "title-change text-[150%]">
                        ({titlecard?.ChangePct}%)
                    </p>    
                </div>
        </motion.div>
    )
}

export default TitleCard