declare type ref = React.MutableRefObject<HTMLDivElement>;
declare type div = HTMLDivElement;
declare type imgref = React.RefObject<HTMLImageElement>;
declare type view =
  | "weapons"
  | "bows"
  | "shields"
  | "armor"
  | "materials"
  | "consumables"
  | "favorites";
declare interface menuItem {
  title: string;
  src: string;
  key: view;
}
declare type menuItems = menuItem[];
declare type click = React.MouseEvent;
declare interface InvMenuItemProps {
  stateNodes: div[];
  view: view;
  index: number;
  setSlide: (pointerIndex: number) => void;
  slide: number;
  data: menuItem;
  length: number;
}

declare type ingredient = {
  id: number;
  title: string;
  type: string;
  effect: number;
  quantity: number;
};
declare interface Dish {
  id: number;
  title: string;
  effect?: string;
}

declare interface Potion {
  id: number;
  title: string;
  effect?: string;
}
declare type consumable = Dish | Potion;

declare interface gridProps {
  setGridMounted?: (arg: boolean) => void;
  organizeGridNodes: (el: ref) => void;
  data: ingredient[] | consumable[];
  length: number;
  index: number;
  slide: number;
  isConsumable: boolean;
}

declare interface BoxProps {
  isEmpty: boolean;
  i: number;
}

declare interface xy {
  x: number;
  y: number;
}
