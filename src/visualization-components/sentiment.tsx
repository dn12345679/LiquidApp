import { motion, useScroll, useTransform } from 'framer-motion'
import '../App.css'
import './vcomp.css'
import { ReactNode,useState,  useEffect } from 'react';
import { CardSlide, CardReset } from '.';
import { label, p } from 'motion/react-client';

// https://github.com/reactchartjs/react-chartjs-2/blob/master/sandboxes/chart/multitype/App.tsx
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
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
  LineController,
  BarController
);

interface SentimentProps {
    label?: string; 
    score?: string;
    article: string;
    articleID?: number;
}

function getUniqueTitleFromJSON(data : Array<SentimentProps>) {
    const result = new Set<string>();

    for (const entry of data) {
        const title: string = entry.article
        result.add(title)
    }
    const returnList: string[] = Array.from(result)
    return returnList;
}

function SentimentVisualization({ticker}: {ticker: string}) {
    const [sentimentData, setSentimentData] = useState<Array<SentimentProps> | null>(null);
    useEffect(() => {

        async function fetchSentimentData(ticker: string) {
            const response = await fetch(`/api/sentiment?ticker=${encodeURIComponent(ticker)}`);
            if (!response.ok) {
                throw new Error("Failed to fetch sentiment data");
            }
            const data = await response.json();
            return data;
        }
        fetchSentimentData(ticker).then(data => setSentimentData(data)).catch(error => console.error(error));
    }, [ticker])

    
    return (
        <motion.div className='w-[60vw] h-[90vh] box-advanced font-istok text-black tracking-wider transition-all'onMouseMove={(e) => 
                {CardSlide(e)}}
            onMouseLeave={(e) => {
                {CardReset(e)}
            }}>
                {sentimentData && getUniqueTitleFromJSON(sentimentData).map((entry, index) => (
                    <div key={index}> {entry} </div>
                ))}

        </motion.div>
    );
}

export default SentimentVisualization;