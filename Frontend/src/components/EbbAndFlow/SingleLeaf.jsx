import { useEffect, useState } from "react";
import { IoMdLeaf } from "react-icons/io";
import { motion } from "framer-motion";

const SingleLeaf = ({ leafPosition, style, className }) => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  useEffect(() => {
    setPositionX(leafPosition[0]);
    setPositionY(leafPosition[1]);
  }, [leafPosition]);

  return (
    <IoMdLeaf
      className={` text-[120px] absolute transition-all duration-300 ${className}`}
      style={{
        left: `${positionX}px`,
        top: `${positionY}px`,
        ...style,
      }}
    />
  );
};

export default SingleLeaf;
