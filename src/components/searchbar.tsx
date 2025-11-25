'use client'
import { FormEvent, useState} from 'react';


async function runModel(ticker: string) {
    const res = await fetch(`/api/run?ticker=${encodeURIComponent(ticker)}`);
    if (!res.ok) {
        throw new Error("Failed to fetch info");
    }
    const data = await res.json();
    console.log(data)
    return data;
}

function SearchBar(){
    const [searchQuery, setSearchQuery] = useState("");

    const hasText = !!searchQuery.trim().length;
    
    // request from api
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // stop page refresh
        runModel(searchQuery)
    }

    return (
<div className="relative origin-center items-center justify-between w-[39vw] h-[10vh] bg-white/52 left-[50vw] transform -translate-x-1/2 top-[50vh] rounded-[50px] drop-shadow-lg backdrop-blur-lg
                        flex flex-row ">
            <form onSubmit={handleSubmit} className="w-full h-full rounded-[50px] flex items-center justify-between">
                <label className="text-[1.0vw] ml-[5%] h-full w-[70%] tracking-wide text-black text-left flex justify-center">
                    <input id="search-query-box" type="search"  
                                className='w-full outline-none'
                                placeholder="What are you interested in today?"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault(); // prevents form submission if in a form
                                        runModel(searchQuery);
                                    }
                                }}
                    />
                </label>

                {/* Submit button */}
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
    )
    
}

export default SearchBar;