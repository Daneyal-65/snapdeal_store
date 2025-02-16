import { axios } from "axios";

export const updateUser = (user) => {
  const res = axios.post("http://localhost:3001/user", {
    email: user.email,
    name: user.name,
  });
  console.log(res);
};
