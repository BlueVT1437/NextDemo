import instance from "./axiosConfig";

export const apiCaller = ({ url, method, headers, params, data }) => {
  if (params) {
    return instance[method.toLowerCase()](url, { params }, { headers });
  }

  return instance[method.toLowerCase()](url, { ...data }, { headers });
};
