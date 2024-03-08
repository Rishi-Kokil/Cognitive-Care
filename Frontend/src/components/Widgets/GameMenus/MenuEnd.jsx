import { motion } from "framer-motion";

const MenuEnd = ({ startPlaying, numberOfMoves, numberOfCorrectAnswers, h1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, type: "tween" }}
      className="absolute -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 whitespace-nowrap"
    >
      {/* <div className="mt-4 mb-6 text-2xl w-fit mx-auto flex flex-col justify-center"> */}
      <div className="text-xl gap-4 f-ai-c flex-wrap-reverse md:flex-nowrap">
        <div className="text-center gap-10 font-bold ">
          <p className="">Score: {numberOfCorrectAnswers * 50}</p>
        </div>
        <div className="text-center gap-10 mx-auto">
          <p className="">Correct: {numberOfCorrectAnswers} / {numberOfMoves}
          </p>
        </div>
      {/* </div> */}
      
        <button className="rounded-full bg-black border-4 hover:bg-opacity-90 transition-all active:scale-[1.02] text-white px-4 w-48 py-3 my-2" style={{ opacity: 1 }} onClick={startPlaying}>Play Again</button>
      </div>
    </motion.div>
  );
};

export default MenuEnd;
