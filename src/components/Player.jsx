import { BiRepeat } from "react-icons/bi"
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io"
import { PiShuffleBold } from "react-icons/pi"
import { FaPlay } from "react-icons/fa"
import { FaDownload } from "react-icons/fa"
import { HiSpeakerWave } from "react-icons/hi2"
import VolumeController from "./VolumeController"
import { useState } from "react"



const Player = () => {

    const [isVolumeVisible , setIsVolumeVisible] = useState(false);


    return (
        <div className=" flex flex-col fixed justify-between player bottom-0 w-full ">
            <input type="range" name="progress" id="progress" min={0} max={100} step="0.1" value={0} className=" h-[3px] w-full text-emerald-500 range " />

            <div className=" flex justify-between items-center mb-3 px-3">
                {/* 1st Div */}
                <div className="flex justify-start items-center gap-5 lg:w-[30vw]">
                    <img src="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg" alt="" width={80} className="rounded-3xl" />

                    <div className="hidden lg:block">
                        <span > Lorem, ipsum.</span>
                        <p className="text-xs ">Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>

                {/* 2st Div */}

                <div className="flex text-xl lg:text-2xl gap-4 lg:gap-6 lg:w-[40vw] justify-center ">
                    <BiRepeat className="hover:text-emerald-400 cursor-pointer" />
                    <IoMdSkipBackward className=" hover:text-emerald-400 cursor-pointer" />
                    <FaPlay className=" hover:text-emerald-400 cursor-pointer" />
                    <IoMdSkipForward className=" hover:text-emerald-400 cursor-pointer" />
                    <PiShuffleBold className="hover:text-emerald-400 cursor-pointer" />
                </div>

                <div className="flex text-xl lg:text-2xl cursor-pointer lg:mr-2 gap-5 pr-4 lg:w-[30vw] justify-end items-center" 
                    onMouseEnter = {() => setIsVolumeVisible(true)}
                    onMouseOut = {() => setIsVolumeVisible(false)}
                    >
                    <FaDownload className="hover:text-emerald-400 " />
                    <HiSpeakerWave className="hover:text-emerald-400 hidden lg:block " />
                    <VolumeController isVolumeVisible={isVolumeVisible} />
                </div>
            </div>
        </div>
    )
}

export default Player