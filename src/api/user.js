const baseURL = 'https://aybu-mobile.herokuapp.com';

export const register = async (deviceId, username, department, faculty) => {
  try {
    const response = await fetch(`${baseURL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deviceId,
        username,
        department,
        faculty,
      }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Register Error: ', error);
    return { error: true };
  }
};

export const updateProfile = async (token, department, username, faculty) => {
  try {
    const response = await fetch(`${baseURL}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        department,
        faculty,
        username,
      }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Update Profile Error: ', error);
    return { error: true };
  }
};

export const getProfile = async token => {
  try {
    const response = await fetch(`${baseURL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Get Profile Error: ', error);
    return { error: true };
  }
};

export const userRole = async token => {
  try {
    const response = await fetch(`${baseURL}/role/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Get User Role Error: ', error);
    return { error: true };
  }
};

export const deleteSelf = async token => {
  try {
    const response = await fetch(`${baseURL}/users/me`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Delete Profile Error: ', error);
    return { error: true };
  }
};

//admin
export const getAllUsers = async token => {
  try {
    const response = await fetch(`${baseURL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Get All Users Error: ', error);
    return { error: true };
  }
};