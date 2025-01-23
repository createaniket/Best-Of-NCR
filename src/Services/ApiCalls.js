import axios from 'axios';


const API_URL = process.env.REACT_APP_BASE_URL;


const FetchShopById = async(id) => {

    const response = await axios.get(`${API_URL}/shop/${id}`)

    return response.data;
}




const FetchAllShops = async() => {

    const response = await axios.get(`${API_URL}/shop/all`)

    return response.data;
}







const CastVoteForShop = async (id) => {
    console.log("iam hstetehe cast vote react", id)
    try {
        const token = localStorage.getItem('token'); // Replace with your actual token or method to get it
        const response = await axios.post(
            `${API_URL}/shop/vote/${id}`,
            {}, // Empty request body
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Correctly formatted Authorization header
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error casting vote for shop:", error.response?.data || error.message);
        throw error; // Re-throw the error for further handling
    }
};


const DownVoteForShop = async (id) => {
    console.log("iam hstetehe cast vote react", id)
    try {
        const token = localStorage.getItem('token'); // Replace with your actual token or method to get it
        const response = await axios.post(
            `${API_URL}/shop/vote/${id}`,
            {}, // Empty request body
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Correctly formatted Authorization header
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error casting vote for shop:", error.response?.data || error.message);
        throw error; // Re-throw the error for further handling
    }
};




export {FetchShopById, FetchAllShops, CastVoteForShop,DownVoteForShop }