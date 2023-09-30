const baseURL = 'https://aybu-mobile.herokuapp.com';

export const postSend = async (token, content, firToken) => {
  try {
    const response = await fetch(`${baseURL}/social-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
        firToken
      }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Social Post Error: ', error);
    return { error: true };
  }
};

export const getAllPosts = async (token, page, limit) => {
  try {
    const response = await fetch(`${baseURL}/social-post?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Get All Posts Error: ', error);
    return { error: true };
  }
};

export const ratePost = async (token, post_id) => {
  try {
    const response = await fetch(`${baseURL}/social-post-like/${post_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Social Post Like Error: ', error);
    return { error: true };
  }
};

export const deletePostAdmin = async (token, post_id) => {
  try {
    const response = await fetch(`${baseURL}/social-post/${post_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Delete Post Admin Error: ', error);
    return { error: true };
  }
};