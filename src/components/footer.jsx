import { Link } from "react-router";

const Footer = () => {
  return (
    <>
    <div className=" lg:h-[15rem] h-auto w-full flex gap-10  p-10 footer mb-[3rem]">
      <div className="ml-[4rem] flex flex-col ">
        <div className="flex items-center ml-[-10px]">
        <span className="bg"></span>
        <div className="gap-1">
          <span className="Musi  font-extrabold text-2xl lg:text-3xl ">Musi</span>
          <span className="fy font-extrabold text-2xl lg:text-3xl ">fy</span>
        </div>
        </div>

        <div >
        <div>
            <pre className="lg:text-sm text-xs">Made with ReactJS by Harsh. </pre>
        <ul className="flex gap-4 ">
            <li><a href="https://github.com/itz-Harsh/Musify.git" className="hover:underline text-[13px] lg:text-[15px]" target=" "><pre>Source Code</pre></a></li>
            <li><a href="https://www.instagram.com/_harsh_str/" className="hover:underline text-[13px] lg:text-[15px]" target=" "><pre>Instagram</pre></a></li>

        </ul>
        </div></div>
      </div>

      <div className="lg:block hidden">
        <ul className="flex flex-col gap-[0.2rem] pb-5">
          <p className=" font-sans text-xs font-semibold pb-2">TOP ARTISTS</p>
        <li><Link to={`/artists/459320`} >Arijit Singh</Link> </li>
        <li><Link to={`/artists/456863`} >Badshah</Link> </li>
        <li><Link to={`/artists/485956`} >Honey Singh </Link> </li>
        <li><Link to={`/artists/468245`} >Diljit Dosanjh </Link> </li>
        <li><Link to={`/artists/672167`} >Haardy Sandhu </Link> </li>
        <li><Link to={`/artists/881158`} >Jubin Nautiyal</Link> </li></ul>
    </div>
    </div>

</>
  );
};

export default Footer;
