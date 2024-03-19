import { useState, useEffect } from 'react'
import { useShoppingCart } from '@/context/ShoppingCartProvider'
import CheckoutLayout from '@/components/CheckoutLayout'
import NameEmailForm from '@/components/NameEmailForm'
import AddressForm from '@/components/AddressForm'
import ShippingAddressForm from '@/components/ShippingAddressForm'
import PhoneNumber from '@/components/PhoneNumber'


export default function Page() {
  const [isShippingSame, setIsShippingSame] = useState(true)
  const [phone, setPhone] = useState('')
  const [ phoneError, setPhoneError ] = useState('')


  const formatPhoneNumber = (value) => {

    const numericValue = value.replace(/\D/g, '')

    switch (numericValue.length) {
      case 0:
        return '';
      case 1:
      case 2:
      case 3:
        return numericValue;
      case 4:
      case 5:
      case 6:
        return `(${numericValue.slice(0, 3)}) ${numericValue.slice(3)}`;
      case 7:
      case 8:
      case 9:
        return `(${numericValue.slice(0, 3)}) ${numericValue.slice(3, 6)}-${numericValue.slice(6)}`;
      case 10:
        return `(${numericValue.slice(0, 3)}) ${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;
      default:
        return '';
    }


  }

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    setPhone(formattedPhone)
  }


  const handleCheckboxChange = (event) => {
    setIsShippingSame(event.target.checked);
  };

  useEffect(() => {
    console.log('isShippingSame', isShippingSame)

  }, [isShippingSame])


  const {
    cartItems,
    getProducts,
  } = useShoppingCart()


  useEffect(() => {
    const getInitialData = async () => {
      getProducts()
    }
    getInitialData()

  }, [])

  const savePhoneToSession = async() => {

  }


  return (
    <CheckoutLayout>
      <div className='max-w-[1188px] ml-auto mr-auto'>
        <a
          href="/edit-cart"
          className='cursor-pointer absolute left-10 top-10 flex items-center space-x-2'>
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" height="16" width="16"><path d="M8.162 13.869a.5.5 0 0 0 .676-.738L3.785 8.5H13.5a.5.5 0 0 0 0-1H3.785l5.053-4.631a.5.5 0 0 0-.676-.738l-6 5.5a.5.5 0 0 0 0 .738l6 5.5Z"></path></svg>
          <p className='text-xs hover:underline leading-6'>Back to shopping bag</p>
        </a>
        <p className='text-2xl font-bold text-center'>Checkout</p>
        <div className='mt-8 flex justify-center space-x-8'>
          <div className='flex flex-col gap-y-4 w-[66.67%] px-5 items-center'>
            <NameEmailForm />

            <AddressForm />

            <div className='bg-white py-6 px-5 w-full'>
              <p className='text-sm font-bold'>Shipping</p>
              <div className='flex mt-8 items-center space-x-2'>
                <input
                  type='checkbox'
                  checked={isShippingSame}
                  onChange={handleCheckboxChange}
                  className='w-3 h-3' />
                <p className='text-xs'>Same as my billing address</p>

              </div>
              {!isShippingSame && <ShippingAddressForm />}
              <PhoneNumber
                phone={phone}
                handlePhoneChange={handlePhoneChange}
                formatPhoneNumber={formatPhoneNumber}
              />
            </div>
            <button
              className='bg-black text-white py-3 w-1/3 mr-auto mx-auto'>Select</button>
          </div>
          {(cartItems === undefined || cartItems.length === 0) ?
            <p></p> :
            <div className='flex justify-top flex-col gap-y-8 bg-white w-1/3 p-4'>
              <p>Total</p>
              <p className='text-sm'>Shipping</p>
              <a href='/edit-cart'>
                <button className='px-3 py-2 bg-purple-100 w-full rounded-full'>Edit Cart</button>
              </a>

            </div>

          }

        </div>

      </div>
    </CheckoutLayout>
  )
}

