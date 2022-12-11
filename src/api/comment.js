const baseURL = 'https://aybu-mobile.herokuapp.com';

export const postComment = async (token, comment, food_id) => {
  try {
    const response = await fetch(`${baseURL}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment,
        food: food_id,
      }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Post Comment Error: ', error);
    return { error: true };
  }
};

export const commentRating = async (
  token,
  comment,
) => {
  try {
    const response = await fetch(`${baseURL}/comment-rating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment
      }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Post Comment Rating Error: ', error);
    return { error: true };
  }
};

export const getSingleFoodComment = async (token, food_id) => {
  try {
    const response = await fetch(`${baseURL}/comment/${food_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Get Single Food Comment Error: ', error);
    return { error: true };
  }
};

export const deleteComment = async (token, commentId) => {
  try {
    const response = await fetch(`${baseURL}/comment/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Delete Comment Error: ', error);
    return { error: true };
  }
};