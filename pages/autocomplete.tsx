import { useEffect, useRef, useState } from 'react'



const AutoComplete = () => {

  const [ place, setPlace ] = useState('')
  const [ suggestions, setSuggestions ] = useState([])

  useEffect(() => {
    const callGoogleApi = async() => {
      const url = 'https://places.googleapis.com/v1/places:autocomplete'
      console.log('hello from autocomplete')
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'X-Goog-Api-Key': process.env.NEXT_PUBLIC_MAPS_APIKEY
        },
        body: JSON.stringify({ input: place, includedRegionCodes: ['US']})
      });

      const resJson = await res.json();
      setSuggestions(resJson);
    }
    callGoogleApi()
    console.log('suggestions', suggestions)

  }, [place])




  return (
    <div>
      <input
        type='text'
        placeholder='address'
        onChange={(event) => setPlace(event.target.value)}
        className='outline-none border border-gray-400 rounded-md px-3 py-2'/>
        {suggestions.length > 0 ?
          suggestions.map(sugg => {
            return <p key={sugg.placePrediction.placeId}>{sugg.placePrediction.text.text}</p>
          }):
          <p>Loading ...</p>

        }

    </div>
  )

}



export default AutoComplete;