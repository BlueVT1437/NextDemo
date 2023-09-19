import { createStore } from "swr-global-state";

interface IUserInfo {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

const useAuth = createStore<IUserInfo>({
  key: "@app/auth", // (Required) state key with unique string
  initial: {
    id: "",
    name: "",
    email: "",
    roles: [],
  }, // <- (Required) initial state
});

export default useAuth;
