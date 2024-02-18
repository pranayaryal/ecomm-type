import { useRouter } from "next/router";
import { useEffect } from "react";
import type { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import Star from '@/components/Star'
import { Dispatch, SetStateAction } from 'react'
import { useState } from "react";
import { getAllProducts, getProduct, increaseCart, getToken } from "@/lib/backend";
import { useShoppingCart } from '@/context/ShoppingCartProvider' 
import axios from '@/lib/axios'

//const products = await getAllProducts();

export async function getStaticPaths() {
    const products = await getAllProducts();
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

type CreateParams = {
    setErrors: Dispatch<SetStateAction<string[]>>;
}

// export const getServerSideProps = async() => {
//     const products = await getAllProducts();
//     return { props: { products }}

// }



// export default function Page({ product }) {
export default function Page({ product }) {
    // const product = { 
    //     img: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg',
    //     title: 'title',
    //     description: 'Description',
    //     category: 'Mens',
    //     rating_rate: [9],
    //     rating_count: [3]

    // }
    const { increaseCartQuantity, getAllCartItems, cartItems } = useShoppingCart()
    
    const [errors, setErrors] = useState<string[]>([])
    const [cart, setCart] = useState([])
    const router = useRouter();

    const addToCart = async (id: number) => {
        increaseCart({ id, quantity: 1, setErrors })
    }

    const addToCartApi = async (id: number) => {
        increaseCartQuantity(id)
        //getAllCartItems()
    }

    const forgetCart = async () => {

    }

    //const product = products.find(prdt => prdt.id == router.query.id)


    return (
        <div className="flex">
            <div className="w-2/3">
                <img src={`${product.image}`} className="w-100 h-[50vh]" />

            </div>
            <div className='w-1/3'>
                <p>{product.category}</p>
                <p className="text-xl font-bold mt-3">{product.title}</p>
                <div className="flex space-x-2 mt-4">
                    <div className='flex items-center'>
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} />)}
                    </div>
                    <div>
                        {`${product.count} reviews`}
                    </div>
                </div>
                <hr className="mt-3" />
                <div className='flex mt-2 items-center justify-start text-center space-x-2'>
                    <p className="text-xl font-semibold">{`$${product.price}`}</p>
                    <p className='line-through text-gray-400'>{`${(1.15 * product.price).toFixed(2)}`}</p>
                    <span className='text-red-500 font-semibold'>15% off</span>
                </div>
                <div className='flex flex-col space-y-3 mt-4'>
                    <div>
                        Color:
                    </div>
                    <div className='flex space-x-4'>
                        <div className="cursor-pointer w-20 h-20 hover:border hover:border-gray-500 p-2">
                            <img src={product.image} className="w-full h-full object-center" />
                        </div>
                        <div className="w-20 h-20 hover:border hover:border-gray-500 p-2">
                            <img src={product.image} className="w-full h-full object-center" />
                        </div>
                        <div className="w-20 h-20 hover:border hover:border-gray-500 p-2">
                            <img src={product.image} className="w-full h-full object-center" />
                        </div>
                    </div>

                </div>
                <p className="mt-4">{product.description}</p>

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
                    onClick={() => addToCartApi(product.id)}
                    className='text-white mt-12 cursor-pointer focus:outline-none m-1.5 py-4 font-bold bg-vivid-purple w-full rounded-full'
                >
                    Add To Cart
                </button>
                {<p className='text-red-800 text-sm'>{errors}</p>}

            </div>
        </div>
    )

}
