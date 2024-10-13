import React from "react";
import Container from "./Container";
import SubFooter from "./SubFooter";

const Loading = () => {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <Container className={"w-full"}>
        <div className="text-center">
          {/* Ping Animation */}
          <div className="flex justify-center items-center">
            <div className="rounded-full h-20 w-20 bg-secondary animate-ping"></div>
          </div>

          {/* Typing Animation */}
          <div className="mt-10">
            <p className="text-2xl text-secondary whitespace-nowrap overflow-hidden border-r-4 border-secondary animate-typing">
              Loading data...
              <span className="animate-blink">|</span>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Loading;
