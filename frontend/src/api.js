const API_URL = "http://localhost:8000/accounts/";

export const fetchAccounts = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch account data");
    }
    return response.json();
};