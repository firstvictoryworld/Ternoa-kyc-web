export const verifyResponse = response => {
    // console.log(response.headers.get("x-access-token"))
    // console.log(response.headers)
    return response.ok ? response : Promise.reject(response);
}

export const handleError = error => {
    // console.log(error)
    // error.json().then(json => Promise.reject(json));
    // Promise.reject(error);
    return error.ok ? error : Promise.reject(error);
}