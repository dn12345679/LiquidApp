import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SearchBar, Navbar } from './components'
import AboutPage from './page-about/about-page'
import GuidePage from './page-guide/guide-page'
import './App.css'
import { Navigate, useNavigate, Route } from 'react-router-dom'
import { ROUTES } from './routes'
import VisualInfo from './page-visualinfo/visualinfo-page'

/*
  Handles background element transitioning
*/
function AppBackground({scrollYProgress}) {
  const gradients = [
    { from: [185, 160, 113], to: [236, 238, 185] },
    { from: [0, 0, 0], to: [179, 153, 111] },
    { from: [0, 0, 0], to: [91, 75, 46] },
  ];
  const rotateVal = useTransform(scrollYProgress, 
    [0, 0.75, 0.76, 1], 
    ["90deg", "90deg", "180deg", "180deg"]
  );

  const opacityVal = useTransform(scrollYProgress, 
    [0, 0.6, 0.9], 
    [1, 1, 0]
  );

  const fromR = useTransform(scrollYProgress, [0, 0.5, 1], 
    [gradients[0].from[0], gradients[1].from[0], gradients[2].from[0]]);
  
  const fromG = useTransform(scrollYProgress, [0, 0.5, 1], 
    [gradients[0].from[1], gradients[1].from[1], gradients[2].from[1]]);
  
  const fromB = useTransform(scrollYProgress, [0, 0.5, 1], 
    [gradients[0].from[2], gradients[1].from[2], gradients[2].from[2]]);
  
  const toR = useTransform(scrollYProgress, [0, 0.5, 1], 
    [gradients[0].to[0], gradients[1].to[0], gradients[2].to[0]]);
  
  const toG = useTransform(scrollYProgress, [0, 0.5, 1], 
    [gradients[0].to[1], gradients[1].to[1], gradients[2].to[1]]);
  
  const toB = useTransform(scrollYProgress, [0, 0.5, 1], 
    [gradients[0].to[2], gradients[1].to[2], gradients[2].to[2]]);

  const circlePosTop = 
    { from: [15, 70, 73, 30, -10],
      to: [0, 87, 65, 11, -13]
    };
  
  const circlePosLeft = 
    { from: [-1, 15, 65, 80, 45],
      to: [-7, 0, 70, 90, 33]
    };
  
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
  return(
    <motion.div 
      className="fixed inset-0 h-screen min-w-dvw -z-10 pointer-events-none"
      style={{
        background: useTransform(
          [fromR, fromG, fromB, toR, toG, toB, rotateVal],
          ([fr, fg, fb, tr, tg, tb, rot]) => 
            `linear-gradient(${rot}, rgb(${Math.round(fr)}, ${Math.round(fg)}, ${Math.round(fb)}), rgb(${Math.round(tr)}, ${Math.round(tg)}, ${Math.round(tb)}))`
        )
      }}
    >
      <div id="homepage-bubble-bg" className="pointer-events-none">

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
    </motion.div>
  )
}


function App() {
  const sectionsRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { scrollYProgress } = useScroll();
  

  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = sectionsRef.current.indexOf(entry.target)
            setCurrentPage(sectionIndex)
          }
        })
      },
      { threshold: 0.5 } 
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  async function runModel(ticker) {
      const res = await fetch(`/api/run?ticker=${encodeURIComponent(ticker)}`);
      if (!res.ok) {
          throw new Error("Failed to fetch info");
      }
      const data = await res.json();
      console.log(data)
      return data;
  }
 
  // callback SearchBar.tsx
  const handleSearchSubmit = (query) => {
    console.log(query);

    // DONT FORGET TO HANDLE VALIDATION OF STOCK SEARCH
    navigate('/page-visualinfo');

  }

  return (
    
    <div id="homepage" className="overflow-x-clip absolute ">
      
      <AppBackground scrollYProgress={scrollYProgress}/>
      
      <div className="relative">
        
        <div id="nav-main" className="h-fit w-fit">
            <Navbar currentSectionIndex={currentPage}/>
        </div>
        
        <div id="section-content" >
          <motion.div ref={(el) => (sectionsRef.current[0] = el)} id="homepage-section-1" 
                className='section h-screen min-w-dvw [scroll-snap-align:start_end] snap-normal'>
            <SearchBar onSubmit={handleSearchSubmit}/>      
          </motion.div>
          <motion.div  ref={(el) => (sectionsRef.current[1] = el)} id="homepage-section-2" 
                className='section h-screen min-w-dvw [scroll-snap-align:start_end] snap-normal pb-50'>
            <div className='h-fit [scroll-snap-align:start_end]'>
              <AboutPage/>
            </div>
            
          </motion.div>
          <motion.div ref = {(el)=> (sectionsRef.current[2] = el)} id = "homepage-section-3" 
                className = 'section h-screen min-w-dvw [scroll-snap-align:start_end] snap-normal pb-50'>
            <div className='h-screen [scroll-snap-align:start_end]'>
              <GuidePage/>
            </div>

          </motion.div>
        </div>
      </div>
      
    </div>
  )
}
export default App
