import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Navbar, Logo, SearchBar } from '../components';
import { Link } from 'react-router-dom';

import {TitleCard} from '../visualization-components/index'

import '../App.css'

function DisplayModelSimple() {
    return(
        <section id="Simple-Model-Components" className="pl-[20%]">
            <TitleCard ></TitleCard>
        </section>
       
    )
}


function VisualInfo() {

    const fromR  = 179;
    const fromG =  160;
    const fromB =   111;

    const toR = 236
    const toG = 238
    const toB =  185

    const rotateVal = "360deg";

    return (
        <section id = "visualinfo" className = "w-full h-full overflow-y-scroll">
            <Link to="/">
                <Logo theme={0}></Logo>
            </Link>
            <motion.div className="w-screen h-screen flex-row" style={{
                background: 
                    `linear-gradient(${rotateVal}, rgb(${Math.round(fromR)}, ${Math.round(fromG)}, ${Math.round(fromB)}), 
                        rgb(${Math.round(toR)}, ${Math.round(toG)}, ${Math.round(toB)}))`
                    
            }}>
                {
                    DisplayModelSimple()
                }
                <div className='absolute bottom-[60%]'>
                    <SearchBar hintString='Anything else?'/>
                </div>
            </motion.div>
            
        </section>


    )

}

export default VisualInfo