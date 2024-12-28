const Footer = () => {
  return (
    <div className=" h-[8rem] w-full ">
      <div className="ml-[4rem] flex flex-col">
        <div className="flex items-center ml-[-10px]">
        <img src="/White_musify.svg" alt="Musify" className="h-[4rem] " />
        <div className="gap-1">
          <span className="text-zinc-200 font-extrabold text-3xl ">Musi</span>
          <span className="text-zinc-600 font-extrabold text-3xl ">fy</span>
        </div>
        </div>

        <div >
        <div>
            <pre>Made with ReactJS by Harsh. </pre>
        <ul className="flex gap-4">
            <li><a href="https://github.com/itz-Harsh/Musify.git" className="hover:underline text-[15px]" target=" "><pre>Source Code</pre></a></li>
            <li><a href="https://www.instagram.com/_.ig_harsh/" className="hover:underline text-[15px]" target=" "><pre>Instagram</pre></a></li>

        </ul>
        </div></div>
      </div>
    </div>
  );
};

export default Footer;
