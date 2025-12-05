import { motion, useScroll, useTransform } from 'framer-motion'
import '../App.css'
import './vcomp.css'
import { ReactNode,useState,  useEffect } from 'react';
import { CardSlide, CardReset } from '.';
import { label, p } from 'motion/react-client';


// https://github.com/reactchartjs/react-chartjs-2/blob/master/sandboxes/bar/vertical/App.tsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { data } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


interface PriceReportProps {
    Open?: string; 
    Close?: string;
    High?: string;
    Low?: string;
    Volume?: string;

    Weekday?: string; // day of the week
    Date?: string; // date in a year
}

function Graph5Day({ticker}: {ticker: string}) {
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

    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: '5-Day Price Movement',
        },
        },
    };

    const labels = priceReport ? priceReport.map(entry => `${entry.Weekday} ${entry.Date}`) : [];
    
    const data = {
        labels,
        datasets: [
        {
            label: 'Open Price',
            data: priceReport ? priceReport.map(entry => parseFloat(entry.Open || '0')) : [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Close Price',
            data: priceReport ? priceReport.map(entry => parseFloat(entry.Close || '0')) : [],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'High Price',
            data: priceReport ? priceReport.map(entry => parseFloat(entry.High || '0')) : [],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
            label: 'Low Price',
            data: priceReport ? priceReport.map(entry => parseFloat(entry.Low || '0')) : [],
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
        }
        ],
    } 


    return (
        <motion.div className='w-[90vw] h-[90vh] box-standard font-istok text-black tracking-wider transition-all'onMouseMove={(e) => 
                {CardSlide(e)}}
            onMouseLeave={(e) => {
                {CardReset(e)}
            }}>
                <Bar options={options} data={data} className='m-10'/>

        </motion.div>
        
    );
}

export default Graph5Day;