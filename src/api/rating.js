const baseURL = 'https://aybu-mobile.herokuapp.com';

export const rating = async (
  token,
  rating, //'like' or 'dislike'
  food_id,
) => {
  try {
    console.log('token:', token);
    console.log('rating:', rating);
    console.log('food_id:', food_id);

    const response = await fetch(`${baseURL}/rating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      // body raw json
      body: JSON.stringify({
        rating: rating,
        food: food_id,
      }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Rating Error: ', error);
    return {error: true};
  }
};
