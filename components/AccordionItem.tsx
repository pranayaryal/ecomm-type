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
      className={'block font-light border-t text-xl md:text-3xl border-t-gray-300 cursor-pointer py-[1.5rem] px-0 ' + className}
    >
      {children}

    </div>
  )
};

export default AccordionItem;