import axios from "axios";

const API_URL = "https://reqres.in/api/login";

export async function login(email, password) {
  try {
    const response = await axios.post(
      API_URL,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1" 
        }
      }
    );
    return response.data.token;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Login failed");
  }
}
