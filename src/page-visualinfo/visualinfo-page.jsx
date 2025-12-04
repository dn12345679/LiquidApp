import { useState, useEffect, useRef } from 'react'
import { motion, stagger, useScroll, useTransform } from 'framer-motion'
import { Navbar, Logo, SearchBar, CircleBackground } from '../components';
import { Link, useLocation } from 'react-router-dom';
import { useParams, Navigate, useNavigate, Route } from 'react-router-dom';

import {TitleCard, PriceReport} from '../visualization-components/index'

import '../App.css'

function DisplayModelSimple({ticker}) {
    const today = new Date(Date.now())
    if (!ticker) {
        return <div>Loading...</div>;
    }
    const containerVariants = {
        hidden: {},
        show: {
            transition: {staggerChildren: 0.08, delayChildren: 0.07}
        }
    }
    const itemVariants = {
        hidden: {opacity: 0, y: 50, scale: 0.96},
        show: {opacity: 1, y: 0, scale: 1, transition: {duration: 0.5, ease: 'easeOut'}}
    }

    return(
        <section id="Simple-Model-Components" className="absolute">
            <motion.div
                className="grid grid-cols-3 gap-6 max-w[100vw] min-h-[110vh]"
                variants = {containerVariants}
                initial="hidden" 
                animate="show" 
                key={`simple-model-${ticker}`}
                >
                    <motion.div variants={itemVariants} layout>
                        <TitleCard ticker={ticker}/>
                    </motion.div>
                    <motion.div variants={itemVariants} layout>
                        <PriceReport ticker={ticker}/>
                    </motion.div>
                    
            </motion.div>
            

        </section>
       
    )
}


function VisualInfo() {
    const navigate = useNavigate()
    const location = useLocation()
    const [ticker, setTicker] = useState(null)

    const initialRGB = [185, 160, 113]
    const initialToRGB = [236, 238, 185]
    const initialRotate = "90deg";

    const finalRGB = [179, 160, 111]
    const finalToRGB = [236, 238, 185]
    const finalRotate = "360deg"

    // not actually used, its a required parameter
    const { scrollYProgress } = useScroll();
    

    useEffect(() => {
    if (!location.state?.id) {
        navigate('/');
        return;
    }
    setTicker(location.state.id);
    }, [location.state, navigate])


    // callback SearchBar.tsx
    function handleSearchSubmit(query = "AAPL"){
        console.log(query);
        // DONT FORGET TO HANDLE VALIDATION OF STOCK SEARCH
        navigate('/page-visualinfo', {state: {id:query}});

    }

    if (!ticker) {
        return <div>Redirecting...</div>;
    }

    return (
        <section id = "visualinfo" className = "w-full h-full overflow-y-scroll">
            <Link to="/" className='fixed left-5 z-10'>
                <Logo theme={0}></Logo> 
            </Link>
            <motion.div 
                key={`background-${ticker}`}
                className="w-screen h-screen flex-row fixed z-0  inset-0  min-w-dvw pointer-events-none"
                
                initial={{
                    background: 
                    `linear-gradient(${initialRotate}, rgb(${Math.round(initialRGB[0])}, ${Math.round(initialRGB[1])}, ${Math.round(initialRGB[2])}), 
                        rgb(${Math.round(initialToRGB[0])}, ${Math.round(initialToRGB[1])}, ${Math.round(initialToRGB[2])}))`
                    }}
                whileInView={{
                   background: 
                    `linear-gradient(${finalRotate}, rgb(${Math.round(finalRGB[0])}, ${Math.round(finalRGB[1])}, ${Math.round(finalRGB[2])}), 
                        rgb(${Math.round(finalToRGB[0])}, ${Math.round(finalToRGB[1])}, ${Math.round(finalToRGB[2])}))`
                    }}
                viewport={{once: true}}
                transition={{duration: 1,
                    ease: 'backInOut'
                }}
                    
            >   

                <CircleBackground  scrollYProgress={
                        scrollYProgress
                    } opacity={[1, 1, 1]} 
                    circleTopFrom={[15, 70, 73, 30, -10]}
                    circleTopTo={[15, 70, 73, 30, -10]}
                    circleLeftFrom={[-1, 15, 65, 80, 45]}
                    circleLeftTo={[-1, 15, 65, 80, 45]}/>
            </motion.div>
            <div className='pt-[9vh] pl-[2vw]'>
                <DisplayModelSimple key={ticker} ticker={ticker}/>
            </div>
            <motion.div className='fixed z-50 '
                initial = {{top: '0%'}}
                whileInView={{top: '35%'}}
                viewport={{once: true}}
                transition={{duration: 1,
                            ease: 'anticipate'
                }}>
                <SearchBar onSubmit={handleSearchSubmit} hintString='Anything else?'/>
            </motion.div>
        </section>


    )

}

export default VisualInfo