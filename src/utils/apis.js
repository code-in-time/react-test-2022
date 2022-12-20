import axios from 'axios';
import {URL} from './constData'

// The API to the payments
export const apiGetPayments = async (queryParam) => {

  const query = queryParam ? queryParam : ''
  const res = await axios.get(`${URL}/api/payments${query}`)
  return res;
}