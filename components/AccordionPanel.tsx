import { AccordionContext, AccordionContextType } from "@/context/AccordionProvider";
import React, { RefObject } from 'react'
import { useRef, useContext, useEffect, useState } from "react";


const AccordionPanel: React.FC<{ children: React.ReactNode, id: string, className?: string }> = ({ children, id }) => {
  const accordionRef = useRef<HTMLDivElement>(null)

  const calculateHeight = () => {
    const ctxtVals: AccordionContextType | null = useContext(AccordionContext)
    if (accordionRef.current && ctxtVals?.selected === id) {
      return { height: accordionRef.current.scrollHeight, opacity: 10 }
    }
    return {height: 0, opacity: 100}
  }

  return (
    <div
      ref={accordionRef}
      id={id}
      className="px-4 overflow-hidden md:overflow-x-hidden transition-height ease duration-300 text-gray-600"
      style={calculateHeight()}
    >
      {children}
    </div>
  )
};

export default AccordionPanel;