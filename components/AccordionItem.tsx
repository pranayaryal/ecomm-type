import { useContext } from "react";
import React from "react";
import { AccordionContext, AccordionContextType } from "@/context/AccordionProvider";


const AccordionItem: React.FC<{children: React.ReactNode,
    className?: string,
    toggle: string }> = ({ toggle, children, className }) => {
  const ctxtVals: AccordionContextType | null = useContext(AccordionContext);
  return (
    <div
      onClick={ctxtVals?.toggleItem(toggle)}
      className={'block border-x-transparent border-b-transparent border outline-none border-t-1 border-gray-300 hover:text-red-500 cursor-pointer py-2 px-4 ' + className}
    >
      {children}

    </div>
  )
};

export default AccordionItem;