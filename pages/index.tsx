import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import Faq from '@/components/Faq'
import ImageZoom from '@/components/ImageZoom'
import ImageMagnifier from '@/components/ImageMagnifier'
import { CardPage } from '@/components/CardPage'
import { CartItem } from '@/context/CartProvider'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { getAllProducts } from '@/lib/backend'
import { useShoppingCart } from '@/context/ShoppingCartProvider'
import Layout from '@/components/layout'
import HeroSection from '@/components/HeroSection'

// import { useShoppingCartLocal } from '@/context/ShoppingCartProviderLocal'

export default function Page() {

  const { user } = useAuth({ middleware: '', redirectIfAuthenticated: ''});
  const { products, getProducts } = useShoppingCart()


  useEffect(() => {
    getProducts()
    console.log('prdts', products)
  }, [])


  return (
    <Layout>
      {/* <HeroSection /> */}
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


    </Layout>
  )
}

