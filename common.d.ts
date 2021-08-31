declare type DivRef = React.MutableRefObject<HTMLDivElement | null>;

declare type Ingredient = {
  id: number;
  title: string;
  type: string;
  effect: number;
  quantity: number;
};

//replace placeholder "any" with proper types once the mock data is no longer needed
declare type Spliced = any[][];
declare type eee = Ingredient | undefined;
// here as well
declare interface InventoryProps {
  data: any;
}

//replace this later
declare interface Ass {
  data: eee[];
  index: number;
  length: number;
}

declare interface BoxProps {
  isEmpty: boolean;
  i: number;
}

declare interface xy {
  x: number;
  y: number;
}
