import React, { Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from "react";
import { states } from '@/components/states'
import LoadingSpinner from "./LoadingSpinner";
import axios from '@/lib/axios'
import { useShoppingCart } from '@/context/ShoppingCartProvider'


const AddressForm = () => {
  const { openNameEmail,
        closeNameEmail,
        openBilling,
        closeBilling,
        openShipping,
        closeShipping,
        showNameEmail,
        showBilling,
        showShipping
 } = useShoppingCart()

  const [useSpinner, setUseSpinner] = useState(false)
  const [addressDisplay, setAddressDisplay] = useState({
    'city': '',
    'state': '',
    'zip': '',
    'street': ''
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
  // Create function to validate telephone

  const updateAddressForm = () => {

  }


  const validateAddress = () => {
    // Validates form and validates address
    let { street, city, state, zip } = address;
    let updatedState = { ...address };
    if (!street.value) {
      updatedState.street.error = "Please enter an address";
      setAddress({ ...updatedState });
      return false;
    }
    if (!city.value) {
      updatedState.city.error = "Please enter a town/city";
      setAddress({ ...updatedState });
      return false;
    }
    if (!zip.value) {
      updatedState.zip.error = "Please enter a postal code (10710)";
      setAddress({ ...updatedState });
      return false;
    }

    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip.value);
    if (!isValidZip) {
      updatedState.zip.error = "Please enter a valid postal code (10710)";
      setAddress({ ...updatedState });
      return false
    }
    if (!state.value) {
      updatedState.state.error = "Please select a state";
      setAddress({ ...updatedState });
      return false;
    }

    return true;

  }

  const saveAddressToSession = async () => {

    const respJson = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/address`, {
      zip: address.zip.value,
      street: address.street.value,
      city: address.city.value,
      state: address.state.value,
      addressType: 'billing'
    })
      .then(dat => dat.data)
      .catch(err => console.log(err))

    // const respJson = await resp.json()
    if (respJson.hasOwnProperty("address")) {
      closeBilling()
      return

    }
    openBilling()

  }

  const handleSubmit = async () => {
    if (!validateAddress()) {
      return
    }

    setUseSpinner(true)


    const data = {
      streetAddress: address.street.value,
      city: address.city.value,
      state: address.state.value,
      ZIPCode: address.zip.value,
    }

    const resp = await fetch('/api/usps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })


    const respJson = await resp.json()
    const { respUspsAddJson } = respJson
    console.log('error Present', respUspsAddJson.hasOwnProperty('error'))

    // Handle errors
    if (respUspsAddJson.hasOwnProperty('error')) {
      const { respUspsAddJson: { error: { message } } } = respJson
      const updatedAddress = { ...address }
      updatedAddress.street.error = message
      setAddress({ ...updatedAddress })
      setUseSpinner(false)
      return

    }
    // No error, validated address is returned
    const { respUspsAddJson: { address: { streetAddress, city, state, ZIPCode } } } = respJson
    const updatedAddress = { ...address }
    updatedAddress.city.value = city
    updatedAddress.state.value = state
    updatedAddress.zip.value = ZIPCode
    updatedAddress.street.value = streetAddress
    setAddress({ ...updatedAddress })
    setAddressDisplay({ city, state, zip: ZIPCode, street: streetAddress })

    await saveAddressToSession()

    setUseSpinner(false)

    return



    // const updatedAddress = {...address}
    // updatedAddress.city.value = respJson.city
    // updatedAddress.street.value = respJson.street
    // updatedAddress.state.value = respJson.state
    // updatedAddress.zip.value = respJson.zip
    // setAddress({...updatedAddress})

    // If there is an error from 
    // if (!address.street.value){
    //   saveAddressToSession()
    // }

  };

  const onAddressChangeHandler = (field: string, value: string) => {
    let state = {
      [field]: {
        value,
        error: '',
      },
    };

    setAddress({ ...address, ...state });
  };


  useEffect(() => {
    const getAddressFromSession = async () => {

      const resp = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/address?addressType=billing`)
        .then(dat => dat.data)
        .catch(err => console.log(err))
      
      console.log('hi from resp address', resp.address)

      // const respJson = await resp.json()
      if (resp.address) {
        const { city, state, zip, street } = resp.address
        const updatedAddressDisplay = { ...addressDisplay }
        updatedAddressDisplay.street = street
        updatedAddressDisplay.city = city
        updatedAddressDisplay.zip = zip
        updatedAddressDisplay.state = state
        setAddressDisplay({ ...updatedAddressDisplay })

        const updatedAddress = { ...address }
        updatedAddress.street.value = street
        updatedAddress.city.value = city
        updatedAddress.zip.value = zip
        updatedAddress.state.value = state
        setAddress({ ...updatedAddress })
        closeBilling()

        return
      }
      openBilling()
    }

    getAddressFromSession()

  }, [])

  return (
    <div className='bg-white py-6 px-5 w-full flex flex-col'>
      <p className='text-sm font-bold'>Billing address</p>
      <AnimatePresence initial={false}>
        {showBilling && (
          <motion.section
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }

            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <>
              <p className='text-xs mt-2'>Enter your billing address</p>
              <div className='flex flex-col mt-4'>
                <label className='text-xs'>Address</label>
                <input
                  value={address.street.value}
                  onChange={(e) => onAddressChangeHandler("street", e.target.value)}
                  className={`text-xs mt-1 px-4 py-2 border outline-none ${address.street.error ? 'border-red-300' : 'border-gray-200'}`} />
                {(!address.street.error) && <span className='text-xs text-gray-500'>Street address, P.0 box or military address</span>}
                {address.street.error && <span className='text-xs text-red-400'>{address.street.error}</span>}
              </div>
              <div className='flex space-x-4 w-full mt-4'>
                <div className='flex flex-col w-1/2'>
                  <label className='text-xs'>Town/City</label>
                  <input
                    value={address.city.value}
                    onChange={(e) => onAddressChangeHandler("city", e.target.value)}
                    className={`text-xs mt-1 px-4 py-2 border outline-none ${address.city.error ? 'border-red-300' : 'border-gray-200'}`} />
                  {address.city.error && <span className='text-xs text-red-400'>{address.city.error}</span>}
                </div>
                <div className='flex flex-col w-1/2'>
                  <label className='text-xs'>Postal code</label>
                  <input
                    value={address.zip.value}
                    onChange={(e) => onAddressChangeHandler("zip", e.target.value)}
                    className={`text-xs mt-1 px-4 py-2 border outline-none ${address.zip.error ? 'border-red-300' : 'border-gray-200'}`} />
                  {address.zip.error && <span className='text-xs text-red-400'>{address.zip.error}</span>}
                </div>
              </div>
              <div className='flex flex-col mt-4 relative'>
                <label className='text-xs'>State</label>
                <select
                  className={`px-3 py-2 bg-white border appearance-none font-sans tracking-wide text-md ${address.state.error ? 'border-red-300' : 'border-gray-200'}`}
                  value={address.state.value} onChange={(e) => onAddressChangeHandler("state", e.target.value)}>
                  <option
                    className={`${address.state.error ? 'text-red-400' : 'text-black'}`}
                    value="">Select state</option>
                  {states.map((s) => (
                    <option
                      key={s.abbreviation} value={s.abbreviation}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <svg
                  className='h-[26px] absolute right-[8px] top-6 z-20'
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false">
                  <path d="M12 14.9l4.95-4.95.707.707-4.95 4.95-.707.707-5.657-5.657.707-.707L12 14.9z"></path></svg>

                {address.state.error && <span className='text-xs text-red-400'>{address.state.error}</span>}

              </div>
              {useSpinner ? (
                <button
                  className='bg-black text-white w-[50%] text-sm py-3 px-3 ml-auto mr-auto mt-8 hover:bg-gray-800'>
                  <LoadingSpinner />
                </button>
              ) :
                (
                  <button
                    onClick={handleSubmit}
                    className='bg-black text-white w-full md:w-[50%] text-sm py-3 px-3 ml-auto mr-auto mt-8 hover:bg-gray-800'>
                    Save
                  </button>

                )

              }
            </>

          </motion.section>
        )

        }
        {showBilling && (
          <div className='mt-3 text-xs flex justify-between'>
            <div className='text-xs'>
              <p>{addressDisplay.street}</p>
              <p>{addressDisplay.city} {addressDisplay.zip}</p>
              <p>{addressDisplay.state}</p>
              <p className='mt-2'>{ }</p>
            </div>
            <p
              onClick={() => updateAddressForm()} className='text-xs cursor-pointer'>
              Change
            </p>
          </div>

        )

        }

      </AnimatePresence>

    </div>
  )
}

export default AddressForm;