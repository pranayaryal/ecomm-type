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


export default function Home() {
  // const [ email, setEmail ] = useState("")
  // const [ firstName, setFirstName ] = useState("")
  // const [ lastName, setLastName ] = useState("")
  const [openForm, setOpenForm] = useState(false)
  const [ updatePersonal, setUpdatePersonal ] = useState(false)
  const [personal, setPersonal] = useState({
    email: {
      value: "",
      error: ""
    },
    firstName: {
      value: "",
      error: ""
    },
    lastName: {
      value: "",
      error: ""
    }

  })

  const [address, setAddress] = useState({
    street: {
      value: "",
      error: "",
    },
    city: {
      value: "",
      error: "",
    },
    state: {
      value: "",
      error: "",
    },
    zip: {
      value: "",
      error: "",
    },
  });

  const [ savedPersonal, setSavedPersonal ] = useState({
    email: '',
    firstName: '',
    lastName: ''
  })

  const personalIsSaved = () => {
    return savedPersonal.email
    && savedPersonal.firstName
    && savedPersonal.lastName
  }

  const onChangeHandler = (field: string, value: string) => {
    let state = {
      [field]: {
        value,
        error: ""
      }
    }

    setPersonal({ ...personal, ...state })

  }


  const onAddressChangeHandler = (field: string, value: string) => {
    console.log("triggered");
    let state = {
      [field]: {
        value,
        error: '',
      },
    };

    setAddress({ ...address, ...state });
  };


  const changePersonalDetails = () => {
    console.log('you clicke here')
    const currSaved = savedPersonal
    currSaved.email = ''
    currSaved.firstName = ''
    currSaved.lastName = ''
    setSavedPersonal(currSaved)
  }


  const { user } = useAuth({ middleware: '', redirectIfAuthenticated: '' });
  const { cartQuantity,
    cartItems,
    decreaseCartQuantity,
    increaseCartQuantity,
    products,
    getProducts,
    closeCart,
    removeCartItem,
    getItemQuantity
  } = useShoppingCart()

  const validateAddress = () => {
    // Validates form and validates address
    let { street, city, state, zip } = address;
    let updatedState = { ...address };
    if (!street.value) {
      updatedState.street.error = "Street address is required";
      setAddress({ ...updatedState });
      return false;
    }
    if (!city.value) {
      updatedState.city.error = "City is required";
      setAddress({ ...updatedState });
      return false;
    }
    if (!state.value) {
      updatedState.state.error = "State is required";
      setAddress({ ...updatedState });
      return false;
    }
    if (!zip.value) {
      updatedState.zip.error = "Zip is required";
      setAddress({ ...updatedState });
      return false;
    }

    return true;

  }


  const handleSubmit = async () => {
    if (!validateAddress()){
      return
    }

  };


  useEffect(() => {
    const getInitialData = async () => {
      getProducts()
      const resp = await fetch('/api/get-personal')
      const respJson = await resp.json()
      if (respJson.personal_details) {
        const { email, firstName, lastName } = respJson.personal_details
        const updatedPersonal = { ...personal }
        updatedPersonal.email.value = email
        updatedPersonal.firstName.value = firstName
        updatedPersonal.lastName.value = lastName
        setPersonal(updatedPersonal)
        if (email) {
          setUpdatePersonal(false)
          return
        }
        setUpdatePersonal(true)

      }
    }

    getInitialData()

  }, [])

  const savePersonal = async () => {
    let { email, firstName, lastName } = personal;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let updatedState = { ...personal };
    if (!emailRegex.test(email.value)) {
      updatedState.email.error = "Email is invalid";
      setPersonal({ ...updatedState });
      return;

    }
    if (!email.value) {
      updatedState.email.error = "Email is required";
      setPersonal({ ...updatedState });
      return;
    }
    if (!firstName.value) {
      updatedState.firstName.error = "City is required";
      setPersonal({ ...updatedState });
      return;
    }
    if (!lastName.value) {
      updatedState.lastName.error = "State is required";
      setPersonal({ ...updatedState });
      return;
    }
    const data = {
      email: personal.email.value,
      firstName: personal.firstName.value,
      lastName: personal.lastName.value
    }
    const response = await fetch('/api/personal', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resJson = await response.json()
    if (resJson.personal_details) {
      const { email, firstName, lastName } = resJson.personal_details
      const updatedPersonal = { ...personal }
      updatedPersonal.email.value = email
      updatedPersonal.firstName.value = firstName
      updatedPersonal.lastName.value = lastName
      setPersonal(updatedPersonal)
      setSavedPersonal({ email, firstName, lastName})
      setUpdatePersonal(false)

    }

  }






  return (
    <div className='max-w-[1188px] ml-auto mr-auto'>
      <div className='flex justify-center space-x-8'>
        <div className='flex flex-col gap-y-4 w-[66.67%] px-5'>
          <div className='bg-white py-6 px-5 w-full'>
            <p className='text-sm font-bold'>My Information</p>
            {(!updatePersonal) && <div className='mt-3 text-xs flex justify-between'>
              <div>
                <p>Email: {personal.email.value}</p>
                <p className='mt-2'>{`${personal.firstName.value} ${personal.lastName.value}`}</p>
              </div>
              <p onClick={() => setUpdatePersonal(true)} className='text-xs cursor-pointer'>Change</p>
            </div>}
            {(updatePersonal) && <div className='flex flex-col'>
              <div className='w-1/2 flex flex-col'>
                <label className={`text-xs ${personal.email.error ? 'text-red-400' : 'text-black'}`}>Email</label>
                <input
                  value={personal.email.value}
                  onChange={(e) => onChangeHandler("email", e.target.value)}
                  className={`text-xs mt-1 px-4 py-2 border outline-none ${personal.email.error ? 'border-red-300' : 'border-gray-200'}`} />

              </div>
              <div className='flex space-x-4 w-full mt-4'>
                <div className='flex flex-col w-1/2'>
                  <label className={`text-xs ${personal.firstName.error ? 'text-red-400' : 'text-black'}`}>First Name</label>
                  <input
                    value={personal.firstName.value}
                    onChange={(e) => onChangeHandler("firstName", e.target.value)}
                    className={`text-xs mt-1 px-4 py-2 border outline-none ${personal.firstName.error ? 'border-red-300' : 'border-gray-200'}`} />
                </div>
                <div className='flex flex-col w-1/2'>
                  <label className={`text-xs ${personal.lastName.error ? 'text-red-400' : 'text-black'}`}>Last Name</label>
                  <input
                    value={personal.lastName.value}
                    onChange={(e) => onChangeHandler("lastName", e.target.value)}
                    className={`text-xs mt-1 px-4 py-2 border outline-none ${personal.lastName.error ? 'border-red-300' : 'border-gray-200'}`} />
                </div>
              </div>
              <button
                onClick={() => savePersonal()}
                className='bg-black text-white w-[50%] text-sm py-3 px-3 ml-auto mr-auto mt-8 hover:bg-gray-800'>
                Save
              </button>

            </div>}
          </div>
          <div className='bg-white py-6 px-5 w-full flex flex-col'>
            <p className='text-sm font-bold'>Billing address</p>
            <p className='text-xs mt-2'>Enter your billing address</p>
            <div className='flex flex-col mt-4'>
              <label className={`text-xs ${address.street.error ? 'text-red-400' : 'text-black'}`}>Address</label>
              <input
                onChange={(e) => onAddressChangeHandler("street", e.target.value)}
                className={`text-xs mt-1 px-4 py-2 border outline-none ${address.street.error ? 'border-red-300' : 'border-gray-200'}`} />
              <span className='text-xs text-gray-500'>Street address, P.0 box or military address</span>
            </div>
            <div className='flex space-x-4 w-full mt-4'>
              <div className='flex flex-col w-1/2'>
                <label className={`text-xs ${address.city.error ? 'text-red-400' : 'text-black'}`}>Town/City</label>
                <input
                onChange={(e) => onAddressChangeHandler("city", e.target.value)}
                className={`text-xs mt-1 px-4 py-2 border outline-none ${address.city.error ? 'border-red-300' : 'border-gray-200'}`} />
              </div>
              <div className='flex flex-col w-1/2'>
                <label className={`text-xs ${address.zip.error ? 'text-red-400' : 'text-black'}`}>Postal code</label>
                <input
                onChange={(e) => onAddressChangeHandler("zip", e.target.value)}
                className={`text-xs mt-1 px-4 py-2 border outline-none ${address.zip.error ? 'border-red-300' : 'border-gray-200'}`} />
              </div>
            </div>
            <div className='flex flex-col mt-4'>
              <label className='text-xs'>State</label>
              <input
               onChange={(e) => onAddressChangeHandler("state", e.target.value)}
              className='px-4 py-2 border border-gray-200 outline-none' />
            </div>
            <button
              onClick={handleSubmit}
              className='bg-black text-white w-[50%] text-sm py-3 px-3 ml-auto mr-auto mt-8 hover:bg-gray-800'>
              Save
            </button>

          </div>
          <div className='bg-white py-6 px-5 w-full'>
            <p className='text-sm font-bold'>Shipping</p>
            <div className='flex mt-8 items-center space-x-2'>
              <input type='checkbox' className='w-3 h-3' />
              <p className='text-xs'>Same as my billing address</p>

            </div>
          </div>
          <button className='bg-black text-white py-3 w-1/3 mr-auto mx-auto'>Select</button>
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
  )
}
