import React from "react";
const GameContainer = React.forwardRef((props, gameContainerRef) => {
  const { children, className } = props;
  return (
    <div
      ref={gameContainerRef}
      className={`bg-white overflow-hidden max-w-2xl w-full select-none h-[510px] ${className}`}
    >
      {children}
    </div>
  );
});
GameContainer.displayName = "GameContainer";

export default GameContainer;
