import { useShoppingCart } from '@/context/ShoppingCartProvider';
import React from 'react'
import { useEffect, useRef } from 'react';
const style = {
  orientation: {
    right: `flex w-8/12 md:w-80 lg:w-96 h-full right-0 mx-0 my-0 absolute focus:outline-none `,
  },
  animation: {
    right: 'animate-drawer-right',
  },
  body: `flex-shrink flex-grow p-4`,
  headerTitle: `text-2xl md:text-3xl font-light`,
  content: `relative flex flex-col bg-white pointer-events-auto`,
  header: `items-start justify-between p-4 border-b border-gray-300`,
  container: `fixed top-0 right-0 z-40 w-full h-full m-0 overflow-hidden`,
  overlay: `fixed top-0 right-0 z-30 w-screen h-screen bg-black opacity-50`,
  footer: `flex flex-wrap items-center justify-end p-3 border-t border-gray-300`,
};

export const SideSlider = ({ openSide }) => {
  const { cartQuantity,
    cartItems,
    decreaseCartQuantity,
    increaseCartQuantity,
    closeCart,
    getItemQuantity
  } = useShoppingCart()

  const divRef = useRef(null)

  // close drawer when you click on "ESC" key
  useEffect(() => {
    const handleEscape = (event) => {
      if (!openSide) return;

      if (event.key === 'Escape') {
        closeCart();
      }
    };
    document.addEventListener('keyup', handleEscape);
    return () => document.removeEventListener('keyup', handleEscape);
  }, [openSide]);

  // hide scrollbar and prevent body from moving when drawer is open
  //put focus on drawer dialogue
  useEffect(() => {
    if (!openSide) return;

    divRef.current?.focus();

    const html = document.documentElement;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = 'hidden';
    html.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      html.style.overflow = '';
      html.style.paddingRight = '';
    };
  }, [openSide]);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!divRef.current?.contains(event.target)) {
        if (!openSide) return;
        closeCart();
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [openSide, divRef]);

  return (
    <div className="m-8">
      {openSide && (
        <>
          <div className="fixed top-0 right-0 z-30 w-screen h-screen bg-black opacity-50" />
          <div className="fixed top-0 right-0 z-40 w-full h-full m-0 overflow-hidden">
            <div
              aria-modal={true}
              className="flex w-8/12 md:w-80 lg:w-96 h-full right-0 mx-0 my-0 absolute focus:outline-none"
              ref={divRef}
              role="dialogue"
              tabIndex={-1}
            >
              <div className='relative flex flex-col bg-white pointer-events-auto'>
                <DrawerHeader>Drawer title</DrawerHeader>
                <DrawerBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </DrawerBody>
                <DrawerFooter>
                  <button
                    onClick={closeCart}
                    className="text-white focus:outline-none m-1.5 rounded px-6 py-2 font-medium bg-red-500"
                  >
                    Close
                  </button>
                  <button
                    onClick={closeCart}
                    className="text-white focus:outline-none m-1.5 rounded px-6 py-2 font-medium bg-blue-600"
                  >
                    Confirm
                  </button>
                </DrawerFooter>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/* Logic */

function DrawerHeader({ children }) {
  return (
    <div className={style.header}>
      <h4 className={style.headerTitle}>{children}</h4>
    </div>
  );
}

function DrawerBody({ children }) {
  return <div className={style.body}>{children}</div>;
}

function DrawerFooter({ children }) {
  return <div className={style.footer}>{children}</div>;
}