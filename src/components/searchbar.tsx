'use client'
import { FormEvent, SetStateAction, use, useState} from 'react';
import {BrowserRouter, createBrowserRouter, Link, Route, RouterProvider, Routes, useNavigate} from 'react-router-dom';
import {ROUTES} from '../routes.ts'; // make sure to update this import if routes change
import VisualInfo from '../page-visualinfo/visualinfo-page.jsx';
import {RecommendSearch} from "./index.ts"
import {motion} from "framer-motion"


// !important: make sure to have onSubmit implemented in parent script
function SearchBar({onSubmit, hintString = "What are you interested in today?"} : {onSubmit: any, hintString: string}){
    const [searchQuery, setSearchQuery] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    let [model, setModel] = useState('Simple');

    let models = [
        {label: 'Simple Model', value: 'Simple'},
        {label: 'Standard Model', value: 'Standard'},
        {label: 'Advanced Model', value: 'Advanced'},
    ]

    let handleModelChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setModel(e.target.value);
    }


    async function getValidation(ticker: string) {
        const res = await fetch(`/api/legal?ticker=${encodeURIComponent(ticker)}`);
        console.log(res);
        if (!res.ok) {
            throw new Error("Failed to fetch info");
        }
        const data = await res.json();
        return data;
    }


    const setAndCheck = async (query: string) => {
        setSearchQuery(query);
        setIsValidating(true);
        try {
            const result = await getValidation(query);
            setIsValid(result.valid);
        } catch (error) {
            setIsValid(false);
        } finally {
            setIsValidating(false);
        }
    }

    const hasText = !!searchQuery.trim().length;
    const buttonDisabled = !hasText || isValidating || !isValid;
    const handleSubmit = async (e: FormEvent | null) => {
        e?.preventDefault(); // stop page refresh
        try {
            const result = await getValidation(searchQuery);
            if (result.valid ) {
                
                onSubmit(searchQuery, model); // lift state
            }
            else {
                console.log("Nope!");

            }
        } catch (error) {
            console.error("error!", error);
        } 
    }

    return (
        <motion.div className='relative w-fit h-fit flex flex-col justify-center items-center left-[50vw] top-[50vh]'>
            <div className="origin-center items-center justify-between w-[39vw] h-[10vh] bg-white/52 transform -translate-x-1/2 rounded-[50px] drop-shadow-lg backdrop-blur-lg
                            flex flex-row z-999">
                <form onSubmit={handleSubmit} className="w-full h-full rounded-[50px] flex items-center justify-between">
                    <label className="text-[1.0vw] ml-[5%] h-full w-[70%] tracking-wide text-black text-left flex justify-center">
                        <input id="search-query-box" type="text" name="search"  autoComplete='off'
                                    className='w-full outline-none'
                                    placeholder={hintString}
                                    onChange={(e) => setAndCheck(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault(); // prevents form submission if in a form
                                            handleSubmit(null)
                                        }
                                    }}
                                    value={searchQuery}
                        />
                    </label>
                    
                    <select onChange={handleModelChange} className="text-[1.0vw] font-istok text-black bg-transparent">
                        <option value="Simple" disabled selected className='text-[1.0vw] font-istok text-black'> Model </option>
                        {models.map((mod, i) => (
                            <option key={mod.value} value={mod.value} className='text-[1.0vw] '>
                                <p className='font-istok text-black'> {mod.label}</p>
                            </option>
                        ))}
                    </select>

                    <button className="h-[50%] w-[10%] text-black text-[1.0vw] bg-amber-600 rounded-full drop-shadow-lg mr-[5%]
                            md:enabled:cursor-pointer
                            md:enabled:hover:bg-amber-500
                            enabled:opacity-100
                            disabled:opacity-55
                            " 
                            tabIndex={0}
                            disabled={buttonDisabled}
                            type="submit"
                            >$ 
                    </button>

                </form>
            </div>
            <div className="origin-center -translate-x-8/9 ">
                <RecommendSearch ticker={searchQuery} setQuery={setAndCheck}></RecommendSearch>
            </div>
            
        </motion.div>


 
    )
    
}

export default SearchBar;