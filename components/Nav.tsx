import { useState, useRef } from "react";
import { gsap } from "gsap";

function Nav() {
  const [disabled, setDisabled] = useState(false);
  const lcontrolRef = useRef<HTMLDivElement>(null);
  const rcontrolRef = useRef<HTMLDivElement>(null);
  const animateClick = (ref: any) => {
    !disabled &&
      gsap
        .to(ref.current, {
          scale: 0.8,
          duration: 0.1,
          repeat: 1,
          yoyo: true,
          onStart: () => setDisabled(true),
          onComplete: () => setDisabled(false),
        })
        .play();
  };
  return (
    <div className="hidden xl:flex content-center absolute w-full max-h-full justify-center pointer-events-none">
      <nav className="pointer-events-auto flex items-center space-x-10 items-center">
        <div
          ref={lcontrolRef}
          className=" group flex flex-col items-center"
          onClick={() => animateClick(lcontrolRef)}
        >
          <img
            src="/controller-left.svg"
            className="group-hover:opacity-50 duration-500 "
            alt="controller-left"
          />
          <h2 className="italic text-xl group-hover:opacity-50 duration-500 font-medium">
            Questlog
          </h2>
        </div>
        <div className="flex flex-col h-auto items-center space-y-1">
          <h1 className="italic font-bold text-4xl">Inventory</h1>
          <div className="flex space-x-1">
            <button
              className="rounded-full w-1 h-1 bg-def disabled:opacity-50"
              disabled
            />
            <button className="rounded-full w-1 h-1 bg-def disabled:opacity-50" />
            <button
              className="rounded-full w-1 h-1 bg-def disabled:opacity-50"
              disabled
            />
          </div>
        </div>
        <div
          ref={rcontrolRef}
          className="group flex flex-col items-center"
          onClick={() => animateClick(rcontrolRef)}
        >
          <img
            className="group-hover:opacity-50 duration-500 "
            src="/controller-right.svg"
            alt="controller-right"
          />
          <h2 className="italic text-xl font-medium group-hover:opacity-50 duration-500 ">
            Settings
          </h2>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
