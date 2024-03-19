import React from 'react'


const PhoneNumber = ({ phone, handlePhoneChange}) => {
    return (
        <div className='flex flex-col mt-4'>
            <label className='text-xs'>Mobile Number</label>
            <input
                className='outline-none px-3 py-3 border border-black'
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(xxx) xxx-xxxx"
                maxLength={14}
            />
        </div>
    );
}




export default PhoneNumber