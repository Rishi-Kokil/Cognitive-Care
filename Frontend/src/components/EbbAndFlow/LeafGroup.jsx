import { useEffect, useRef, useState } from "react";
import SingleLeaf from "./SingleLeaf";
import { FaTimes, FaCheck } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
const LeafGroup = ({ gameBounds, isPaused, setNumberOfCorrectAnswers, setNumberOfMoves }) => {
  const delta = 4;

  const [position1, setPosition1] = useState(0);
  const requestRef = useRef();
  const [leafArray, setLeafArray] = useState([]);
  const [leafArray2, setLeafArray2] = useState([]);
  const [position2, setPosition2] = useState(0);
  const [direction, setDirection] = useState("down");
  const [rotation, setRotation] = useState(90);

  const [correctMove, setCorrectMove] = useState(Math.floor(Math.random() * 10) % 2 === 0 ? "moving" : "pointing");
  const possibleRotations = [0, 90, 180, 270];

  // 0 for wrong, 1 for correct
  const [correctOrWrongIcon, setCorrectOrWrongIcon] = useState(null);

  // swipe events
  const handlers = useSwipeable({
    onSwiped: (eventData) => listenToSwipe(eventData.dir.toLocaleLowerCase()),
  });

  useEffect(() => {
    window.addEventListener("keydown", listeToArrowKeys);
    return () => {
      window.removeEventListener("keydown", listeToArrowKeys);
    };
  }, [correctMove, rotation, direction, isPaused]);
  useEffect(() => {
    setLeafArray(createLeafArray());
    setLeafArray2(createLeafArray());
    setPosition2(-gameBounds.width);
  }, [gameBounds]);

  //   When The leaves reach gameBounds.width, they reset
  useEffect(() => {
    if (position1 > gameBounds.width) {
      setPosition1(-gameBounds.width);
    }
    if (position2 > gameBounds.width) {
      setPosition2(-gameBounds.width);
    }
  }, [position1, position2]);

  useEffect(() => {
    if (!isPaused) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [isPaused]);

  //   listen to arrow keys
  const listeToArrowKeys = (e) => {
    if (!isPaused && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      if (correctMove === "moving") {
        if (e.key === "ArrowLeft" && direction === "left") {
          goodJob();
        } else if (e.key === "ArrowRight" && direction === "right") {
          goodJob();
        } else if (e.key === "ArrowUp" && direction === "up") {
          goodJob();
        } else if (e.key === "ArrowDown" && direction === "down") {
          goodJob();
        } else wrongChoice();
      } else if (correctMove === "pointing") {
        if (e.key === "ArrowLeft" && rotation == 270) {
          goodJob();
        } else if (e.key === "ArrowRight" && rotation == 90) {
          goodJob();
        } else if (e.key === "ArrowUp" && rotation == 0) {
          goodJob();
        } else if (e.key === "ArrowDown" && rotation == 180) {
          goodJob();
        } else wrongChoice();
      }
    }
  };
  const listenToSwipe = (dir) => {
    if (!isPaused && correctMove === "moving") {
      if (dir === "left" && direction === "left") {
        goodJob();
      } else if (dir === "right" && direction === "right") {
        goodJob();
      } else if (dir === "up" && direction === "up") {
        goodJob();
      } else if (dir === "down" && direction === "down") {
        goodJob();
      } else wrongChoice();
    } else if (!isPaused && correctMove === "pointing") {
      if (dir === "left" && rotation == 270) {
        goodJob();
      } else if (dir === "right" && rotation == 90) {
        goodJob();
      } else if (dir === "up" && rotation == 0) {
        goodJob();
      } else if (dir === "down" && rotation == 180) {
        goodJob();
      } else wrongChoice();
    }
  };

  const goodJob = () => {
    setNumberOfCorrectAnswers((prev) => prev + 1);
    console.log("good job");
    setCorrectOrWrongIcon(1);
    changeBehavior();
  };
  const wrongChoice = () => {
    console.log("wrong choice");
    setCorrectOrWrongIcon(0);
    changeBehavior();
  };

  const changeBehavior = () => {
    setNumberOfMoves((prev) => prev + 1);
    setCorrectMove(Math.floor(Math.random() * 10) % 2 === 0 ? "moving" : "pointing");
    // set rotaition radnom either 0, 90, 180, 270
    setRotation(possibleRotations[Math.floor(Math.random() * 10) % 4]);
    // set direction random either left, right, up, down
    setDirection(["left", "right", "up", "down"][Math.floor(Math.random() * 10) % 4]);

    // make the correct or icon invisible
    setTimeout(() => {
      setCorrectOrWrongIcon(null);
    }, 500);
  };

  const getRandomPosition = (bound) => {
    return Math.floor(Math.random() * bound);
  };

  const createLeafArray = () => {
    let array = [];
    for (let i = 0; i < 12; i++) {
      array.push([getRandomPosition(gameBounds.width), getRandomPosition(gameBounds.height)]);
    }
    return array;
  };

  const animate = (time) => {
    // The 'state' will always be the initial value here
    setPosition1((prevState) => prevState + delta);
    setPosition2((prevState) => prevState + delta);
    requestRef.current = requestAnimationFrame(animate);
  };

  return (
    <motion.div
      {...handlers}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full bg-light-green-50"
    >
      <div
        style={{
          transform:
            direction == "up"
              ? `translateY(${-position1}px)`
              : direction == "down"
              ? `translateY(${position1}px)`
              : direction == "left"
              ? `translateX(${-position1}px)`
              : `translateX(${position1}px)`,
        }}
      >
        {leafArray.length > 0 &&
          leafArray.map((leafPosition, index) => (
            <SingleLeaf
              key={index}
              leafPosition={leafPosition}
              style={{
                transform: `rotate(${rotation}deg) `,
              }}
              className={`${correctMove === "moving" ? "text-orange-500" : "text-green-500"}`}
            />
          ))}
      </div>
      <div
        style={{
          transform:
            direction == "up"
              ? `translateY(${-position2}px)`
              : direction == "down"
              ? `translateY(${position2}px)`
              : direction == "left"
              ? `translateX(${-position2}px)`
              : `translateX(${position2}px)`,
        }}
      >
        {leafArray2.length > 0 &&
          leafArray2.map((leafPosition, index) => (
            <SingleLeaf
              key={index}
              leafPosition={leafPosition}
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
              className={`${correctMove === "moving" ? "text-orange-500" : "text-green-500"}`}
            />
          ))}
      </div>

      {/* correvt move */}
      <div className="absolute w-fit bottom-0 isolate left-1/2 -translate-x-1/2 py-2 f-ai-c bg-slate-500">
        <div
          className={`selector inset-y-0 -z-10 w-1/2 absolute  ${
            correctMove === "pointing" ? "bg-green-500 left-0" : "bg-orange-500 left-1/2"
          }`}
        />
        <div className="flex flex-wrap">
          <div className={`px-6`}>Pointing</div>
          <div className={`px-6`}>Moving</div>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.75 }}
          className="text-7xl"
        >
          {correctOrWrongIcon == 0 ? (
            <FaTimes className="text-red-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
          ) : correctOrWrongIcon == 1 ? (
            <FaCheck className="text-green-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
          ) : (
            <></>
          )}
        </motion.div>
      </AnimatePresence>
      <style jsx>
        {`
          .selector {
            display: block;
            transition: all 0.5s;
          }
        `}
      </style>
    </motion.div>
  );
};

export default LeafGroup;
