import React from "react";
const GameContainer = React.forwardRef((props, gameContainerRef) => {
  const { children, className } = props;
  return (
    <div
      ref={gameContainerRef}
      className={`bg-white overflow-hidden w-full select-none h-[98vh] ${className}`}
    >
      {children}
    </div>
  );
});
GameContainer.displayName = "GameContainer";

export default GameContainer;
