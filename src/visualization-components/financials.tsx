import { motion, useScroll, useTransform } from 'framer-motion'
import '../App.css'
import './vcomp.css'
import { ReactNode,useState,  useEffect } from 'react';
import { CardSlide, CardReset, ColorblindSafePaletteTrue } from '.';
import { label, p, title } from 'motion/react-client';

interface FinancialData {
    "Total Revenue": number, 
    "Cost Of Revenue": number, 
    "Gross Profit": number, 
    "Operating Expense": number, 
    "Operating Income": number, 
    "Net Income": number
}

function Financials({ticker} :{ticker: string}) {
    const [financials, setFinancials] = useState<Array<FinancialData> | null>(null);
    const interest = ['Total Revenue', 'Cost Of Revenue', 'Gross Profit', 'Operating Expense', 'Operating Income', 'Net Income']
    useEffect(() => {
        async function getFinancials(ticker: string) {
            const res = await fetch(`/api/financials?ticker=${encodeURIComponent(ticker)}`)
            
            if (!res.ok) {
                throw new Error("Failed to fetch info financials");
            }
            const data = await res.json()
            setFinancials(data);
        } 
        getFinancials(ticker)
    }, [ticker])

    return (
        <motion.div className='w-[30vw] h-fit box-simple font-istok text-black tracking-wider transition-all' onMouseMove={(e) => 
                {CardSlide(e)}}
            onMouseLeave={(e) => {
                {CardReset(e)}
            }}>
                <motion.div className = "flex flex-col w-full h-full items-center justify-between font-istok text-[2vh]">
                    <div className="pt-5 text-[3vh]"> Quarterly Financials, Most Recent</div>
                {
                    financials ? 
                        interest.map((value, i) => (
                            <div key={i} className="flex flex-row w-full justify-between"> 
                                <div className="p-5">
                                    {interest[i]}
                                </div>
                                <div className="p-5">
                                    ${financials![i][interest[i] as keyof FinancialData] || "N/A"} 
                                </div>
                            </div>
                        )) : 
                        <div className="font-istok text-[2vh]"> Not reported for Previous Quarter</div>
                }
                </motion.div>

        </motion.div>
    )
}

export default Financials