import { useState, useEffect, useRef, useContext } from "react";
import usePrevious from "./usePrevious";
import { gsap } from "gsap";
import Image from "next/image";
import { Context } from "./Context";
import Box from "./Box";

const menuItems = [
  { title: "Weapons", src: "weapons.svg", key: "weapons" },
  { title: "Bows", src: "ranged.svg", key: "bows" },
  { title: "Shields", src: "shields.svg", key: "shields" },
  { title: "Armor", src: "armor.svg", key: "armor" },
  { title: "Materials", src: "materials.svg", key: "materials" },
  { title: "Consumables", src: "consumables.svg", key: "consumables" },
  { title: "Favorites", src: "favorites.svg", key: "favorites" },
];

const menuItemKeys = ["materials", "consumables"];

const InvMenuItem = (props: any) => {
  const dots = [...Array(props.length)];
  const ref = useRef(null);
	const isClickable = props.data.title === "Materials" || props.data.title === "Consumables"

  let children: any;
  let pointer: any;

  function handleClick(e: any) {
    e.stopPropagation();
    // the following sequence finds the first child of each grids cluster
    // corresponding to the nav item
    // and marks is as a pointer
    // to scroll towards when the
    // nav item is clicked
    !children &&
      (children = document.querySelector(
        `.${props.data.key}-container`
      )?.children);
    !pointer && children?.length > 0 && (pointer = [...children][0]);
    let pointerIndex = props.stateNodes.indexOf(pointer);
    children?.length > 0 && props.setSlide(pointerIndex);
  }
  return (
    <div>
      <div className="flex justify-center mb-2 space-x-1">
        {props.length > 1 &&
          dots?.map((e, i) => (
            <button
              className="inv-dot cursor-default rounded-full w-1 h-1 bg-def transition duration-200 opacity-100 disabled:opacity-50"
              key={i}
              disabled
            />
          ))}
      </div>
      <div
        onClick={handleClick}
        ref={ref}
        className={`relative transition duration-500 ease-in-out transform opacity-60 hover:opacity-100 ${
          props.view === props.data.key && "opacity-100"
        }
		 ${!isClickable && "cursor-not-allowed"}`}
      >
        <Image
          alt={props.data.title}
          src={`/${props.data.src}`}
          layout="fixed"
          width={35}
          height={35}
        />
      </div>
    </div>
  );
};

// this components recieves the entire data, then slices it into chunks of 20 max,
// maps over it and passes each chunk into a new grgd

