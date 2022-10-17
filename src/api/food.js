const baseURL = 'http://localhost:3000';

export const getDailyFood = async (token) => {
    try {
        const response = await fetch(
            `${baseURL}/food`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `token ${token}`,
                },
            },
        );

        const json = await response.json();
        return json;
    } catch (error) {
        console.log('Get Daily Food Error: ', error);
        return { error: true };
    }
};