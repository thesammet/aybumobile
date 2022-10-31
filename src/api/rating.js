const baseURL = 'http://localhost:3000';

export const rating = async (
    token,
    rating,
    food_date  //Date format should be: DD/MM/YYYY
) => {
    try {
        const response = await fetch(`${baseURL}/rating`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                rating,
                food_date
            }),
        });

        const json = await response.json();
        return json;
    } catch (error) {
        console.log('Rating Error: ', error);
        return { error: true };
    }
};