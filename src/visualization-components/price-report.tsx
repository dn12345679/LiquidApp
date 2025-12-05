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
        <motion.div className='w-full h-[80vh] box-simple font-istok text-black tracking-wider transition-all'onMouseMove={(e) => 
                {CardSlide(e)}}
            onMouseLeave={(e) => {
                {CardReset(e)}
            }}>
                <div id="price-report-title" className='pt-10 text-[3vh]'>
                    <p>Price Report</p>
                </div>

                <table id="price-report-table" className='w-[60vw] h-full mt-6 flex flex-col items-start table-fixed'>
                    <thead id="price-report-header" className='pt-8 text-[2vh] flex flex-row justify-between w-full h-fit px-30'>
                        <tr className = 'w-full text-[2.5vh]'>
                                                                                                                                                
                                {priceReport && priceReport.map((entry, index) => (
                                <th className="w-fit px-8" key={index}> {entry.Weekday} - {entry.Date} </th>))}
                        </tr>
                    </thead>
                    <tbody className='w-fit h-full pl-10 flex flex-col text-[2vh]'>
                        <tr>
                            <td className='pb-20 pt-10 flex flex-row'>
                                <div>Open</div>
                                <div className='w-fit pl-16 flex flex-row items-center justify-center'>
                                    {priceReport && priceReport.map((entry, index) => (
                                    <div className="pr-27" key={index}> <div> {entry.Open} </div> </div>))}
                                </div>
                            </td>
                            
                        </tr>
                        <tr>
                            <td className='pb-20 flex flex-row'>
                                <div>Close</div>
                                <div className='w-fit pl-14 flex flex-row items-center justify-center'>
                                    {priceReport && priceReport.map((entry, index) => (
                                    <div className="pr-27" key={index}> <div> {entry.Close} </div> </div>))}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='pb-20 flex flex-row'>
                                <div>High</div>
                                <div className='w-fit pl-20 flex flex-row items-center justify-center'>
                                    {priceReport && priceReport.map((entry, index) => (
                                    <div className="pr-27" key={index}> <div> {entry.High} </div> </div>))}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='pb-20 flex flex-row'>
                                <div>Low</div>
                                <div className='w-fit pl-22 flex flex-row items-center justify-center'>
                                    {priceReport && priceReport.map((entry, index) => (
                                    <div className="pr-27" key={index}> <div> {entry.Low} </div> </div>))}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='pb-20 flex flex-row'>
                                <div>Volume</div>
                                <div className='w-fit pl-10 flex flex-row items-center justify-center'>
                                    {priceReport && priceReport.map((entry, index) => (
                                    <div className="pr-27" key={index}> <div> {entry.Volume} </div> </div>))}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    
                </table>

        </motion.div>
    )

} 

export default PriceReport;