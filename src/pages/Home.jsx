import Navbar from "../components/Navbar";
import Player from "../components/Player";
import Footer from "../components/footer";
import Navigator from "../components/Navigator";
import MainSection from "../components/MainSection";
import { useState, useEffect } from "react";


const Home = () => {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 0));
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <img src="/Loading.gif" alt="" className=""/>
      </div>
    );
  }

  return (
    <>    
       <Navbar />
     
       <MainSection />
       <Footer />
       <Navigator />
       <Player />
    </>
  );
};

export default Home;
