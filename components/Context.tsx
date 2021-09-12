import { createContext, useEffect, useState } from "react";

export const Context = createContext<any>(null);

const ContextProvider = (props: any) => {
  const [foo, setFoo] = useState<any>();
  const [items, setItems] = useState<any>({ materials: "", consumables: "" });
  const [slide, setSlide] = useState<number>(0);
  const [stateNodes, setStateNodes] = useState<any>([]);
  const [key, setKey] = useState(0);
  function changeKey() {
    setKey((prev) => prev + 1);
  }
  async function handleCraftRequest() {
    await refetch().then((res) => {
      cut(res);
    });
  }
  async function handleConsumeRequest(id, title) {
    let sliceIndex = slide - 3;
    let clone = { ...items };
    let target = clone.consumables[sliceIndex];
    let index = target.map((e) => e.id).indexOf(id);
    if (target.length <= 1) {
      let req = await fetch("./api/consume", {
        method: "POST",
        body: JSON.stringify({ id: id, title: title }),
      });
      setSlide((prev) => prev - 1);
      clone.consumables.splice(sliceIndex, 1);
      setItems(clone);
      clone = [...stateNodes];
      clone.pop();
      setStateNodes(clone);
    } else {
      let req = await fetch("./api/consume", {
        method: "POST",
        body: JSON.stringify({ id: id, title: title }),
      });
      let res = await req.json();
      refetch().then((res) => cut(res));
    }
    if (clone.consumables[clone.consumables.length - 1].length <= 1 && slide !== (stateNodes.length - 1)) {
      clone = [...stateNodes];
      clone.pop();
      setStateNodes(clone);
    }
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
        key,
        changeKey,
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
