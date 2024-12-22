const VolumeController = ({ isVolumeVisible }) => {
    return (
        <div className= {`flex items-center w-[90px] absolute -rotate-90 bottom-20 right-1 h-5 px-1  rounded-lg bg-zinc-200 ${ isVolumeVisible ? " " : "hidden" }`}>

            <input type="range" min={0} max={100} step="0.1"  className=" h-[3px] volume " />
        </div>
    )
}

export default VolumeController 