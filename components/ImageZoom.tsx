import React from 'react'
import { useRef, useEffect, useState } from 'react'

export default function ImageZoom() {
  const [cursorPos, setCursorPos] = useState({})
  const [showLens, setShowLens] = useState(false)

  const imageRef = useRef(null)
  const lensRef = useRef(null)
  const getCursor = () => {
    // let e = window.event
    let bounds = imageRef.getBoudingClientRect()
  }

  const onMouseLeftImage = () => {
    lensRef.current.style.backgroundImage = null;
    lensRef.current.style.height = 0;
    lensRef.current.style.width = 0;

  }

  const onImageHover = () => {
      if (!imageRef.current?.contains(event.target)) {
        return
      }
      const ratio = 3;
      // setLensDims({x: imageRef.current.width, y: imageRef.current.height})
      lensRef.current.style.height = imageRef.current.style.height
      lensRef.current.style.width = imageRef.current.style.width
      lensRef.current.style.backgroundImage = `url(${imageRef.current.src})`
      let bounds = imageRef.current.getBoundingClientRect()
      let cursorX = event.pageX - bounds.left
      let cursorY = event.pageY - bounds.top

      cursorX = cursorX - window.scrollX
      cursorY = cursorY - window.scrollY

      cursorX = Math.max(0, cursorX)
      cursorY = Math.max(0, cursorY)
      if (cursorX === 0) {
        lensRef.current.backgroundImage = null;
      }



      // let positionLeft = cursorX - (lensRef.current.offsetWidth / 2)
      // let positionTop = cursorY - (lensRef.current.offsetHeight / 2)

      // positionLeft = Math.max(positionLeft, 0)
      // positionTop = Math.max(positionTop, 0)


      // positionTop = Math.min(positionTop, (imageRef.current.height - lensRef.current.offsetHeight / 3))
      // positionLeft = Math.min(positionLeft, imageRef.current.width - lensRef.current.offsetWidth / 3)

      // lensRef.current.style.left = `${positionLeft}px`
      // lensRef.current.style.top = `${positionTop}px`

      lensRef.current.style.backgroundPosition = `-${(cursorX * ratio)}px -${(cursorY * ratio)}px`;

  }



  useEffect(() => {

    const handleImageHover = (event) => {
      if (!imageRef.current?.contains(event.target)) {
        return
      }
      const ratio = 2;
      // setLensDims({x: imageRef.current.width, y: imageRef.current.height})
      lensRef.current.style.backgroundImage = `url(${imageRef.current.src})`
      let bounds = imageRef.current.getBoundingClientRect()
      let cursorX = event.pageX - bounds.left
      let cursorY = event.pageY - bounds.top

      cursorX = cursorX - window.scrollX
      cursorY = cursorY - window.scrollY

      cursorX = Math.max(0, cursorX)
      cursorY = Math.max(0, cursorY)
      if (cursorX === 0) {
        lensRef.current.backgroundImage = null;
      }



      // let positionLeft = cursorX - (lensRef.current.offsetWidth / 2)
      // let positionTop = cursorY - (lensRef.current.offsetHeight / 2)

      // positionLeft = Math.max(positionLeft, 0)
      // positionTop = Math.max(positionTop, 0)


      // positionTop = Math.min(positionTop, (imageRef.current.height - lensRef.current.offsetHeight / 3))
      // positionLeft = Math.min(positionLeft, imageRef.current.width - lensRef.current.offsetWidth / 3)

      // lensRef.current.style.left = `${positionLeft}px`
      // lensRef.cu/rrent.style.top = `${positionTop}px`

      lensRef.current.style.backgroundPosition = `-${(cursorX * ratio)}px -${(cursorY * ratio)}px`;

    };
    // window.addEventListener('mousemove', handleImageHover)
    return () => {
      window.removeEventListener('mousemove', handleImageHover)
    }
  }, [])



  return (
    <>
      <div id="img-container" className='relative z-10 w-1/2'>
        <img
          onMouseMove={(e) => onImageHover()}
          onMouseLeave={() => onMouseLeftImage()}
          className='pointer border border-gray-700  object-cover'
          id="featured" ref={imageRef} src="/shoe1.jpg" />

      </div>
      <div className='relative w-1/2'>
        <div id="lens" ref={lensRef}
          className={`bg-no-repeat z-20 object-cover w-[400px] h-[400px] cursor-none`}>
        </div>
      </div>
    </>
  )
}
