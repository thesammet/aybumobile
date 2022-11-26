const baseURL = 'https://aybu-mobile.herokuapp.com';

export const rating = async (
    token,
    rating, //'like' or 'dislike'
    food_id
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
                food: food_id
            }),
        });

        const json = await response.json();
        return json;
    } catch (error) {
        console.log('Rating Error: ', error);
        return { error: true };
    }
};