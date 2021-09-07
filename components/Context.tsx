import { createContext, useEffect, useState } from "react";

export const Context = createContext<any>(null);

const ContextProvider = (props: any) => {
  const [items, setItems] = useState<any>({ materials: "", consumables: "" });
  useEffect(() => console.log(items), [items]);
  function last(val) {
    return val.length - 1;
  }
  const handleCraftRequest = (newItemTitle: string) => {
    let clone = { ...items };
    console.log(clone);
    let target = clone.consumables[clone.consumables.length - 1];
    if (target.length <= 19) {
      target.push({ title: newItemTitle });
    } else {
      target = clone.consumables;
      target.push([{ title: newItemTitle }]);
    }
    setItems(clone);
  };
  return (
    <Context.Provider value={{ items, setItems, handleCraftRequest }}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
