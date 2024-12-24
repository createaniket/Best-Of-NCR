import axios from 'axios';

// const API_URL = 'https://session-backend-0aoq.onrender.com/api/auth/';
const API_URL = 'http://localhost:5000/user/';
const signup = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/signup`, {name, email, password });
    return response.data;
};

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    // console.log("hgchvghcjh", response)
    return response.data;
};

const logout = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

const SettingCustomExpiry = async (expirationDays, token) => {
    try {
        const response = await axios.post(`${API_URL}/update-token-custom-expiry`, 
        { expirationDays }, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating token with custom expiry:", error);
        throw error;
    }
};

export { signup, login, logout, SettingCustomExpiry };