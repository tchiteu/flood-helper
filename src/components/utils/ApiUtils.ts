import axios, { AxiosRequestConfig } from 'axios';
import { Occurrence } from './types';

axios.defaults.baseURL = 'http://172.20.76.187:3000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const getOccurrences = (params?: AxiosRequestConfig) => {
  return axios.get('/occurrences', params )
};

export const createOccurrence = (occurrence: Occurrence, onSuccess?: Function) => {
  occurrence = {
    created: new Date(),
    ...occurrence
  }
  axios.post('/occurrences', occurrence)
  .then(() => {
    if(onSuccess) {
      onSuccess()
    }
  })
  .catch((err) => {
    console.log(err.response)
  })
}