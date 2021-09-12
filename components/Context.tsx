import { createContext, useEffect, useState } from "react";

export const Context = createContext<any>(null);

const ContextProvider = (props) => {
  const [items, setItems] = useState<contextItemsProps>({
    materials: [],
    consumables: [],
  });
  const [slide, setSlide] = useState<number>(0);
  const [stateNodes, setStateNodes] = useState<ref[]>([]);

  async function handleCraftRequest(title: string) {
    let newGrid = false;
    let isElixir = title.includes("Elixir");
    items.consumables[items.consumables.length - 1].length === 20 &&
      (newGrid = true);
    await refetch().then((res) => {
      cut(res);
    });
    if (newGrid) {
      !isElixir && setSlide(stateNodes.length);
    } else {
      isElixir
        ? setSlide(stateNodes.length - 3)
        : setSlide(stateNodes.length - 1);
    }
  }
  async function handleConsumeRequest(id, title) {
    let sliceIndex = slide - 3;
    let clone: any = { ...items };
    let target = clone.consumables[sliceIndex];
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
    if (
      items.consumables[items.consumables.length - 1].length <= 1 &&
      slide !== stateNodes.length - 1
    ) {
      if (slide !== stateNodes.length - 1) {
        clone = [...stateNodes];
        clone.pop();
        setStateNodes(clone);
      }
    }
  }
  function cut(e: fetchData) {
    let splicedData: item[][] = [];
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

function spliceData(arr: item[], dest: item[][]): void {
  while (arr.length) {
    dest.push(arr.splice(0, 20));
  }
}

async function refetch() {
  let req = await fetch("./api/refetch");
  let data = await req.json();
  console.log(data);
  return data;
}
