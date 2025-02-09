import MusicContext from "../context/MusicContext"
import { useContext } from "react"; 

const { song } = useContext(MusicContext);
const queue = () => {
  return (
    <div>queue</div>
  )
}

export default queue