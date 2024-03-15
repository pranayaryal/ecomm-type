// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from '@/lib/axios'


export async function callUsPs({ address, setAddress }) {

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
  console.log('addressUsps,', address)
};

