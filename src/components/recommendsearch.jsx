

function RecommendSearch({ticker}) {

    async function runModel(ticker) {
        const res = await fetch(`/api/validate?ticker=${encodeURIComponent(ticker)}`);
        
        if (!res.ok) {
            throw new Error("Failed to fetch info");
        }
        const data = await res.json();
        console.log(data)
        return data;
    }
    runModel(ticker);

    return (
        <div className="transition-all bg-white/30 w-[39vw] h-[10vh] origin-center left-[50vw] -translate-x-1/2">
            
        </div>
    )
}

export default RecommendSearch;