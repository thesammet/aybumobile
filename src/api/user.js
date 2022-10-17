const baseURL = 'http://localhost:3000';

export const register = async (
    deviceId,
    username
) => {
    console.log(
        deviceId,
        username
    );

    try {
        const response = await fetch(`${baseURL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceId,
                username
            }),
        });

        const json = await response.json();
        return json;
    } catch (error) {
        console.log('Register Error: ', error);
        return { error: true };
    }
};

export const login = async (
    deviceId
) => {
    console.log(
        deviceId
    );

    try {
        const response = await fetch(`${baseURL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceId
            }),
        });

        const json = await response.json();
        return json;
    } catch (error) {
        console.log('Login Error: ', error);
        return { error: true };
    }
};