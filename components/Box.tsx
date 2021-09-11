import { useState, useEffect, useRef, useContext } from "react";
import useOutsideAlerter from "./useOutsideAlerter";
import { gsap } from "gsap";
import { Transition } from "react-transition-group";
import Image from "next/image";
import { Context } from "./Context";

const Box: React.FC<any> = ({ data, isEmpty, i, isConsumable }) => {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useOutsideAlerter(ref, "App", deactivate);

  function deactivate() {
    setActive(false);
  }
  function toggle() {
    setActive((prev) => !prev);
  }

  const animateCorner = (ref: any, values: any) =>
    gsap
      .to(ref.current, {
        x: values.x,
        y: values.y,
        duration: 0.3,
        repeat: -1,
        yoyo: true,
      })
      .play();

  const contextMenuRef = useRef(null);
  const tlcornerRef = useRef(null);
  const trcornerRef = useRef(null);
  const brcornerRef = useRef(null);
  const blcornerRef = useRef(null);

  useEffect(() => {
    active && animateCorner(tlcornerRef, { x: -5, y: -5 });
    active && animateCorner(trcornerRef, { x: 5, y: -5 });
    active && animateCorner(brcornerRef, { x: 5, y: 5 });
    active && animateCorner(blcornerRef, { x: -5, y: 5 });
  }, [active]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  const desktopAppear = (node: any) =>
    gsap.to(node, {
      scale: active ? 1 : 0.4,
      autoAlpha: active ? 1 : 0,
      duration: 0.3,
    });
  const mobileAppear = (node: any) =>
    gsap.to(node, { top: active ? "30%" : "100%", duration: 0.3 });

  const handleModalClass = (i: number) => {
    if (i === 0 || i % 5 === 0) return "left";
    if (i === 4 || i === 9 || i === 14 || i === 19) return "right";
    return "center";
  };
  return (
    <>
      {" "}
      {isEmpty && (
        <div
          key={i}
          className="w-28 h-28 2xl:w-32 2xl:h-32 p-1 rounded bg-gray-100 bg-opacity-10"
        >
          <div className="h-full w-full border border-def border-opacity-10" />
        </div>
      )}
      {!isEmpty && (
        <div
          key={i}
          ref={ref}
          className={`relative w-28 h-28 2xl:w-32 2xl:h-32 overflow-visible 
          }`}
          onClick={toggle}
        >
          <div
            className={`absolute w-full h-full transition duration-150 ease-in-out ${
              active && "border-4 border-def filter blur-sm"
            }`}
          />
          <div
            className={`absolute w-full h-full rounded bg-black ${
              active && "bg-opacity-60"
            }`}
          />
          {active && (
            <>
              <img
                src="tl-corner.svg"
                ref={tlcornerRef}
                alt="tlcorner"
                className="absolute"
              />
              <img
                src="tr-corner.svg"
                ref={trcornerRef}
                alt="trcorner"
                className="absolute right-0"
              />
              <img
                src="br-corner.svg"
                ref={brcornerRef}
                alt="brcorner"
                className="absolute bottom-0 right-0"
              />

              <img
                src="bl-corner.svg"
                ref={blcornerRef}
                alt="blcorner"
                className="absolute bottom-0"
              />
            </>
          )}
          <div
            className={`absolute w-full h-full p-1 border border-def transition duration-150 ease-in-out  border-opacity-0 hover:border-opacity-100  ${
              active && "border-opacity-100"
            }`}
          >
            <div
              className={`relative w-full h-full border border-def border-opacity-0 p-1 ${
                !active && " border-opacity-30"
              }`}
            >
              {data && (
                <Image
                  src={`/${data.title}.webp`}
                  alt={data.title}
                  layout="fill"
                />
              )}
              {!isConsumable && (
                <h3 className="absolute bottom-0 italic font-bold text-2xl">
                  ×{data.quantity}
                </h3>
              )}

              {isConsumable && (
                <Transition
                  timeout={500}
                  mountOnEnter
                  unmountOnExit
                  in={active}
                  addEndListener={(node: any, done: any) => {
                    isMobile ? mobileAppear(node) : desktopAppear(node);
                  }}
                >
                  <div
                    className={`box-modal-${handleModalClass(
                      i
                    )} fixed md:absolute w-screen h-screen md:h-auto top-full md:top-1/2 md:w-80 z-50 bg-black bg-opacity-60`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ContextMenu data={data} close={deactivate} />
                  </div>
                </Transition>
              )}
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
};

const ContextMenu = (props: any) => {
  const { handleConsumeRequest } = useContext(Context);
  return (
    <div
      className={`relative w-full p-x h-full rounded-t-3xl md:rounded`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col items-center gap-4 rounded-sm border-0 md:border border-def transition duration-150 ease-in-out border-opacity-50 p-4">
        <div className="w-10 h-1 rounded-xl bg-gray-200 bg-opacity-40 md:hidden" />
        <div className="w-full p-x bg-black rounded  bg-opacity-80">
          <div className="rounded-sm border  border-def transition duration-150 ease-in-out border-opacity-50  hover:border-opacity-100 p-4">
            <h1
              className="italic text-3xl text-center font-medium"
              onClick={() => {
                handleConsumeRequest(props.data.id, props.data.title);
                props.close();
              }}
            >
              {props.data.title.includes("Elixir") ? "Drink" : "Eat"}
            </h1>
          </div>
        </div>

        <div className="w-full p-x bg-black rounded bg-opacity-80">
          <div
            className=" rounded-sm border border-def transition duration-150 ease-in-out border-opacity-50 hover:border-opacity-100 p-4"
            onClick={props.close}
          >
            <h1 className="italic text-3xl text-center font-medium">Cancel</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
