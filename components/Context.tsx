import { createContext, useEffect, useState } from "react";

export const Context = createContext<any>(null);

const ContextProvider = (props: any) => {
  const [foo, setFoo] = useState<any>();
  const [items, setItems] = useState<any>({ materials: "", consumables: "" });
  const [slide, setSlide] = useState<number>(0);
  // const handleCraftRequest = (newItemTitle: string) => {
  //   let clone = { ...items };
  //   let target = clone.consumables[clone.consumables.length - 1];
  //   if (target.length <= 19) {
  //     target.push({ title: newItemTitle });
  //           setItems(clone);
  //   } else {
  //     target = clone.consumables;
  //     target.push([{ title: newItemTitle }]);
  //          setItems(clone);
  //         setSlide(4);
  //   }
  // };
  async function handleCraftRequest() {
    await refetch().then((res) => {
      cut(res);
      res.ok && console.log("fetched");
    });
  }
  function cut(e) {
    let splicedData: any[] = [];
    spliceData(e.ingredients, splicedData);
    setItems((prev: any) => ({ ...prev, materials: splicedData }));
    splicedData = [];
    spliceData(e.consumables, splicedData);
    setItems((prev: any) => ({ ...prev, consumables: splicedData }));
  }
  useEffect(() => {
    refetch().then((res) => {
      cut(res);
    });
  }, []);

  return (
    <Context.Provider
      value={{
        items,
        setItems,
        handleCraftRequest,
        slide,
        setSlide,
        foo,
        setFoo,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;

function spliceData(arr: any, dest: any): void {
  while (arr.length) {
    dest.push(arr.splice(0, 20));
  }
}

async function refetch() {
  let req = await fetch("./api/refetch");
  let data = await req.json();
  return data;
}
