const baseURL = 'https://aybu-mobile.herokuapp.com';

export const getMonthlyFood = async token => {
  try {
    const response = await fetch(`${baseURL}/food`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Get Daily Food Error: ', error);
    return {error: true};
  }
};

export const getTrends = async token => {
  try {
    const response = await fetch(`${baseURL}/trend`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Get Daily Food Error: ', error);
    return {error: true};
  }
};
