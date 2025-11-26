import Logo from "./logo";
import icon from "../assets/Hamburger_icon.svg.png";
import { useState } from "react";
import {AnimatePresence, motion } from "framer-motion"




function Navbar({currentSectionIndex}) {
    const [openState, setOpenState] = useState(true);

``
    return (
        <nav id="navbar" className={`fixed top-0 left-0 h-[9vh] z-999 ${openState ? "w-full" : "w-fit"}`}>
            <div id="navbar-top-background-box-white" className="absolute w-full h-full backdrop-blur-1xl bg-[#FFFFFF]/1
                    flex flex-row justify-around">
                <motion.button  whileTap={{scale: 0.95}} onClick={() => setOpenState(!openState)} className={`md:hover:cursor-pointer w-fit h-fit z-10 aboslute left-0 ${currentSectionIndex !== 0 ? "text-white" : "text-black"}`}>
                    <Logo></Logo>
                </motion.button>
                
                <AnimatePresence mode="wait">
                    {
                        openState && (
                            <motion.div
                                initial={{opacity: 0, x: "0vw"}}
                                animate={{opacity: 1, x: "0vw"}}
                                exit={{opacity: 0, x: "-100vw"}}
                                transition={{duration: 0.3}}
                                className = "flex-1">
                                <ul id="navbar-link-text-route" className="w-[50vw] h-full ml-[25vw] flex flex-col md:flex-row justify-around items-center absolute">
                                    <a href="#homepage-section-2" className={`navbar-text ${currentSectionIndex !== 0 ? "text-white md:hover:bg-[#0e1111]" : "text-black md:hover:bg-amber-100"}`}>
                                        <p>About</p>
                                    </a>
                                    <a href="#homepage-section-1" className={`navbar-text ${currentSectionIndex !== 0 ? "text-white md:hover:bg-[#0e1111]" : "text-black md:hover:bg-amber-100"}`}>
                                        <p >Home</p>
                                    </a>
                                    <a href="#homepage-section-3" className={`navbar-text ${currentSectionIndex !== 0 ? "text-white md:hover:bg-[#0e1111]" : "text-black md:hover:bg-amber-100"}`}>
                                        <p>Resources</p>
                                    </a>
                                </ul>
                            </motion.div>
                        )
                    }   

                </AnimatePresence>
                
                
                
            </div>
        </nav>
    )
}

export default Navbar