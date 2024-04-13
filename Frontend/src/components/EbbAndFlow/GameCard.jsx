import GameContainer from "../Widgets/GameContainer";
import LeafGroup from "./LeafGroup";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { AnimatePresence } from "framer-motion";
import { useTimer } from "use-timer";
import TopGameBoard from "../Widgets/TopGameBoard";
import MenuEnd from "../Widgets/GameMenus/MenuEnd";
import MenuScreen from "../Widgets/GameMenus/MenuScreen";

const GameCard = () => {
    const [gameContainerRef, bounds] = useMeasure();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
    const [numberOfMoves, setNumberOfMoves] = useState(0);

    const { time, start, pause, reset, status } = useTimer({
        endTime: 0,
        initialTime: 59,
        timerType: "DECREMENTAL",
    });

    // pausing the game
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            pause();
            setIsPaused(true);
        }
    };
    useEffect(() => {
        !isPaused && isPlaying && start();
        isPlaying && document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [setIsPaused, isPlaying, isPaused]);

    const startPlaying = () => {
        start();
        setIsPaused(false);
        setNumberOfCorrectAnswers(0);
        setNumberOfMoves(0);
        setIsPlaying(true);
    };

    return (
        <div className="h-[90vh]">
            <div className="overflow-hidden text-center">
                <GameContainer ref={gameContainerRef} className="relative isolate mx-auto ">
                    {isPlaying && (
                        <TopGameBoard isPlaying={isPlaying} time={time} numberOfCorrectAnswers={numberOfCorrectAnswers} />
                    )}
                    {/* Game */}
                    <img alt="bg" src="https://static.vecteezy.com/system/resources/thumbnails/002/178/674/small/lake-mountain-panorama-landscape-in-green-monochrome-flat-illustration-vector.jpg" decoding="async" data-nimg="fill" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, boxSizing: 'border-box', padding: 0, border: 'none', margin: 'auto', display: 'block', width: 0, height: 0, minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%' }} sizes="100vw" srcset="https://static.vecteezy.com/system/resources/thumbnails/002/178/674/small/lake-mountain-panorama-landscape-in-green-monochrome-flat-illustration-vector.jpg" className="rounded-lg opacity-25 bg-gray-900  bg-gray-900" />
                    
                    <AnimatePresence>
                        {isPlaying && time > 0 && (
                            <>
                            <LeafGroup
                                gameBounds={bounds}
                                isPaused={isPaused}
                                setNumberOfCorrectAnswers={setNumberOfCorrectAnswers}
                                setNumberOfMoves={setNumberOfMoves}
                            />
                            </>
                        )}
                    </AnimatePresence>

                    {/* First game interface (Menu) */}
                    
                    {!isPlaying && 
                    <>
                        <img alt="bg" src="https://static.vecteezy.com/system/resources/thumbnails/002/178/674/small/lake-mountain-panorama-landscape-in-green-monochrome-flat-illustration-vector.jpg" decoding="async" data-nimg="fill" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, boxSizing: 'border-box', padding: 0, border: 'none', margin: 'auto', display: 'block', width: 0, height: 0, minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%' }} sizes="100vw" srcset="https://static.vecteezy.com/system/resources/thumbnails/002/178/674/small/lake-mountain-panorama-landscape-in-green-monochrome-flat-illustration-vector.jpg" className="rounded-lg opacity-50 bg-gray-900  bg-gray-900" />
                        <MenuScreen
                        startPlaying={startPlaying}
                        h1="Ebb and Flow"
                        p="Train your task switching ability by shifting focus between where the leaves point and how they move"
                        span="(works with both arrowkeys and gestures on mobile)" />
                    </>}
                    
                    {/* End game menu */}
                    <AnimatePresence>
                    {time <= 0 && (
                        <MenuEnd
                        startPlaying={startPlaying}
                        numberOfMoves={numberOfMoves}
                        numberOfCorrectAnswers={numberOfCorrectAnswers}
                        h1={"Ebb And Flow"}
                        />
                    )}
                    </AnimatePresence>
                </GameContainer>
            </div>
        </div>
    );
};

export default GameCard;
