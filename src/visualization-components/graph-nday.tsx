import { motion, number, useScroll, useTransform } from 'framer-motion'
import '../App.css'
import './vcomp.css'
import { ReactNode,useState,  useEffect } from 'react';
import { CardSlide, CardReset, ColorblindSafePaletteTrue } from '.';
import { label, p } from 'motion/react-client';


// https://github.com/reactchartjs/react-chartjs-2/blob/master/sandboxes/bar/vertical/App.tsx
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';


ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
  LineController,
  BarController
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

function GraphNDay({ticker}: {ticker: string}) {
     const [priceReport, setPriceReport] = useState<Array<PriceReportProps> | null>(null);

    const N = 14; 

    useEffect(() => {
    async function get5day(ticker: string) {
        const res = await fetch(`/api/ndayreport?ticker=${encodeURIComponent(ticker)}&n=${encodeURIComponent(N)}`);

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
                labels: {
                    font: {
                        size: 20,
                    },
                    padding: 20
                },

            },
            title: {
                display: true,
                text: `$${ticker} ${N} Day Price Report`,
                font: {
                    size: 40,
                }
            },
            tooltip: {
                titleFont: {
                    size: 30,
                }, 
                bodyFont: {
                    size: 30
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 20,
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 30,
                    },
                },
            },
        },
    };

    const labels = priceReport ? priceReport.map(entry => `${entry.Weekday} ${entry.Date}`) : [];
    
    const data = {
        labels,
        datasets: [
        {
            type: 'line' as const,
            label: 'Open Price',
            data: priceReport ? priceReport.map(entry => parseFloat(entry.Open || '0')) : [],
            backgroundColor: ColorblindSafePaletteTrue[0],
            pointRadius: 5,
            pointHoverRadius: 3,
        },

        {
            type: 'line' as const, 
            label: 'Close Price',
            data: priceReport ? priceReport.map(entry => parseFloat(entry.Close || '0')) : [],
            backgroundColor: ColorblindSafePaletteTrue[1],
            pointRadius: 5,
            pointHoverRadius: 3,
        },

        {
            type: 'line' as const, 
            label: 'High Price',
            data: priceReport ? priceReport.map(entry => parseFloat(entry.High || '0')) : [],
            backgroundColor: ColorblindSafePaletteTrue[2],
            pointRadius: 5,
            pointHoverRadius: 3,
        },

        {
            type: 'line' as const, 
            label: 'Low Price',
            data: priceReport ? priceReport.map(entry => parseFloat(entry.Low || '0')) : [],
            backgroundColor: ColorblindSafePaletteTrue[3],
            pointRadius: 7,
            pointHoverRadius: 3,
        },
        {
            type: 'bar' as const, 
            label: 'Average Price',
            data: priceReport ? priceReport.map(entry => parseFloat( String((Number(entry.Low) + Number(entry.High) + Number(entry.Open) + Number(entry.Close))/4) || '0')) : [],
            backgroundColor: ColorblindSafePaletteTrue[4],
            
            
        }
        ],
    } 


    return (
        <motion.div className='w-[90vw] h-[90vh] box-standard font-istok text-black tracking-wider transition-all'onMouseMove={(e) => 
                {CardSlide(e)}}
            onMouseLeave={(e) => {
                {CardReset(e)}
            }}>
                <Chart type={'bar'} options={options} data={data} className='m-10 p-10'/>

        </motion.div>
        
    );
}

export default GraphNDay;