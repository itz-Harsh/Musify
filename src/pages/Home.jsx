import Navbar from "../components/Navbar";
import Player from "../components/Player";
import Footer from "../components/footer";
import Navigator from "../components/Navigator";
import MainSection from "../components/MainSection";
import { useState, useEffect } from "react";

const Home = () => {
  const [loading, setLoading] = useState(true); // Initialize as true to show loading initially

  useEffect(() => {
    // Simulating data fetching or initialization
    const fetchData = async () => {
      try {
        // Simulate an async task (e.g., fetch API)
        await new Promise((resolve) => setTimeout(resolve, 300)); // Simulates a 2-second delay
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false); // Set loading to false when data is ready
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        {/* <img src="/Loading.gif" alt="" /> */}
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
