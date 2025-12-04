import { motion, useScroll, useTransform } from 'framer-motion'
import '../App.css'
import './vcomp.css'
import { ReactNode,useState,  useEffect } from 'react';
import { CardSlide, CardReset } from '.';
import { p } from 'motion/react-client';


interface PriceReportProps {
    Open?: string; 
    Close?: string;
    High?: string;
    Low?: string;
    Volume?: string;

    Weekday?: string; // day of the week
    Date?: string; // date in a year
}

function PriceReport({ticker} : {ticker: string}) { 
     const [priceReport, setPriceReport] = useState<Array<PriceReportProps> | null>(null);
    useEffect(() => {
    async function get5day(ticker: string) {
        const res = await fetch(`/api/fivedayreport?ticker=${encodeURIComponent(ticker)}`);

        if (!res.ok) {
            throw new Error("Failed to fetch info");
        }
        const data: Array<PriceReportProps> = await res.json();
        setPriceReport(data);
    }
    get5day(ticker)
    }, [ticker])

    return (
        <motion.div className='w-[40vw] h-[80vh] box-simple font-istok text-black tracking-wider transition-all'onMouseMove={(e) => 
                {CardSlide(e)}}
            onMouseLeave={(e) => {
                {CardReset(e)}
            }}>
                <div id="price-report-title" className='pt-10 text-[3vh]'>
                    <p>Price Report</p>
                </div>
                <div id="price-report-header" className='pt-8 text-[2vh] flex flex-row justify-around'>
                    {priceReport && priceReport.map((entry, index) => (
                        <div key={index}> {entry.Weekday} - {entry.Date} </div>))}
                </div>

        </motion.div>
    )

} 

export default PriceReport;