const Inventory: React.FC<any> = () => {
  const { items } = useContext<any>(Context);

  const { slide, setSlide, stateNodes, setStateNodes } = useContext(Context);
  const [gridNodesL, setGridNodesL] = useState(0);
  const [gridMounted, setGridMounted] = useState(false);

  const prevSlide = usePrevious(slide);

  // once grid element is mounted,
  // get a list of all the nav dots
  // and make the strating one display as active
  useEffect(() => {
    const navdots = document.getElementsByClassName("inv-dot");
    setNavDots(navdots);
    navDots && navDots[0]?.removeAttribute("disabled");
  }, [gridMounted]);

  // once slide changes, scroll the new grid into the view
  // and handle disable attribute of nav arrows
  useEffect(() => {
    setGridNodesL(stateNodes?.length);
    stateNodes &&
      stateNodes[slide]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    navDots && navDots[prevSlide]?.setAttribute("disabled", true);
    navDots && navDots[slide]?.removeAttribute("disabled");
    // agcl === a string with the element's classes, active grid class list
    let agcl = stateNodes[slide]?.parentElement.classList.value;
    agcl && menuItemKeys.map((e) => agcl.includes(e) && setView(e));
  }, [slide, stateNodes]);

  // arrow logic
  const [disabled, setDisabled] = useState(false);
  const rarrowRef = useRef(null);
  const larrowRef = useRef(null);
  const handleArrowClick = (forward: boolean, ref: any) => {
    forward && slide <= stateNodes.length - 2 && setSlide((prev) => prev + 1);
    !forward && slide >= 1 && setSlide((prev) => prev - 1);
  };

  // makes arrows animate left n right
  const animateArrow = (ref: any) =>
    gsap
      .to(ref.current, {
        x: -10,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      })
      .play();

  // shrinks arrows on click
  const animateClick = (ref: any) => {
    !disabled &&
      gsap
        .to(ref.current, {
          scale: 0.8,
          duration: 0.1,
          repeat: 1,
          yoyo: true,
          onComplete: () => setDisabled(false),
        })
        .play();
  };

  // set arrow animations into motion
  useEffect(() => {
    animateArrow(rarrowRef);
    animateArrow(larrowRef);
  }, []);

  //nav logic
  const [navDots, setNavDots] = useState<any>(null);
  const [view, setView] = useState("materials");
  // inventory or inventory-container
  const handleNavPoints = (view: string | undefined) => {
    if (view === "materials") return items.materials?.length;
    if (view === "consumables") return items.consumables?.length;
  };
  const organizeGridNodes = (el: any) =>
    setStateNodes((prev: any) => [...prev, el]);

  // make overflow-scroll dynamic as to prevent users from shift+scrolling themselves
  return (
    <div className="order-last xl:order-first overflow-x-scroll invisible-scrollbar">
      {/*nav */}
      <div className="hidden xl:flex justify-center">
        <div className="inv-nav flex justify-center items-end p-4 gap-8 border-b-2 border-def border-opacity-30">
          {menuItems.map((e, i) => (
            <InvMenuItem
              stateNodes={stateNodes}
              view={view}
              index={i}
              setSlide={setSlide}
              slide={slide}
              data={e}
              key={i}
              length={handleNavPoints(e.key)}
            />
          ))}
        </div>
      </div>

      {/*grids*/}
      <div className="relative inventory-container overflow-scroll invisible-scrollbar">
        <div className="px-4 xl:p-0 inventory relative xl:max-w-2xlp 2xl:max-w-3xlp flex gap-10 overflow-scroll invisible-scrollbar ">
          <div className="flex gap-5 materials-container">
            {" "}
            {items.materials &&
              items.materials.map((e: any, i: number) => {
                return (
                  <Grid
                    setGridMounted={setGridMounted}
                    organizeGridNodes={organizeGridNodes}
                    slide={slide}
                    data={e}
                    length={gridNodesL}
                    index={i}
                    key={i}
                  />
                );
              })}
          </div>
          <div className="flex gap-5 consumables-container">
            {" "}
            {items.consumables ? (
              items.consumables.map((e: any, i: number) => {
                return (
                  <Grid
                    organizeGridNodes={organizeGridNodes}
                    data={e}
                    slide={slide}
                    length={gridNodesL}
                    index={i + items.materials.length}
                    key={i}
                    isConsumable={true}
                  />
                );
              })
            ) : (
              <LoadingGrid />
            )}
            <div />
            <div />
            <div />
          </div>
        </div>

        {/*arrows*/}
        <div
          className={`hidden absolute ${
            slide !== 0 && "xl:flex"
          } items-center top-0 left-0 transform scale-x-neg h-full min-w-max`}
        >
          <img
            src="/arrow.svg"
            alt="directional arrow"
            ref={larrowRef}
            onClick={() => {
              !disabled && animateClick(larrowRef);
              !disabled && handleArrowClick(false, larrowRef);
            }}
          />
        </div>
        <div
          className={`hidden absolute ${
            slide !== gridNodesL - 1 && "xl:flex"
          }  items-center top-0 right-0 h-full min-w-max`}
        >
          <img
            src="/arrow.svg"
            ref={rarrowRef}
            alt="directional arrow"
            onClick={() => {
              animateClick(rarrowRef);
              handleArrowClick(true, rarrowRef);
            }}
          />
        </div>
      </div>
    </div>
  );
};

//function isInViewport(element: any) {
//  const rect = element.getBoundingClientRect();
//  return (
//    rect.top >= 0 &&
//    rect.left >= 0 &&
//    rect.bottom <=
//      (window.innerHeight || document.documentElement.clientHeight) &&
//    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//  );
//}

const Grid: any = (props: any) => {
  const quantityOfEntries = props.data.length;
  const minimumEntries = 20;
  // fill the grid with empty boxes if quantity of fetched entries
  // sliced & passed here is < 20
  function addRemaining() {
    let diff = minimumEntries - quantityOfEntries;
    return [...props.data, ...Array(diff)];
  }
  const ref = useRef<any>(null);
  const entries =
    quantityOfEntries < minimumEntries ? addRemaining() : props.data;
  useEffect(() => {
    props.index === 0 && props.setGridMounted(true);
  }, [props.slide]);
  useEffect(() => props.organizeGridNodes(ref.current), []);
  return (
    <div
      ref={ref}
      className={`inventory-grid 
      grid min-w-max grid-cols-5 py-4 grid-rows-4 gap-2 2xl:gap-3.5 ${
        props.index === 0 && "xl:pl-14"
      }  
      }`}
    >
      {entries.map((e: any, i: number) => (
        <Box
          i={i}
          key={i}
          data={e}
          isConsumable={props.isConsumable}
          isEmpty={e === undefined ? true : false}
        />
      ))}
    </div>
  );
};

const LoadingGrid = () => {
  const entries = [...Array(20)];
  return (
    <div
      className={`inventory-grid 
      grid min-w-max grid-cols-5 py-4 grid-rows-4 gap-2 2xl:gap-3.5 
       xl:pl-14
      }`}
    >
      {entries.map((e: any, i: number) => (
        <Box i={i} key={i} data={e} isEmpty={"loading"} />
      ))}
    </div>
  );
};

export default Inventory;
