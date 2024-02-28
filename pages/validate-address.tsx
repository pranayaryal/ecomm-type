import { useEffect, useRef, useState } from 'react'



const ValidateAddress = () => {

  const [ address, setAddress ] = useState({
    street: '3206 running deer circle',
    city: 'louisville',
    state: 'ky',
    zip: '40241'
  })

  useEffect(() => {
    const callUsPs = async() => {
      const urlStart = 'https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML='
      const urlSecond = encodeURIComponent('<AddressValidateRequest USERID="444STUDE4782"><Address ID="0"><FirmName /><Address1 /><Address2>');
      const urlStreet = address.street;
      const urlThird = encodeURIComponent('</Address2><City></City><State></State><Zip5>')
      const urlZip = address.zip
      const urlEnd = encodeURIComponent('</Zip5><Zip4></Zip4></Address></AddressValidateRequest>');
      const url = `${urlStart}${urlSecond}${urlStreet}${urlThird}${urlZip}${urlEnd}`

      const res = await fetch(url)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
        .then(data => data)

      // const res = await resXml;
      console.log('validateAddress', res)

      var xCity = res.getElementsByTagName('City')[0];
      var city = xCity.childNodes[0];
      var xZipExt = res.getElementsByTagName('Zip4')[0];
      var zip = xZipExt.childNodes[0];
      var xState = res.getElementsByTagName('State')[0];
      var state = xState.childNodes[0];
      var xStreet = res.getElementsByTagName('Address2')[0];
      var street = xStreet.childNodes[0];
      setAddress({city, state, zip, street})
    }
    // callUsPs()

  }, [])




  return (
    <div>
      <div className='flex flex-col w-2/5'>
        <input type='text' placeholder='Street' className='text-sm border border-gray-500 outline-none px-3 py-2'/>
        <input type='text' placeholder='City' className='text-sm border border-gray-500 outline-none px-3 py-2'/>
        <input type='text' placeholder='State' className='text-sm border border-gray-500 outline-none px-3 py-2'/>
        <input type='text' placeholder='Zip' className='text-sm border border-gray-500 outline-none px-3 py-2'/>
        <button className='bg-black text-white w-1/2 py-3'>Validate</button>

      </div>

    </div>
  )

}



export default ValidateAddress;