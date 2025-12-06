import {attachSpring, motion } from "framer-motion"
import '../App.css'
import { useState } from "react"
import guidejson from "../page-guide/guide-page-text.json" // important: make sure the json is readable 


// slide in animation
const SlideIn = ({children, delay = 0, duration = 0.5, className = ""}: any) => {
    return(
        <motion.div className={className}
                    initial = {{opacity: 0, y: 50}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: false, amount: 0.3,  margin: "-50px"}}
                    transition={{duration: duration, delay: delay, ease: "easeOut"}}>
                        {children}

        </motion.div>
    )
}


function List({title, chapters, selected, onSelect}: {title: String, chapters: String[], selected: number, onSelect?: (i: number) => void}) {

    return (
        <motion.div>
            <div className="text-white h-fit w-fit text-start  font-istok tracking-[10%]
                            ">
                <div>
                    <div className="text-[2rem]">{title}</div>
                </div>
                <motion.div className="border-l-2 border-amber-50 text-start p-3.5 pb-5 text-[150%] h-[300px] text-nowrap overflow-y-auto
                                overscroll-contain">
                    <SlideIn duration={0.8} delay={0.1}>
                        {chapters.map(text => (
                            <a key = {chapters.indexOf(text)} className="w-fit h-fit"
                                onClick={() => onSelect && onSelect(chapters.indexOf(text))}>
                                <div   className={`pb-5  ${chapters.indexOf(text) === selected ? 'underline decoration-2 underline-offset-8 pulse-custom' : ''}`}>
                                    <p className="md:hover:bg-amber-50 md:hover:text-black transition duration-300 w-fit 
                                                p-1 md:hover:rounded-md md:hover:cursor-pointer">{text}</p>
                                </div>
                            </a>
                            
                        ))}                                        
                    </SlideIn>

                </motion.div>
            </div>

        </motion.div>
    )
}

function MainTextPanel({text}: {text: String[] | undefined}) {
    return (
        <motion.div className="flex items-start justify-start overflow-y-auto mask-b-from-50% mask-b-to-110%">
            <div className="max-w-[70%] pb-[5vh] max-h-[60vh]">
                {
                    
                    text!.map((t,i) => (
                        <motion.div key={i} layoutRoot initial={{opacity: 0.0}} animate={{opacity: 1.0}} transition={{ease: "linear", layout: {duration: 0.3}}} className="text-[3vmin] text-left font-istok pb-20">{t}</motion.div>
                    ))
                    
                }

            </div>
        </motion.div>
    )
}
function TitleTextPanel({text}: {text: String}) {
    return (
        <div className="border-b">
            <p className="font-istok tracking-widest text-[3rem] text-start">
                {text}
            </p>
        </div>
    )
}

function GuidePage() {

    // 
    const [currentSelection, setCurrentSelection] = useState(0);  // changes what the current article is
    const [currentSubarticle, setCurrentSubarticle] = useState(0); // changes what the subarticle within the article is

    // d both at once when changing articles
    const changeArticle = (value: number) => {
        setCurrentSelection(value);
        setCurrentSubarticle(0); // reset
    }
    // simply grabs the json associated with current article selected
    const selectedArticleJson = guidejson.find(
        article => article["article-main-id"] === currentSelection
    )!; // i have this here because i am the owner of the json i know its not null i jus hate the error
    
    return (
        <div className = "relative h-screen w-screen flex overflow-hidden">
            <div id="GuideLeft" className="p-[13dvmin] ">
                <List title="Articles" chapters={guidejson.map(article => article["main-article"])} selected={currentSelection} onSelect={changeArticle}></List>
            </div>
            <div id="GuideCenter" className = "flex-col w-full pt-25">
                <div className = "relative pb-[10%] left-auto">
                    <SlideIn duration={0.8} delay = {0.5}>
                        <TitleTextPanel text={selectedArticleJson["main-article"]}></TitleTextPanel>
                    </SlideIn>
                </div>
                <div className="left-auto right-auto flex-column items-start justify-start overflow-y-hidden text-white">
                    <MainTextPanel 
                        text=
                        {
                            selectedArticleJson["sub-articles"].find(
                                sub => sub["article-id"] === currentSubarticle
                            )!.content
                        }>
                    </MainTextPanel>
                </div>
            </div>

            <div id="GuideRight" className="right-0 p-[13dvmin] w-fit">
                <List title="Contents" chapters={
                    guidejson.find(article => article["article-main-id"] === currentSelection)?.["sub-articles"].map(sub => sub.subarticle) || []
                }
                selected={currentSubarticle}
                onSelect={setCurrentSubarticle}>
                </List>

            </div>

        </div>
    )
}
export default GuidePage;