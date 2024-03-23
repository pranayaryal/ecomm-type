import Star from '@/components/Star'
import { Dispatch, SetStateAction } from 'react'
import { useState } from "react";
import { getProduct } from "@/lib/backend";
import { useShoppingCart } from '@/context/ShoppingCartProvider'
import ProductLayout from "@/components/ProductLayout";

//const products = await getAllProducts();

export async function getStaticPaths() {
    const response = await fetch('http://localhost:3000/api/products', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }

    })
    let products = await response.json();
    products = products.products
    // const products = await getAllProducts();
    const pths = products.map(product => {
        return { params: { id: product.id.toString() } }
    })
    return {
        paths: pths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    const res = await getProduct(params.id)
    const product = res[0]
    return { props: { product } }
}


// export const getServerSideProps = async() => {
//     const products = await getAllProducts();
//     return { props: { products }}

// }



// export default function Page({ product }) {
export default function Page({ product }) {

    const { openCart, setCartQuantity } = useShoppingCart()

    const [showFlower, setShowFlower] = useState(false)

    const [errors, setErrors] = useState<string[]>([])

    const addToCart = async (id: number) => {
        setCartQuantity(id, 1)
        openCart()
    }

    return (
        <ProductLayout>
            <div className="flex space-x-1">
                {showFlower ?
                    <>
                        <div className="w-1/3 mt-12">
                            <img src='/flowershorts.jpeg' className="w-full h-full" /> :
                        </div>
                        <div className="w-1/3">
                            <img src='/flowershortside.webp' className="w-full h-full" />
                        </div>
                    </> :
                    <>
                        <div className="w-1/3 mt-12">
                            <img src='/denim.jpeg' className="w-full h-full" /> :
                        </div>
                        <div className="w-1/3">
                            <img src='/denim-side.webp' className="w-full h-full" />
                        </div>

                    </>}
                <div className='w-1/3 py-6 px-6'>
                    <p className="text-md font-weight-350">{product.title}</p>
                    <p className="text-xl mt-2">{`$${product.price}`}</p>
                    <p className='mt-8 text-sm font-medium'>Light denim blue</p>
                    <div className='flex space-x-2 mt-2 cursor-pointer'>
                        <img
                         className={!showFlower ? `border border-black`: `border`}
                         onClick={() => setShowFlower(false)}
                            src="/denim-thumb.webp" />
                        <img
                         className={showFlower ? `border border-black`: 'border'}
                         onClick={() => setShowFlower(true)}
                         src="/flower-thumb.webp" />

                    </div>
                    <p className="mt-4 font-sans-fancy">{product.description}</p>

                    <p className='text-sm mt-4'>Quantity</p>
                    <div className='mt-2 flex space-x-1'>
                        <div
                            className="w-8 h-8 border hover:bg-gray-400 border-black flex items-center justify-center">-</div>
                        <div className="w-8 h-8 border border-black flex items-center justify-center"></div>
                        <div
                            className="w-8 h-8 border hover:bg-gray-400 border-black flex items-center justify-center">+</div>

                    </div>
                    <button
                        type="button"
                        onClick={() => addToCart(product.id)}
                        className='text-white mt-12 cursor-pointer focus:outline-none m-1.5 py-4 font-bold bg-black w-full hover:bg-gray-700'
                    >
                        Add To Cart
                    </button>
                    {<p className='text-red-800 text-sm'>{errors}</p>}

                </div>
            </div>
        </ProductLayout>
    )

}
