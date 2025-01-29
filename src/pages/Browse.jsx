
import Navbar from "../components/Navbar"
import Navigator from "../components/Navigator"
import Player from "../components/Player"

const Browse = () => {
  return (
    <>
      <Navbar />
        <div className="text-5xl font-bold flex justify-center items-center h-screen w-full">
          Work On Progress
        </div>
      <Player />
      <Navigator />
    </>
  )
}

export default Browse