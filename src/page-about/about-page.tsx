import { useEffect, useRef, useState } from "react";
import { SearchBar } from "../components"
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
import { image } from "motion/react-client";


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
    <div className="overflow-hidden tracking-widest whitespace-nowrap flex flex-nowrap truncate">
        <motion.div className="text-[5rem] whitespace-nowrap flex flex-nowrap" style = {{x}}>
            <span className='mx-8'>{children} </span>
            <span className='mx-8'>{children} </span>
            <span className='mx-8'>{children} </span>
            <span className='mx-8'>{children} </span>
            <span className='mx-8 pb-3'>{children} </span>
        </motion.div>

    </div>
  )
}

function caption({text}: {text: string}) {
  return (
    <div className="w-[0.5vw] h-[0.2vh]">
      <p>
        {text}
      </p>
    </div>
  )
}

function PeriodicNumber(min: number, curr: number, max: number) {
  if (curr + 1 >= max) {
    curr = min;
    return curr;
  }
  return curr + 1;
}

function AboutPage(){
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPageFocused, setIsPageFocused] = useState(true);
  const textContent = ["Graphics", "Analysis", "Current"]

  useEffect(() => {
    const handleFocus = () => setIsPageFocused(true);
    const handleBlur = () => setIsPageFocused(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    if (!isPageFocused) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => PeriodicNumber(0, prev, imageContent.length));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPageFocused]);
  const imageContent = [
    ["/5day.png","/sentimentanal.png"],
    ["/pricereport.png"],
    ["/title.png", "/searchmodels.png"]
  ]
  const customScale = [
    [1, 1.3],
    [2],
    [2.0, 2.0]
  ]
  const customOpacities = [
    [0.7, 0.9],
    [0.9],
    [0.7, 0.9]
  ]
  const text = [
    "Explore various visualizations using live data from Yahoo Finance!", 
    "Fetch current data for the week displayed on a formatted table!",
    "Clean up-to-date information, with various options for models!"
  ]

    return(
        <div className="relative h-screen w-screen z-[-1] flex-row flex justify-start items-start">
            <div className="origin-bottom-left absolute bottom-[90vh] rotate-90 font-istok h-fit w-[90vh] mask-l-from-60% mask-l-to-100% mask-r-from-60% mask-r-to-100%">
                {
                  textContent.map((t, i) => (
                    currentSlide === i && <ParallaxText key={i} baseVelocity={-5}>{t}</ParallaxText>
                  ))
                }
                
            </div>
            <motion.section className="h-screen w-screen flex items-center justify-center">
              <motion.ul className="scale-[0.7] h-fit w-fit mask-b-from-60% mask-b-to-100% drop-shadow-zinc-950">
                {
                  imageContent.map((item, i) => (
                    currentSlide === i && 
                    <AnimatePresence mode = "wait" key = {i}>
                      <motion.li 
                        key = {i}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }} 
                        className="h-screen w-screen flex flex-col">
                          
                        {imageContent[currentSlide].map((item, j) => (
                          <img key = {j} src={item} alt="Example" className={`absolute inline left-0 drop-shadow-2xl`}
                          style={{transform: `translateX(${j * 30}vw) translateY(${j * 20}vh)`, scale: `${customScale[i][j]}`, opacity: customOpacities[i][j]}}/>
                        ))}
                        

                      </motion.li>    
                    </AnimatePresence>
                
                  ))
                }
              </motion.ul>
              <div className="absolute inline bottom-[5vh] font-istok text-[5vh]"> {text[currentSlide]} </div>
            </motion.section>
            
            <motion.button>
              
            </motion.button>
        </div>
    )
}

export default AboutPage