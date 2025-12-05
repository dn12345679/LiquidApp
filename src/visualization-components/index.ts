export {default as TitleCard} from "./title-card"
export {default as PriceReport} from "./price-report"
export {default as Graph5Day} from "./graph-5day"
export {default as SentimentVisualization} from "./sentiment"



export function CardSlide(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
    e.currentTarget.style.transform = 'scale(0.95) rotateY(10deg)';    
}

export function CardReset(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.currentTarget.style.transform = 'scale(1)';
}


