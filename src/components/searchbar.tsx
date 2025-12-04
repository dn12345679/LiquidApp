'use client'
import { FormEvent, useState} from 'react';
import {BrowserRouter, createBrowserRouter, Link, Route, RouterProvider, Routes, useNavigate} from 'react-router-dom';
import {ROUTES} from '../routes.ts'; // make sure to update this import if routes change
import VisualInfo from '../page-visualinfo/visualinfo-page.jsx';
import {RecommendSearch} from "./index.ts"
import {motion} from "framer-motion"


// !important: make sure to have onSubmit implemented in parent script
function SearchBar({onSubmit, hintString = "What are you interested in today?"} : {onSubmit: any, hintString: string}){
    const [searchQuery, setSearchQuery] = useState("Null");

    const hasText = !!searchQuery.trim().length;
    
    //
    const handleSubmit = (e: FormEvent | null) => {
        e?.preventDefault(); // stop page refresh
        onSubmit(searchQuery); // lift state
    }

    


    return (
        <motion.div className='relative origin-center w-fit h-fit flex flex-col justify-center items-center left-[50vw] top-[50vh]'>
            <div className="origin-center items-center justify-between w-[39vw] h-[10vh] bg-white/52 transform -translate-x-1/2 rounded-[50px] drop-shadow-lg backdrop-blur-lg
                            flex flex-row z-999">
                <form onSubmit={handleSubmit} className="w-full h-full rounded-[50px] flex items-center justify-between">
                    <label className="text-[1.0vw] ml-[5%] h-full w-[70%] tracking-wide text-black text-left flex justify-center">
                        <input id="search-query-box" type="search"  
                                    className='w-full outline-none'
                                    placeholder={hintString}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault(); // prevents form submission if in a form
                                            handleSubmit(null)
                                        }
                                    }}
                        />
                    </label>
                        

                    <button className="h-[50%] w-[10%] text-black text-[1.0vw] bg-amber-600 rounded-full drop-shadow-lg mr-[5%]
                            md:enabled:cursor-pointer
                            md:enabled:hover:bg-amber-500
                            enabled:opacity-100
                            disabled:opacity-55
                            " 
                            tabIndex={0}
                            disabled={!(hasText)}
                            type="submit"
                            >$ 
                    </button>
                </form>
            </div>
            <RecommendSearch ticker={searchQuery}></RecommendSearch>
        </motion.div>


 
    )
    
}

export default SearchBar;