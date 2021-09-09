import { createContext, useEffect, useState } from "react";

export const Context = createContext<any>(null);

const ContextProvider = (props: any) => {
  const [items, setItems] = useState<any>({ materials: "", consumables: "" });
  const [slide, setSlide] = useState<number>(0);
  const handleCraftRequest = (newItemTitle: string) => {
    let clone = { ...items };
    let target = clone.consumables[clone.consumables.length - 1];
    if (target.length <= 19) {
      target.push({ title: newItemTitle });
      setItems(clone);
    } else {
      target = clone.consumables;
      target.push([{ title: newItemTitle }]);
      setItems(clone);
      setSlide(4);
    }
  };
  return (
    <Context.Provider
      value={{
        items,
        setItems,
        handleCraftRequest,
        slide,
        setSlide,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
