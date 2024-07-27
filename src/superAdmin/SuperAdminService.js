import axios from "axios";
import { SUPER_ADMIN_BASE_URL } from "../config/config";

const getAuthToken = () => {
  let token = sessionStorage.getItem("Token");
  if (token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }
  console.log("Cleaned Token:", token);
  return token;
};

export const getCompanyData = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${SUPER_ADMIN_BASE_URL}/superadmin/admins`,
      {
        headers: {
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
export const getCompanyCount = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${SUPER_ADMIN_BASE_URL}/superadmin/company-counts`,
      {
        headers: {
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
export const getActivePlan = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${SUPER_ADMIN_BASE_URL}/subscriptions/active`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Make sure this contains the expected data
  } catch (error) {
    console.error(
      "Error fetching company data:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw error to handle it further up the call stack if needed
  }
};
export const getSubscriptionPlan = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.get(
      `${SUPER_ADMIN_BASE_URL}/subscription-plans/getSubscriptions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Make sure this contains the expected data
  } catch (error) {
    console.error(
      "Error fetching company data:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw error to handle it further up the call stack if needed
  }
};
export const registerCompany = async (formValues) => {
  const token = getAuthToken(); // Function to get the auth token
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.post(
      `${SUPER_ADMIN_BASE_URL}/admin/register`,
      formValues, // Include form values in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Make sure this contains the expected data
  } catch (error) {
    console.error(
      "Error registering company data:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw error to handle it further up the call stack if needed
  }
};
export const updatePlanStatus = async (planId, status) => {
  const token = getAuthToken(); // Function to get the auth token
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    await axios.patch(
      `${SUPER_ADMIN_BASE_URL}/subscriptions/update/${planId}`,
      { plan_status: status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(
      "Error updating plan status:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const updatePlan = async (id, planData) => {
  const token = getAuthToken(); // Function to get the auth token
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await axios.put(
      `${SUPER_ADMIN_BASE_URL}/subscription-plans/subscriptions/edit/${id}`,
      planData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating plan:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      `Error updating plan: ${
        error.response ? error.response.data : error.message
      }`
    );
  }
};
