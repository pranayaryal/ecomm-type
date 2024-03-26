import Faq from '@/components/Faq'
import { CardPage } from '@/components/CardPage'
import { useShoppingCart } from '@/context/ShoppingCartProvider'
import Layout from '@/components/layout'

// import { useShoppingCartLocal } from '@/context/ShoppingCartProviderLocal'

export default function Page() {

  // const { user } = useAuth({ middleware: '', redirectIfAuthenticated: ''});
  const { products } = useShoppingCart()

  // const [products, setProducts] = useState([])



  // useEffect(() => {
  //   const awaitProds = async () => {
  //     const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`;
  //     await axios.get(url)
  //     .then(res => setProducts(res.data))

  //   }
  //   awaitProds()
  // }, [])


  return (
    <Layout>
      {/* <HeroSection /> */}
      <div className='flex mt-16 flex-wrap'>
        {products?.map(product => {
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

