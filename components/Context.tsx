import { createContext, useEffect, useState } from "react";

export const Context = createContext<any>(null);

const ContextProvider = (props: any) => {
  const [items, setItems] = useState<any>({ materials: "", consumables: "" });
  const [slide, setSlide] = useState<number>(0);
  const [stateNodes, setStateNodes] = useState<any>([]);
  async function handleCraftRequest() {
    await refetch().then((res) => {
      cut(res);
      res.ok && console.log("fetched");
    });
    if (items.consumables[items.consumables.length - 1].length > 19) {
      setSlide(stateNodes.length);
    } else setSlide(stateNodes.length - 1);
  }
  async function handleConsumeRequest(id, title) {
    console.log("smth goin on");
    let req = await fetch("./api/consume", {
      method: "POST",
      body: JSON.stringify({ id: id, title: title }),
    });
    let res = await req.json();
    refetch().then((res) => cut(res));
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
        stateNodes,
        setStateNodes,
        handleConsumeRequest,
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
