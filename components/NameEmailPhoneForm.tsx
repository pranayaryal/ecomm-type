import React, { Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import LoadingSpinner from "./LoadingSpinner";
import axios from '@/lib/axios'
import { useShoppingCart } from '@/context/ShoppingCartProvider'


// Used during checkout
const NameEmailPhoneForm = () => {
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

  // const [showNameEmailform, setShowNameEmailForm] = useState(true)
  const [useSpinner, setUseSpinner] = useState(false)

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
    },
    phone: {
      value: "",
      error: ""
    }

  })

  const [savedPersonal, setSavedPersonal] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  })

  const onChangeHandler = (field: string, value: string) => {
    let state = {
      [field]: {
        value,
        error: ""
      }
    }

    setPersonal({ ...personal, ...state })

  }

  const cancelNameEmailEdit = () => {


  }


  const savePersonal = async () => {
    let { email, firstName, lastName, phone } = personal;
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

    if (!phone.value) {
      updatedState.phone.error = "Phone is required";
      setPersonal({ ...updatedState });
      return;

    }
    setUseSpinner(true)
    const data = {
      email: personal.email.value,
      firstName: personal.firstName.value,
      lastName: personal.lastName.value,
      phone: personal.phone.value
    }
    // const response = await fetch('/api/personal', {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    const resJson = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/personal`, data)
      .then(dat => dat.data)
      .catch(err => console.log(err))


    if (resJson.personal_details) {
      const { email, firstName, lastName, phone } = resJson.personal_details
      const updatedPersonal = { ...personal }
      updatedPersonal.email.value = email
      updatedPersonal.firstName.value = firstName
      updatedPersonal.lastName.value = lastName
      updatedPersonal.phone.value = phone
      setPersonal(updatedPersonal)
      setSavedPersonal({ email, firstName, lastName, phone })
      closeNameEmail()
      openBilling()
      setUseSpinner(false)

      return

    }
    openNameEmail()
    closeBilling()
    setUseSpinner(false)
    return

  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    const updatedPersonal = { ...personal }
    updatedPersonal.phone.value = formattedPhone ? formattedPhone : ''
    setPersonal(updatedPersonal)
  }

  const formatPhoneNumber2 = (phoneNumber: string) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }


  const formatPhoneNumber = (value: string) => {

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

  const updateNameEmailPhone = () => {
    openNameEmail()
    closeBilling()
    closeShipping()
  }

  useEffect(() => {
    const getInitialData = async () => {
      // const resp = await fetch('/api/get-personal')
      const respJson = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/personal`)
        .then(dat => dat.data)
        .catch(err => console.log(err))

      // const respJson = await resp.json()
      if (respJson.personal_details) {
        console.log('you reached here')
        const { email, firstName, lastName, phone } = respJson.personal_details
        const updatedPersonal = { ...personal }
        updatedPersonal.email.value = email
        updatedPersonal.firstName.value = firstName
        updatedPersonal.lastName.value = lastName
        updatedPersonal.phone.value = phone
        setPersonal(updatedPersonal)
        closeNameEmail()
        // formBools.billingAddress = true
        // formBools.shippingAddress = false
        return

      }
      openNameEmail()
    }

    getInitialData()

  }, [])

  return (
    <div className='bg-white py-6 px-5 w-full'>
      <p className='text-sm font-bold'>My Information</p>
      <AnimatePresence initial={false}
      >
        {(showNameEmail) && (

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
            <div className='flex flex-col'>
              <div className='w-1/2 flex flex-col'>
                <label className={`text-xs ${personal.email.error ? 'text-red-400' : 'text-black'}`}>Email</label>
                <input
                  value={personal.email.value}
                  onChange={(e) => onChangeHandler("email", e.target.value)}
                  className={`text-xs mt-1 px-4 py-3 md:py-2 border outline-none ${personal.email.error ? 'border-red-300' : 'border-gray-200'}`} />

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
              <div className="flex flex-col mt-2 w-1/2">
                <label className={`text-xs ${personal.phone.error ? 'text-red-400' : 'text-black'}`}>Phone</label>
                <input
                  value={personal.phone.value}
                  maxLength={14}
                  onChange={(e) => handlePhoneChange(e)}
                  className={`text-xs mt-1 px-4 py-2 border outline-none ${personal.phone.error ? 'border-red-300' : 'border-gray-200'}`} />

              </div>
              {useSpinner ? (
                <button
                  className='bg-black text-white w-[50%] text-sm py-3 px-3 ml-auto mr-auto mt-8 hover:bg-gray-800'>
                  <LoadingSpinner />
                </button>
              ) :
                (
                  <button
                    onClick={() => savePersonal()}
                    className='bg-black text-white w-full md:w-[50%] text-sm py-3 px-3 ml-auto mr-auto mt-12 hover:bg-gray-800'>
                    Save
                  </button>

                )}
              {!showBilling && <button
                onClick={() => closeNameEmail()}
                className='text-xs flex w-[50%] ml-auto mr-auto mt-3 space-x-3 items-center justify-center'>
                <span>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" height="16" width="16"><path d="M1.854 1.146a.5.5 0 1 0-.708.708L7.293 8l-6.146 6.146a.5.5 0 0 0 .707.708L8 8.707l6.146 6.147a.5.5 0 0 0 .708-.708L8.707 8l6.147-6.146a.5.5 0 1 0-.707-.708L8 7.293 1.854 1.146Z"></path></svg>
                </span>
                <p>Cancel</p>
              </button>}

            </div>

          </motion.section>)}
        {(!showNameEmail) && <div className='mt-3 text-xs flex justify-between'>
          <div>
            <p>Email: {personal.email.value}</p>
            <p className='mt-2'>{`${personal.firstName.value} ${personal.lastName.value}`}</p>
            <p className='mt-2'>{`${personal.phone.value}`}</p>
          </div>
          <p onClick={updateNameEmailPhone} className='text-xs cursor-pointer'>Change</p>
        </div>}

      </AnimatePresence>
    </div >

  )
}


export default NameEmailPhoneForm