import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Update if needed

// Attach token to headers if it exists
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/** USERS **/
export const registerUser = async (userData) => {
  try {
    const resp = await axios.post(`${BASE_URL}/user/register`, userData);
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to register user.");
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const resp = await axios.post(`${BASE_URL}/user/login`, credentials);
    const token = resp.data.token;
    
    if (token) {
      localStorage.setItem("token", token); // Store token after login
    }

    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Login failed. Check your credentials.");
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/user/profile`, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to fetch user profile.");
    throw error;
  }
};

/** CATEGORIES **/
export const fetchCategories = async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/categories`, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to fetch categories.");
    throw error;
  }
};

/** USER CATEGORIES **/
export const addUserCategory = async (categoryData) => {
  try {
    const resp = await axios.post(`${BASE_URL}/user-category`, categoryData, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to add category.");
    throw error;
  }
};

export const fetchUserCategories = async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/user-category`, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to fetch user categories.");
    throw error;
  }
};

/** HABITS **/
export const fetchHabits = async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/habit`, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to fetch habits.");
    throw error;
  }
};

export const addHabit = async (habitData) => {
  try {
    const resp = await axios.post(`${BASE_URL}/habit`, habitData, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to add habit.");
    throw error;
  }
};

export const deleteHabit = async (habit_id) => {
  try {
    await axios.delete(`${BASE_URL}/habit/${habit_id}`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error(error);
    alert("Failed to delete habit.");
    throw error;
  }
};

/** HABIT LOGS **/
export const logHabitCompletion = async (habit_id) => {
  try {
    const resp = await axios.post(`${BASE_URL}/habit-log/${habit_id}`, {}, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to log habit completion.");
    throw error;
  }
};

export const fetchHabitLogs = async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/habit-log`, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to fetch habit logs.");
    throw error;
  }
};

/** WATERING LOG **/
export const logWatering = async (category_id) => {
  try {
    const resp = await axios.post(`${BASE_URL}/watering/${category_id}`, {}, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to log watering.");
    throw error;
  }
};

export const fetchWateringLogs = async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/watering`, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to fetch watering logs.");
    throw error;
  }
};

/** PLANT GROWTH **/
export const fetchCurrentPlantPhase = async (category_id) => {
  try {
    const resp = await axios.get(`${BASE_URL}/plant/user-category/${category_id}`, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to fetch plant phase.");
    throw error;
  }
};

export const upgradePlantPhase = async (category_id) => {
  try {
    const resp = await axios.patch(`${BASE_URL}/plant/user-category/${category_id}`, {}, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to upgrade plant phase.");
    throw error;
  }
};

/** CHATBOT **/
export const chatWithBot = async (user_message) => {
  try {
    const resp = await axios.post(`${BASE_URL}/chatbot`, { user_message }, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to chat with bot.");
    throw error;
  }
};

export const fetchChatHistory = async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/chatbot`, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to fetch chat history.");
    throw error;
  }
};

/** TIME CAPSULE **/
export const createTimeCapsule = async (capsuleData) => {
  try {
    const resp = await axios.post(`${BASE_URL}/time-capsule`, capsuleData, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to create time capsule.");
    throw error;
  }
};

export const fetchTimeCapsules = async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/time-capsule`, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to fetch time capsules.");
    throw error;
  }
};

export const unlockTimeCapsule = async (capsule_id) => {
  try {
    const resp = await axios.patch(`${BASE_URL}/time-capsule/${capsule_id}`, {}, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    alert("Failed to unlock time capsule.");
    throw error;
  }
};
