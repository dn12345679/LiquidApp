import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'

function CircleBackground({scrollYProgress, opacity, circleTopFrom, circleTopTo, circleLeftFrom, circleLeftTo} : {scrollYProgress: MotionValue, opacity: Array<number>
                                                        circleTopFrom: Array<Number>, circleTopTo: Array<Number>, 
                                                        circleLeftFrom: Array<Number>, circleLeftTo: Array<Number>
}) {
    const circlePosTop = { from: circleTopFrom,
      to: circleTopTo
    };
  
  const circlePosLeft = 
    { from: circleLeftFrom,
      to: circleLeftTo
    };

const opacityVal = useTransform(scrollYProgress, 
    [0, 0.6, 0.9], 
    opacity
  );
  
  const circle1Top = useTransform(scrollYProgress, [0, 0.5], [circlePosTop.from[0], circlePosTop.to[0]]);
  const circle1Left = useTransform(scrollYProgress, [0, 0.5], [circlePosLeft.from[0], circlePosLeft.to[0]]);

  const circle2Top = useTransform(scrollYProgress, [0, 0.5], [circlePosTop.from[1], circlePosTop.to[1]]);
  const circle2Left = useTransform(scrollYProgress, [0, 0.5], [circlePosLeft.from[1], circlePosLeft.to[1]]);

  const circle3Top = useTransform(scrollYProgress, [0, 0.5], [circlePosTop.from[2], circlePosTop.to[2]]);
  const circle3Left = useTransform(scrollYProgress, [0, 0.5], [circlePosLeft.from[2], circlePosLeft.to[2]]);

  const circle4Top = useTransform(scrollYProgress, [0, 0.5], [circlePosTop.from[3], circlePosTop.to[3]]);
  const circle4Left = useTransform(scrollYProgress, [0, 0.5], [circlePosLeft.from[3], circlePosLeft.to[3]]);

  const circle5Top = useTransform(scrollYProgress, [0, 0.5], [circlePosTop.from[4], circlePosTop.to[4]]);
  const circle5Left = useTransform(scrollYProgress, [0, 0.5], [circlePosLeft.from[4], circlePosLeft.to[4]]);
  
  return (
    <div id="homepage-bubble-bg" className="pointer-events-none w-screen h-screen" >

        <motion.div className="absolute w-[25vw] h-[25vw] bg-amber-50/20 rounded-full drop-shadow-xl flex" 
          style={{top: useTransform(circle1Top, (val) => `${val}vh`), left: useTransform(circle1Left, (val) => `${val}vw`), 
            opacity: opacityVal}}></motion.div>
        <motion.div className="absolute w-[40vw] h-[40vw] bg-amber-50/20 rounded-full drop-shadow-xl flex" 
          style={{top: useTransform(circle2Top, (val) => `${val}vh`), left: useTransform(circle2Left, (val) => `${val}vw`), 
            opacity: opacityVal}}></motion.div>
        <motion.div className="absolute w-[25vw] h-[25vw] bg-amber-50/20 rounded-full drop-shadow-xl flex" 
          style={{top: useTransform(circle3Top, (val) => `${val}vh`), left: useTransform(circle3Left, (val) => `${val}vw`), 
            opacity: opacityVal}}></motion.div>
        <motion.div className="absolute w-[30vw] h-[30vw] bg-amber-50/20 rounded-full drop-shadow-xl flex" 
          style={{top: useTransform(circle4Top, (val) => `${val}vh`), left: useTransform(circle4Left, (val) => `${val}vw`), 
            opacity: opacityVal}}></motion.div>
        <motion.div className="absolute w-[25vw] h-[25vw] bg-amber-50/20 rounded-full drop-shadow-xl flex" 
          style={{top: useTransform(circle5Top, (val) => `${val}vh`), left: useTransform(circle5Left, (val) => `${val}vw`), 
            opacity: opacityVal}}></motion.div>
      </div>
  )
}

export default CircleBackground;