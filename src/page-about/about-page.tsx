import { useRef, useState } from "react";
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
        <motion.div className="text-[5rem] whitespace-nowrap flex flex-nowrap" style = {{x}}>
            <span>{children} </span>
            <span>{children} </span>
            <span>{children} </span>
            <span>{children} </span>
            <span>{children} </span>
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

function AboutPage(){
  const [currentSlide, setCurrentSlide] = useState(0);
  const textContent = ["Graphics", "Analysis", "Current"]
  const imageContent = ["./src/assets/example_image.jpg", "./src/assets/example_image2.jpg", "./src/assets/example_image3.webp"]

    return(
        <div className="relative h-screen w-screen z-[-1] flex-row flex justify-start items-start">
            <div className="origin-bottom-left absolute bottom-[90vh] rotate-90 font-istok h-fit w-[90vh] mask-l-from-60% mask-l-to-100% mask-r-from-60% mask-r-to-100%">
                {
                  textContent.map((t, i) => (
                    currentSlide === i && <ParallaxText key={i} baseVelocity={-5}>{t}</ParallaxText>
                  ))
                }
                
            </div>
            <motion.section className="absolute h-screen w-screen flex items-center justify-center">
              <motion.ul className="scale-[0.5] h-fit w-fit mask-b-from-60% mask-b-to-100% drop-shadow-zinc-950">
                {
                  imageContent.map((item, i) => (
                    currentSlide === i && 
                    <AnimatePresence mode = "wait" key = {i}>
                      <motion.li 
                        key = {i}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}>
                        <img src={item} alt="Example" />
                      </motion.li>    
                    </AnimatePresence>
                
                  ))
                }
              </motion.ul>
            </motion.section>
            <motion.button>
              
            </motion.button>
        </div>
    )
}

export default AboutPage