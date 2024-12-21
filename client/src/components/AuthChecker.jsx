import {useState, useEffect } from "react";

import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { GET_USER_INFO } from "@/utils/constants";

const AuthChecker = () => {
const [ setUserInfo ] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true, // Send cookies with the request
        });
        localStorage.setItem("userId", response.data.id);
      } catch (error) {
        if (error.response?.status === 401) {
          console.log("User not authenticated. No token available.");
        } else {
          console.error("Error fetching user info:", error);
          toast.error("Failed to fetch user info");
        }
      }
    };

    // Only attempt fetching user info if a token exists
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (token) {
      fetchUserInfo();
    }
  }, [setUserInfo]);

  return null; // Render nothing or a loading spinner if needed
};

export default AuthChecker;
