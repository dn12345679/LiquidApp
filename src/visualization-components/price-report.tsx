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

                <table id="price-report-table" className='w-[60vw] h-full mt-6 flex flex-col items-start table-fixed border-collapse'>
                    <tbody className='w-full h-fit flex flex-col justify-between text-[2.5vh]'>
                        <tr className='w-full flex flex-row justify-between pb-[7vh]'>
                            <td className='font-bold px-4 w-1/6'>Date</td>
                                {priceReport && priceReport.map((entry, index) => (
                                <th className="w-fit px-8" key={index}> {entry.Weekday} - {entry.Date} </th>))}
                        </tr>
                        <tr className='w-full flex flex-row justify-between pb-[7vh]'>
                            <td className='font-bold px-4 w-1/6'>Open</td>
                            {priceReport && priceReport.map((entry, index) => (
                                <td className="px-8 w-1/6 text-[2vh]" key={index}> ${entry.Open} </td>))}
                        </tr>
                        <tr className='w-full flex flex-row justify-between pb-[7vh]'>
                            <td className='font-bold px-4 w-1/6'>Close</td>
                            {priceReport && priceReport.map((entry, index) => (
                                <td className="px-8 w-1/6 text-[2vh]" key={index}> ${entry.Close} </td>))}
                        </tr>
                        <tr className='w-full flex flex-row justify-between pb-[7vh]'>
                            <td className='font-bold px-4 w-1/6'>High</td>
                            {priceReport && priceReport.map((entry, index) => (
                                <td className="px-8 w-1/6 text-[2vh]" key={index}> ${entry.High} </td>))}
                        </tr>
                        <tr className='w-full flex flex-row justify-between pb-[7vh]'>
                            <td className='font-bold px-4 w-1/6'>Low</td>
                            {priceReport && priceReport.map((entry, index) => (     
                            <td className="px-8 w-1/6 text-[2vh]" key={index}> ${entry.Low} </td>))}
                        </tr>
                        <tr className='w-full flex flex-row justify-between'>
                            <td className='font-bold px-4 w-1/6'>Volume</td>
                            {priceReport && priceReport.map((entry, index) => (
                                <td className="px-8 w-1/6 text-[2vh]" key={index}> {entry.Volume} </td>))}
                        </tr>
                        
                    </tbody>
                    
                </table>

        </motion.div>
    )

} 

export default PriceReport;