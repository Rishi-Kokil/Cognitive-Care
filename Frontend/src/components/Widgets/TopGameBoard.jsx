const TopGameBoard = ({ isPlaying, time, numberOfCorrectAnswers }) => {
  return (
    <div className="absolute top-0 right-0  text-black f-ai-c z-10 gap-1">
      <div className="bg-slate-200 py-1 px-3">Time: 00:{time < 10 ? "0" + time : time}</div>
      <div className="bg-slate-200 py-1 px-3">Score: {50 * numberOfCorrectAnswers}</div>
    </div>
  );
};
export default TopGameBoard;
