import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SearchBar, Navbar, CircleBackground } from './components'
import AboutPage from './page-about/about-page'
import GuidePage from './page-guide/guide-page'
import './App.css'
import { Navigate, useNavigate, Route } from 'react-router-dom'



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
      <CircleBackground scrollYProgress={scrollYProgress} opacity={[1, 1, 0]}
                        circleTopFrom={[15, 70, 73, 30, -10]} circleTopTo={[0, 87, 65, 11, -13]}
                        circleLeftFrom={[-1, 15, 65, 80, 45]} circleLeftTo={[-7, 0, 70, 90, 33]}/>
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


 

 
  // callback SearchBar.tsx
  function handleSearchSubmit(query = "Test"){
    console.log(query);
    

    // DONT FORGET TO HANDLE VALIDATION OF STOCK SEARCH
    navigate('/page-visualinfo', {state: {id:query}});

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
