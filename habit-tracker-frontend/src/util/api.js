import axios from "axios";

const BASE_URL = "http://localhost:8080";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/** USERS **/
export const registerUser = async (userData) => {
  try {
    const resp = await axios.post(`${BASE_URL}/user/register`, userData);
    return resp.data;
  } catch (error) {
    console.log("Failed to register user:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const resp = await axios.post(`${BASE_URL}/user/login`, credentials);
    const token = resp.data.token;
    if (token) {
      localStorage.setItem("token", token);
    }
    return resp.data;
  } catch (error) {
    console.log("Login failed:", error);
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
    console.log("Failed to fetch user profile:", error);
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
    console.log("Failed to fetch categories:", error);
    throw error;
  }
};

export const fetchCategoryInfo = async (categoryName) => {
  try {
    const resp = await axios.get(`${BASE_URL}/categories/${categoryName}`, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.log("Failed to fetch category info.");
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
    console.log("Failed to add category:", error);
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
    console.log("Failed to fetch user categories:", error);
    throw error;
  }
};

export const fetchCategoryProgress = async (category_id) => {
  try {
    const resp = await axios.get(
      `${BASE_URL}/user-category/${category_id}/progress`,
      {
        headers: getAuthHeaders(),
      }
    );
    return resp.data;
  } catch (error) {
    console.log("Failed to fetch category progress.");
    throw error;
  }
};

/** HABITS **/
export const fetchHabits = async (categoryName) => {
  try {
    const resp = await axios.get(`${BASE_URL}/habit/${categoryName}`, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.log("Failed to fetch habits:", error);
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
    console.log("Failed to add habit:", error);
    throw error;
  }
};

export const deleteHabit = async (habit_id) => {
  try {
    await axios.delete(`${BASE_URL}/habit/${habit_id}`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.log("Failed to delete habit:", error);
    throw error;
  }
};

/** HABIT LOGS **/
export const logHabitCompletion = async (habit_id) => {
  try {
    const resp = await axios.post(
      `${BASE_URL}/habit-log/${habit_id}`,
      {},
      {
        headers: getAuthHeaders(),
      }
    );
    return resp.data;
  } catch (error) {
    console.log("Failed to log habit completion:", error);
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
    console.log("Failed to fetch habit logs:", error);
    throw error;
  }
};

/** WATERING LOG **/
export const logWatering = async (category_id) => {
  try {
    const resp = await axios.post(
      `${BASE_URL}/watering/${category_id}`,
      {},
      {
        headers: getAuthHeaders(),
      }
    );
    return resp.data;
  } catch (error) {
    console.log("Failed to log watering:", error);
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
    console.log("Failed to fetch watering logs:", error);
    throw error;
  }
};

/** PLANT GROWTH **/
export const fetchCurrentPlantPhase = async (category_id) => {
  try {
    const resp = await axios.get(
      `${BASE_URL}/plant/user-category/${category_id}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return resp.data;
  } catch (error) {
    console.log("Failed to fetch plant phase:", error);
    throw error;
  }
};

export const upgradePlantPhase = async (category_id) => {
  try {
    const resp = await axios.patch(
      `${BASE_URL}/plant/user-category/${category_id}`,
      {},
      {
        headers: getAuthHeaders(),
      }
    );
    return resp.data;
  } catch (error) {
    console.log("Failed to upgrade plant phase:", error);
    throw error;
  }
};

/** CHATBOT **/
export const chatWithBot = async (user_message) => {
  try {
    const resp = await axios.post(
      `${BASE_URL}/chatbot`,
      { user_message },
      {
        headers: getAuthHeaders(),
      }
    );
    return resp.data;
  } catch (error) {
    console.log("Failed to chat with bot:", error);
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
    console.log("Failed to fetch chat history:", error);
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
    console.log("Failed to create time capsule:", error);
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
    console.log("Failed to fetch time capsules:", error);
    throw error;
  }
};

export const unlockTimeCapsule = async (capsule_id) => {
  try {
    const resp = await axios.patch(
      `${BASE_URL}/time-capsule/${capsule_id}`,
      {},
      {
        headers: getAuthHeaders(),
      }
    );
    return resp.data;
  } catch (error) {
    console.log("Failed to unlock time capsule:", error);
    throw error;
  }
};
