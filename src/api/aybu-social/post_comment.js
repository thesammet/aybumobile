const baseURL = 'https://aybu-mobile.herokuapp.com';

export const postCommentSend = async (token, content, post_id) => {
  try {
    const response = await fetch(`${baseURL}/social-post-comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
        post_id,
      }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Social Post Comment Error: ', error);
    return {error: true};
  }
};

export const getAllCommentsByPost = async (
  token,
  post_comment_id,
  page,
  limit,
) => {
  try {
    const response = await fetch(
      `${baseURL}/social-post-comment/${post_comment_id}?page=${page}&limit=${limit}`,
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
    console.log('Post Comments Posts Error: ', error);
    return {error: true};
  }
};

export const ratePostComment = async (token, post_id, post_comment_id) => {
  try {
    const response = await fetch(
      `${baseURL}/social-post-comment-rating/${post_comment_id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            post_id,
          }),
      },
    );

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Social Post Comment Rating Error: ', error);
    return {error: true};
  }
};

export const deleteSocialPostCommentAdmin = async (
  token,
  post_id,
  post_comment_id,
) => {
  try {
    const response = await fetch(
      `${baseURL}/social-post-comment/${post_comment_id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post_id,
        }),
      },
    );

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Delete Social Post Comment Admin Error: ', error);
    return {error: true};
  }
};
