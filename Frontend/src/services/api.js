
const apiClient = async (url, config) => {
    try {

        const response = await fetch(url, config);
        if (!response.ok) {
            const error = await response.json();
            return Promise.reject(new Error(error.message || 'Something went wrong'));
        }
        return Promise.resolve(response);

    } catch (error) {
        return Promise.reject(error);
    }
};

export default apiClient;

