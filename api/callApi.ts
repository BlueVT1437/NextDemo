import axios, { AxiosInstance } from "axios";

interface IApi {
  method: string;
  url: string;
  data?: object;
  token?: string;
}

const callHttp: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default callHttp;

// export const callHttp = (params: IApi) => {
//   axios({
//     method: params.method,
//     url: params.url,
//     data: params.data,
//     // headers: { "Content-Type": "multipart/form-data" },
//   })
//     .then((res) => {
// 			console.log('hello', res.data);
//       return res.data;
//     })
//     .catch((err) => err);
// };
