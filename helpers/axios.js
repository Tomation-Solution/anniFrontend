import * as axiosOriginal from 'axios';


//this app is only for anni so just hard code the short name here
export const tenantName = 'aanni'

export const baseURL= `https://rel8backend.herokuapp.com/tenant/${tenantName}`
const axios = axiosOriginal.create({
    baseURL,
})

export default axios;
