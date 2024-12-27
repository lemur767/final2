import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie';

// Function to decode the JWT from cookies
export const getDecodedToken = () => {
    const cookies = new Cookies
    const token = cookies.get("token");
        if (token) {
            return jwtDecode(token);
        }
    return null; // No token found
};
