import { motion, useScroll, useTransform } from 'framer-motion'
import '../App.css'
import './vcomp.css'
import { ReactNode,useState,  useEffect } from 'react';
import { CardSlide, CardReset, ColorblindSafePaletteTrue } from '.';
import { label, p, title } from 'motion/react-client';

// https://github.com/reactchartjs/react-chartjs-2/blob/master/sandboxes/chart/multitype/App.tsx
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface SentimentProps {
    label?: string; 
    score?: number;
    article: string;
    articleID?: number;
    sentenceID: number;
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

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        size: 16,
                    },
                },
            },
            title: {
                display: true,
                text: 'Sentiment Analysis : $' + ticker + '   <= 5 inputs ' + sentimentData?.length + ' tokens',
                font: {
                    size: 40,
                }
            },
            tooltip: {
                titleFont: {
                    size: 30,
                }, 
                bodyFont: {
                    size: 20
                }
            }

        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 20
                    }
                }, 
                title: {
                    display: true,
                    text: 'Portion Position', 
                    font: {
                        size: 25
                    }
                }
            }, 
            y: {
                ticks: {
                    font: {
                        size: 20
                    }
                }, 
                title: {
                    display: true, 
                    text: 'Sentiment Score', 
                    font: {
                        size: 30
                    }
                }
            }, 
        }
    }

    const labels = sentimentData ? getUniqueTitleFromJSON(sentimentData) : []


    const data = {
        labels, 
        
        datasets : 
            labels.map((label,i)  => {
                const entries = sentimentData!.filter(e => e.article === label)
                return {
                    label: label, 
                    data: entries.map(entry => ({
                        y: Number(entry?.score ?? 0), 
                        x: Number(1/(entry!.sentenceID+1)),
                        r: Number(5 * entry!.label!.length),
                    })),
                    backgroundColor: ColorblindSafePaletteTrue[i], 
                    border: 2
                }
                
            })
    }

    
    return (
        <motion.div className='w-[70vw] h-[70vh] p-10 box-advanced font-istok text-black tracking-wider transition-all'onMouseMove={(e) => 
                {CardSlide(e)}}
            onMouseLeave={(e) => {
                {CardReset(e)}
            }}>
                <Bubble options={options} data={data}></Bubble>

        </motion.div>
    );
}

export default SentimentVisualization;