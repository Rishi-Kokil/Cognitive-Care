const MenuScreen = ({ startPlaying, h1, p, span }) => {
  return (
    <div className="">
      <div className=" min-h-screen">
        <div className="overflow-hidden text-center pt-20 ">
          <div className="overflow-hidden max-w-2xl w-full select-none h-[510px] relative isolate mx-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h1 className="font-semibold text-2xl" style={{ opacity: 1 }}>{h1}</h1>
              <p className="text-black text-sm mt-4 mb-6" style={{ opacity: 1 }}>{p}<span className="text-black">{span}</span>
              </p>
              <div className="text-xl gap-4 f-ai-c flex-wrap-reverse md:flex-nowrap">
                {/* <button className="rounded-full border-4 border-white  hover:bg-opacity-90 transition-all active:scale-[1.02] text-white px-4 w-48  py-3" style={{ opacity: 1 }}>How To Play?</button> */}
                <button className="rounded-full bg-black border-4 hover:bg-opacity-90 transition-all active:scale-[1.02] text-white px-4 w-48 py-3 my-5" style={{ opacity: 1 }} onClick={startPlaying}>Play</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;
