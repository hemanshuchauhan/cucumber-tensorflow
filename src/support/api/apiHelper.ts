// apiHelper.ts
import axios from 'axios';

const BASE_URL = 'https://reqres.in';

export async function sendPostRequest(
  endpoint: string,
  data: Record<string, unknown>
) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await axios.post(url, data);
  return response.data;
}

export async function sendGetRequest(endpoint: string) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await axios.get(url);
  return response.data;
}
