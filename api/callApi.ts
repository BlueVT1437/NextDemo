import axios from "axios";

interface IApi {
  method: string;
  url: string;
  data?: object;
  token?: string | null;
  paramList?: object;
}

export const callHttp = (params: IApi) => {
  return axios({
    method: params.method,
    url: params.url,
    data: params.data,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${params?.token}`,
    },
    params: params.paramList,
  });
};
