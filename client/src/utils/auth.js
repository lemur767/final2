import { jwtDecode } from "jwt-decode";

// Function to decode the JWT from cookies
export const getDecodedToken = () => {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];

    if (token) {
        return jwtDecode(token);
        console.log(jwtDecode(token));
    }
    return null; // No token found
};
