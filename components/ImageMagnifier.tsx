import React from 'react'
import { useState } from 'react'

export default function ImageMagnifier({ imageUrl }) {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [showMagnifier, setShowMagnifier] = useState(false)
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

    const handleMouseHover = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect()

        const x = ((e.pageX - left - window.scrollX) / width) * 100
        const y = ((e.pageY - top - window.scrollY) / height) * 100
        let cursorX = e.pageX - left - window.scrollX
        let cursorY = e.pageY - top - window.scrollY

        cursorX = Math.max(0, cursorX)
        cursorY = Math.max(0, cursorY)

        setPosition({ x, y })

        setCursorPosition({ x: cursorX, y: cursorY })


    }

    return (
        <div className='relative'
            onMouseEnter={() => setShowMagnifier(true)}
            onMouseLeave={() => setShowMagnifier(false)}
            onMouseMove={handleMouseHover}
        >
            {/* Display the main image */}
            {/* magnifier-img */}
            <img src={imageUrl} alt="" className='w-auto h-[80vh]' />

            { showMagnifier &&
                <div style={{
                    position: 'absolute',
                    left: `${cursorPosition.x - 100}px`,
                    top: `${cursorPosition.y - 100}px`,
                    pointerEvents: 'none'

                }}>
                    {/* magnifier-image */}
                    <div className='w-[200px] h-[200px] border-2 border-black-500 bg-no-repeat'
                        style={{
                            backgroundImage: `url(${imageUrl})`,
                            backgroundPosition: `${position.x}% ${position.y}%`,

                        }}
                    >

                    </div>
                </div>
            }


        </div>
    )
}
