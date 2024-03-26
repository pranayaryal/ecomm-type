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
      className={'block border-b-gray-500 hover:text-red-500 cursor-pointer py-2 px-0 ' + className}
    >
      {children}

    </div>
  )
};

export default AccordionItem;