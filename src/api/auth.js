import { _baseUrl } from "./config";

async function handleLoginOrRegister(email, password, _url) {
  try {
    const response = await fetch(`${_baseUrl}users/${_url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Save the token to localStorage
      localStorage.setItem("token", data.token);
      console.log("Success:", data.msg);
      return { msg: data.msg };
    } else {
      console.log("Error:", data.msg);
      return { error: data.msg };
    }
  } catch (error) {
    console.error("Error while handling login/register:", error);
    return { error: "server Error !" };
  }
}

async function getUserInfo() {
  // Get token from localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found. Please login first.");
    return;
  }

  try {
    const response = await fetch(`${_baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("User Information:", data);
    } else {
      console.log("Error:", data.msg);
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
}

export { getUserInfo, handleLoginOrRegister };
