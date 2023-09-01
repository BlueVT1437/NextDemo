import axios from 'axios';
import { store } from '../store/index';
import { refresh, logout } from '../store/auth/auth.actions';

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.user && state.auth.user.accessToken;
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      // config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    const state = store.getState();
    if (originalConfig.url !== "/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && originalConfig.url !== "/refresh-token") {
        try {
          const rs = await instance.post("/refresh-token", {
            refreshToken: state.auth.user && state.auth.user.refreshToken
          })

          const { accessToken, refreshToken } = rs.data.data;
          store.dispatch(refresh({ accessToken, refreshToken }));

          originalConfig.headers["Authorization"] = 'Bearer ' + accessToken;

          return instance(originalConfig);
        } catch (_error) {
          if (err.response.status === 401) {
            store.dispatch(logout());
          }
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;