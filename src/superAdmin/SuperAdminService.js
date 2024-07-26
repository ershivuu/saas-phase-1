import axios from "axios";
import { SUPER_ADMIN_BASE_URL } from "../config/config";

const getAuthToken = () => {
  let token = sessionStorage.getItem("Token");
  if (token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1); // Remove surrounding quotes if present
  }
  console.log("Cleaned Token:", token); // Verify cleaned token
  return token;
};

export const fetchCompanyData = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${SUPER_ADMIN_BASE_URL}/superadmin/admins`,
      {
        headers: {
          // Ensure the token is correctly formatted
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching company data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
