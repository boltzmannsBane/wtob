import { createContext, useState } from "react";

export const Context = createContext<any>(null);

const ContextProvider = (props: any) => {
	const [addConsumable, setAddConsumable] = useState<() => void | null>(null)
  return <Context.Provider value={{addConsumable, setAddConsumable}}>{props.children}</Context.Provider>;
};

export default ContextProvider;
