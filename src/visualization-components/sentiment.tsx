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
    article?: string;
    articleID?: string;
}

function SentimentVisualization({ticker}: {ticker: string}) {


    
    return (
        <motion.div className='w-[60vw] h-[90vh] box-advanced font-istok text-black tracking-wider transition-all'onMouseMove={(e) => 
                {CardSlide(e)}}
            onMouseLeave={(e) => {
                {CardReset(e)}
            }}>
                

        </motion.div>
    );
}

export default SentimentVisualization;