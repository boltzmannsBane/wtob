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

declare type item = {
  id: number;
  title: string;
  type?: string;
  effect: number;
  quantity?: number;
};

declare interface gridProps {
  setGridMounted?: (arg: boolean) => void;
  organizeGridNodes: (el: ref) => void;
  data: item[];
  length: number;
  index: number;
  slide: number;
  isConsumable: boolean;
}

declare interface boxProps {
  isEmpty: boolean | string;
  i: number;
  data: item;
  isConsumable?: boolean;
}

declare interface contextMenuProps {
  data: item;
  close: () => void;
}

declare interface xy {
  x: number;
  y: number;
}

declare interface recipeProps {
  potions: string;
}

declare type referenceIngredient = {
  id: number;
  title: string;
  type: string;
  effect: number;
  quantity: number;
  referenceDish?: string;
  referenceDishId?: number;
  referencePotion?: string;
  referencePotionId?: number;
};

declare type referenceConsumable = {
  id: number;
  title: string;
  recipe: referenceIngredient[];
  effect?: string | number;
};

declare interface recipeData {
  potions: referenceConsumable[];
  dishes: referenceConsumable[];
}

declare interface recipesProps {
  data: recipeData;
}

declare interface uniqueRecipeProps {
  data: referenceConsumable;
  loading: boolean;
  setLoading: (arg: boolean) => void;
}

declare interface contextItemsProps {
  materials: referenceConsumable[][];
  consumables: referenceConsumable[][];
}

declare interface fetchData {
  ingredients: item[];
  consumables: item[];
}
