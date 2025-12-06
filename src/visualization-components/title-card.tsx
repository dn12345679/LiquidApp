
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
import { title } from 'motion/react-client';


interface ParallaxProps {
  children: string | undefined;
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
                    <div className='title-company text-[300%]'>
                        <ParallaxText baseVelocity={-2}>
                            {titlecard?.Name}
                        </ParallaxText>
                        
                    </div>
                    <p className='title-date text-[1vw]'>
                        {titlecard?.Date}
                    </p>
                    <p className='title-time text-[1vw]'>
                        {titlecard?.Time}
                    </p>
                    <div className='w-full border-2 m-1' />
                    <p className='title-date text-[2vw]'>
                        ${titlecard?.Price}
                    </p>
                    <p className='title-ticker text-[2vw]'>
                        ${ticker}
                    </p>

                    <div className = 'w-full p-0'/>
                    <p className = {`title-change text-[1.5vw] ${titlecard?.ChangePct && titlecard?.ChangePct[0] !== '-' ? 'text-green-600' : 'text-red-600'}`}>
                        {titlecard?.ChangePct && titlecard?.ChangePct[0] !== '-' ? '+' : ''}{
                        titlecard?.ChangePct
                        }%
                    </p>    
                    <div className = {`title-change text-[1.5vw] flex flex-row`}>
                        Today's Change: 
                        <p className={`${titlecard?.ChangePct && titlecard?.ChangePct[0] !== '-' ? 'text-green-600' : 'text-red-600'}`}>
                            {titlecard?.ChangePct && titlecard?.ChangePct[0] !== '-' ? ' +' : ' '}{titlecard?.ChangeInt}
                        </p> 
                    </div>

                </div>
        </motion.div>
    )
}

export default TitleCard