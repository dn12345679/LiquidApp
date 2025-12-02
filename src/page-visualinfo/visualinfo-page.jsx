import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Navbar, Logo, SearchBar, CircleBackground } from '../components';
import { Link, useLocation } from 'react-router-dom';
import { useParams, Navigate, useNavigate, Route } from 'react-router-dom';

import {TitleCard} from '../visualization-components/index'

import '../App.css'

function DisplayModelSimple({ticker}) {
    const today = new Date(Date.now())

    async function runModel(ticker) {
        const res = await fetch(`../api/validate?ticker=${encodeURIComponent(ticker)}`);
        
        if (!res.ok) {
            throw new Error("Failed to fetch info");
        }
        const data = await res.json();
        console.log(data)
        return data;
    }
    runModel("MSFT");

    return(
        <section id="Simple-Model-Components" className="absolute">
            <TitleCard name={ticker} price={124.5} change={-0.05}
                        date={today.getDate()} model={"Simple"}/>

        </section>
       
    )
}


function VisualInfo() {
    const navigate = useNavigate()
    const location = useLocation()

    const initialRGB = [185, 160, 113]
    const initialToRGB = [236, 238, 185]
    const initialRotate = "90deg";

    const finalRGB = [179, 160, 111]
    const finalToRGB = [236, 238, 185]
    const finalRotate = "360deg"

    // not actually used, its a required parameter
    const { scrollYProgress } = useScroll();
    
    // callback SearchBar.tsx
    function handleSearchSubmit(query = "Test"){
        console.log(query);
        // DONT FORGET TO HANDLE VALIDATION OF STOCK SEARCH
        navigate('/page-visualinfo', {state: {id:query}});

    }

    return (
        <section id = "visualinfo" className = "w-full h-full overflow-y-scroll">
            <Link to="/" className='fixed left-5 z-10'>
                <Logo theme={0}></Logo> 
            </Link>
            <motion.div className="w-screen h-screen flex-row fixed z-0  inset-0  min-w-dvw pointer-events-none"
                
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
                {
                    DisplayModelSimple({ticker:location.state.id})
                }
            </div>
            <motion.div className='fixed z-50 '
                initial = {{top: '0%'}}
                whileInView={{top: '30%'}}
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