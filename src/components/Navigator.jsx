import { GoHome } from "react-icons/go";

import { IoCompassOutline ,IoHeartOutline } from "react-icons/io5";
import { Link } from "react-router";

const Navigator = () => {
  return (
    <div className="lg:hidden fixed bottom-0 z-20 w-full Navigator h-[3.6rem] lg:h-[3.5rem] flex items-center justify-around">
      <Link to="/">
        <div className="flex flex-col items-center text-sm  ">
          <GoHome className="text-2xl " />
          Home
        </div>
      </Link>

      <Link to="/Browse">
        <div className="flex flex-col items-center text-sm  ">
          <IoCompassOutline className="text-2xl " />
          Browse
        </div>
      </Link>

      <Link to="/My_Music">
        <div className="flex flex-col items-center text-sm  ">
          <IoHeartOutline className="text-2xl " />
          My Music
        </div>
      </Link>
    </div>
  );
};

export default Navigator;
