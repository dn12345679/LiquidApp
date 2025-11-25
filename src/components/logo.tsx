

function Logo() {
    return (
        <div className="absolute w-fit h-[1em] flex flex-row ml-[2em] mt-[1.5vh] font-medium font-istok text-[1.5vw] tracking-wider
            hover:scale-[1.01] transition duration-400 hover:cursor-grab">
            <div className="relative top-[0.5em]">Liqu</div>
            <div className="relative bottom-0 flex flex-col">
                <p>id</p>
                <p className="absolute bottom-[-1em]">→</p>
            </div>
        </div>
    )
}

export default Logo