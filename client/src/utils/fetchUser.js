import { apiClient } from "../lib/api-client";
import { GET_USER_INFO } from "./constants.js";

export const fetchUserProfile = async () => {
    try {
        const response = await apiClient.get(GET_USER_INFO);
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
};


