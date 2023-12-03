import axios, { type AxiosResponse } from "axios"
import get from 'lodash/get'

const apiClient = axios.create({
    baseURL: `${get(window, 'appData.baseUrl')}admin`,
    withCredentials: true,
})

const apiClient2 = axios.create({
  baseURL: `${get(window, 'appData.baseUrl')}api`,
  withCredentials: true,
})

apiClient.defaults.maxRedirects = 0;

apiClient.interceptors.response.use((response: AxiosResponse<any, any>) => {
    if (response.request?.responseURL?.endsWith('/admin/authentication')) {
        window.open(response.request?.responseURL, "_blank")
        // location.href = response.request?.responseURL;
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
}, function (error) {
      console.log('axios', { error});
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export { apiClient, apiClient2 }