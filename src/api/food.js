const baseURL = 'http://localhost:3000';

export const getDailyFood = async (
    token,
    food_date  //Date format should be: DD.MM.YYYY
) => {
    try {
        const response = await fetch(
            `${baseURL}/food?date=${food_date}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
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