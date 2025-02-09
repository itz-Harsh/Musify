import { useContext } from "react";
import MusicContext from "../context/MusicContext";

const Queue = () => {
  const { songs } = useContext(MusicContext);

  return (
    <div className="fixed right-0 h-full w-[20rem] flex justify-center" >
        Queue
    </div>
  );
};

export default Queue;
