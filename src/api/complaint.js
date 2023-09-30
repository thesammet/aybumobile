const baseURL = 'https://aybu-mobile.herokuapp.com';

export const postComplaint = async (token, ownerId, title, description) => {
  try {
    const response = await fetch(`${baseURL}/complaint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ownerId: ownerId,
        title: title,
        description: description,
      }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('postComplaint Error: ', error);
    return {error: true};
  }
};
