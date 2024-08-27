import apiClient from "./apiClient";

export const fetchUser = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    // Handle error locally
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
};

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post("/users", userData);
    return response.data;
  } catch (error) {
    // Handle error locally
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

// Add more functions as needed
