import { useEffect, useState } from "react";
import {motion} from "framer-motion"

function RecommendSearch({ticker, setQuery}) {
    const [top5results, setTop5results] = useState([]);
    
    // get top 5 sorted recommendations
    async function getRecommended(ticker) {
        const res = await fetch(`/api/validate?ticker=${encodeURIComponent(ticker)}`);
        
        if (!res.ok) {
            throw new Error("Failed to fetch info");
        }
        const data = await res.json();
        return data;
    }

    // continuous update 
    useEffect(() => {
        async function fetchFromValidation() {
            try {
                const data = await getRecommended(ticker);
                
                if (data && Array.isArray(data.matches)) {
                    setTop5results(data.matches);
                } else {
                    setTop5results([]);
                }
            } catch (error) {
                console.error("idk something happened", error)
                setTop5results([]);
            }
        }
        fetchFromValidation();
    }, [ticker]);

    

    return (
        <motion.div className="transition-all  h-fit ">
            {
                top5results.map((result, i) => (
                    <motion.div 
                        key={result.Symbol}
                        initial={{opacity: 0, scale: 0}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.5, delay: i * 0.1}}
                        className="w-[20vw] h-[5vh] font-istok text-black 
                                    text-center border-2 rounded-lg
                                    bg-amber-50/40 flex flex-row items-center justify-start
                                    hover:scale-95 transition-all hover:cursor-pointer"
                        layout>
                            <div className="h-fit w-fit font-istok tracking-wide text-[20px] p-1 wrap-break-word whitespace-nowrap overflow-x-hidden"
                                onClick={() => setQuery(result.Symbol)}>
                                {result.Symbol} - {result["Security Name"] }
                            </div> 
                    </motion.div>
                ))
            }
        </motion.div>
    )
}

export default RecommendSearch;