import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import Faq from '@/components/Faq'
import ImageZoom from '@/components/ImageZoom'
import ImageMagnifier from '@/components/ImageMagnifier'
import { CardPage } from '@/components/CardPage'

export default function Home() {
  
  type Product = {
    id: number;
    price: number;
  }

  const [selected, setSelected] = useState(0)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProducts(json))

  }, [])

  return (
    <main
      className='w-[80%] ml-auto mr-auto md:w-[100%] md:mt-16 max-w-[1500px] pr-0 md:pl-[50px] text-dark-slate-grey'
    >
      <div className='grid grid-cols-1 gap-y-4 md:gap-y-0 md:grid-cols-2 px-0 md:gap-x-8 md:auto-cols-fr py-[20px] justify-center'>
        <div className='flex items-start flex-col justify-center'>
          <h1 className='text-4xl mb-4'>Stop wasting time on security questionnaires</h1>
          <p>HyperComply is the easiest way for InfoSec and Sales leaders to share compliance information, automate security questionnaires, and accelerate sales.</p>
          <button className='hidden md:block mt-4 rounded-md border-2 border-[#273720] px-3 py-3 bg-yellow-custom text-sm'>Request a demo</button>


        </div>
        <div className='flex items-end flex-col justify-center'>
          <img src='https://assets-global.website-files.com/630955d355f57f38b7c3b1f5/656672e22bde4288b4d6e502_homepage-screenshot-xsm.webp' />

        </div>

      </div>
      <div className='flex mt-16 flex-wrap'>
        {products.map(product => {
          return <CardPage key={product.id} product={product} />
        })}
      </div>
      <div className='flex justify-between items-center mt-8'>
        <div className='w-full md:w-[45%] md:mr-[8%]'>
          <Faq />
        </div>
        <div className='hidden md:block w-[50%] mr-[8%]'>
          <div className='w-[100%] h-[24rem] flex justify-center items-center relative'>
            <img className='max-w-[100%] max-h-[100%] object-cover relative z-50'
              src="https://assets-global.website-files.com/630955d355f57f38b7c3b1f5/630b87e9e146c8f18aca6ece_test-ui.jpg"
            />
            <img className='absolute top-auto bottom-[-15%] left-[-5%] right-auto -z-1'
              src='https://assets-global.website-files.com/630955d355f57f38b7c3b1f5/630b89f597b687864a99bec9_product-texture-3.svg'
            />

          </div>
        </div>

      </div>


    </main>
  )
}
