import { error } from "console";
import { useEffect, useRef, useState } from "react";
import { json } from "stream/consumers";

const ValidateAddress = () => {
  const stateAbbr = ["KY", "OH"];

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

  const onChangeHandler = (field: string, value: string) => {
    console.log("triggered");
    let state = {
      [field]: {
        value,
        error: '',
      },
    };

    setAddress({ ...address, ...state });
  };

  const callUsPs = async () => {
    // if (!address.state ||
    //     !address.city ||
    //     !address.street ||
    //     !address.zip){
    //   return
    // }
    const urlStart =
      "https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=";
    const urlSecond = encodeURIComponent(
      '<AddressValidateRequest USERID="444STUDE4782"><Address ID="0"><FirmName /><Address1 /><Address2>'
    );
    const urlStreet = address.street.value;
    const urlThird = encodeURIComponent(
      "</Address2><City></City><State></State><Zip5>"
    );
    const urlZip = address.zip.value;
    const urlEnd = encodeURIComponent(
      "</Zip5><Zip4></Zip4></Address></AddressValidateRequest>"
    );
    const url = `${urlStart}${urlSecond}${urlStreet}${urlThird}${urlZip}${urlEnd}`;

    const res = await fetch(url)
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => data);

    console.log("validateAddress", res);
    let updatedState = { ...address };

    var errorDesc =
      res.getElementsByTagName("Description")[0]?.childNodes[0].nodeValue;
    if (errorDesc) {
      updatedState.street.error = errorDesc;
      setAddress({ ...updatedState });
      return;
    }

    const city = res.getElementsByTagName("City")[0]?.childNodes[0].nodeValue;
    const state = res.getElementsByTagName("State")[0]?.childNodes[0].nodeValue;
    const zip = res.getElementsByTagName("Zip5")[0]?.childNodes[0].nodeValue;
    const street =
      res.getElementsByTagName("Address2")[0]?.childNodes[0].nodeValue;
    // var city = xCity.childNodes[0].nodeValue;
    updatedState.city.value = city;
    updatedState.state.value = state;
    updatedState.street.value = street;
    updatedState.zip.value = zip;
    if (!city) {
      console.log(res);
    }
    setAddress({ ...updatedState });
  };

  const handleSubmit = async () => {
    // Validates form and validates address
    let { street, city, state, zip } = address;
    let updatedState = { ...address };
    if (!street.value) {
      updatedState.street.error = "Street address is required";
      setAddress({ ...updatedState });
      return;
    }
    if (!city.value) {
      updatedState.city.error = "City is required";
      setAddress({ ...updatedState });
      return;
    }
    if (!state.value) {
      updatedState.state.error = "State is required";
      setAddress({ ...updatedState });
      return;
    }
    if (!zip.value) {
      updatedState.zip.error = "Zip is required";
      setAddress({ ...updatedState });
      return;
    }

    await callUsPs();
  };

  return (
    <div>
      <div className="flex flex-col w-2/5">
        <span className="text-red-500 text-xs">{address.street.error}</span>
        <input
          type="text"
          placeholder="Street"
          value={address.street.value}
          onChange={(e) => onChangeHandler("street", e.target.value)}
          className={`text-sm border outline-none px-3 py-2 ${address.street.error?.length === 0 ? 'border-gray-500': 'border-red-500'}`}
        />
        <span className="mt-2 text-red-500 text-xs">{address.city.error}</span>
        <span className="mt-2 text-red-500 text-xs">{address.state.error}</span>
        <div className="flex">
          <input
            value={address.city.value}
            onChange={(e) => onChangeHandler("city", e.target.value)}
            type="text"
            placeholder="City"
            className={`text-sm border outline-none px-3 py-2 ${address.city.error?.length === 0 ? 'border-gray-500': 'border-red-500'}`}
          />
          <input
            value={address.zip.value}
            onChange={(e) => onChangeHandler("zip", e.target.value)}
            type="text"
            placeholder="Zip"
            className={`text-sm border outline-none px-3 py-2 ${address.zip.error?.length === 0 ? 'border-gray-500': 'border-red-500'}`}
          />
          <select
            value={address.state.value}
            defaultValue=""
            className="px-3 py-3 outline-none"
            onChange={(e) => onChangeHandler("state", e.target.value)}
          >
            {stateAbbr.map((s) => {
              return (
                <option key={s} value={s}>
                  {s}
                </option>
              );
            })}
          </select>
        </div>
        <span className="mt-2 text-red-500 text-xs">{address.zip.error}</span>
        <button
          onClick={() => handleSubmit()}
          className="mt-2 bg-black text-white w-1/2 py-3"
        >
          Validate
        </button>
      </div>
    </div>
  );
};

export default ValidateAddress;
