

// import {IBM_ApiKey} from '../credentials'
const { REACT_APP_IBM_ApiKey } = process.env;
const getIBMToken= async (apikey)=>{
alert(REACT_APP_IBM_ApiKey)
    const api_key =REACT_APP_IBM_ApiKey
    const url= "https://iam.ng.bluemix.net/identity/token"
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:  "grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=" + api_key
        
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  export {
   getIBMToken
  }
  