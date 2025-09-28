import axios from "axios";

const USER_API = "https://reqres.in/api/users";
const API_KEY = "reqres-free-v1";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
};

export async function fetchUsers() {
  try {
    const res = await axios.get(USER_API, axiosConfig);
    return res.data.data; // array of users
  } catch (err) {
    console.error("Fetch Users Error:", err.response?.data);
    throw new Error(err.response?.data?.error || "Failed to fetch users");
  }
}

export async function fetchUserById(id) {
  try {
    const res = await axios.get(`${USER_API}/${id}`, axiosConfig);
    return res.data.data;
  } catch (err) {
    console.error("Fetch User By ID Error:", err.response?.data);
    throw new Error(err.response?.data?.error || "Failed to fetch user details");
  }
}

export async function createUser(payload) {
  try {
    const res = await axios.post(USER_API, payload, axiosConfig);
    return { ...payload, id: res.data.id || Date.now(), createdAt: res.data.createdAt };
  } catch (err) {
    console.error("Create User Error:", err.response?.data);
    throw new Error(err.response?.data?.error || "Failed to create user");
  }
}

export async function updateUser(id, payload) {
  try {
    const res = await axios.put(`${USER_API}/${id}`, payload, axiosConfig);
    return { ...payload, id, updatedAt: res.data.updatedAt };
  } catch (err) {
    console.error("Update User Error:", err.response?.data);
    throw new Error(err.response?.data?.error || "Failed to update user");
  }
}

export async function deleteUser(id) {
  try {
    await axios.delete(`${USER_API}/${id}`, axiosConfig);
    return id;
  } catch (err) {
    console.error("Delete User Error:", err.response?.data);
    throw new Error(err.response?.data?.error || "Failed to delete user");
  }
}
