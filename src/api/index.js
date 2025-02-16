import axios from "axios";

export const updateUser = async (user) => {
  try {
    const res = await axios.post("http://localhost:3001/user", {
      email: user.email,
      name: user.name,
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
