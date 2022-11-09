import axios from "axios";


// handle Cross-Origin Resource Sharing (CORS) parameters
axios.defaults.headers.get['Access-Control-Allow-Origin'] = process.env.REACT_APP_API;
axios.defaults.headers.get['Access-Control-Allow-Credentials'] = true;


// send post request via this function 
export async function defaultPostRequest(endpoint, body) {
    const result = await axios
        .post(endpoint, body)
        .then((response) => {
            console.log(response)
            // return {
            //     response : 
                    return response
                // status : 
            // };
        })
        .catch((error) => {
            return errorHandler(error)
        });
    return result;
}


// in case of request fails
function errorHandler(error) {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        return {
            error : error.response.data,
            status: error.response.status
        }
    } else {
        console.log("Error", error.message);
        return {
            error : error.message,
            status: 500
        }
    }
    
}


// convert to percentage
export function ConvertToPercentage(val) {
    return (val / 100).toFixed(2)
}


// get rid of from file extension
export function cropFileName(text) {
    let lastIndex = text.lastIndexOf(".")
    let clearExtension = ''
    for (let i = 0; i < text.length; i++) {
        if (i < lastIndex)
            clearExtension += text[i].toString();
    }
    return clearExtension
}