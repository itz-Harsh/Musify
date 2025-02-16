import { GoHome, GoHomeFill } from "react-icons/go";
import { IoCompass, IoCompassOutline, IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Navigator = () => {
  const location = useLocation();

  return (
    <div className="lg:hidden fixed bottom-0 z-20 w-full Navigator h-[3.6rem] lg:h-[3.5rem] flex items-center justify-around">
      <Link to="/">
        <div className="flex flex-col items-center text-sm">
        {location.pathname === "/" ? (
            <GoHomeFill className="text-2xl" />
          ) : (
            <GoHome className="text-2xl" />
          )}
          
          Home
        </div>
      </Link>

      <Link to="/Browse">
        <div className="flex flex-col items-center text-sm">
          {location.pathname === "/Browse" ? (
            <IoCompass className="text-2xl" />
          ) : (
            <IoCompassOutline className="text-2xl" />
          )}
          Browse
        </div>
      </Link>
      
      <Link to="/Music">
        <div className="flex flex-col items-center text-sm">
        {location.pathname === "/Music" ? (
            <IoHeartSharp className="text-2xl" />
          ) : (
            <IoHeartOutline className="text-2xl" />
          )}
          My Music
        </div>
      </Link>
    </div>
  );
};

export default Navigator;
