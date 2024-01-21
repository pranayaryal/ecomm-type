import React from "react";
import { useCallback, useContext, useState, createContext } from "react";


export type AccordionContextType = {
    selected: string;
    toggleItem: (id: string) => () =>  void;

}

export const AccordionContext = createContext<AccordionContextType | null>(null)


const AccordionProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [selected, setSelected] = useState<string>("")

const toggleItem = useCallback((id: string) => () => {
    setSelected((prevState) => (prevState !== id ? id : ''))

  }, [])

  return (
    <AccordionContext.Provider value={{ selected, toggleItem }}>
      {children}
    </AccordionContext.Provider>

  )
};

export default AccordionProvider;