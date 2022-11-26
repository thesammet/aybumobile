const baseURL = 'http://localhost:3000';

export const getAcademic = async (
    token,
    department_name
) => {
    try {
        const response = await fetch(
            `${baseURL}/academic/${department_name}`,
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
        console.log('Get Academic Error: ', error);
        return { error: true };
    }
};

//ONLY ADMIN
export const postAcademic = async (
    token,
    title,
    url
) => {
    try {
        const response = await fetch(
            `${baseURL}/academic`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    url
                })
            },
        );

        const json = await response.json();
        return json;
    } catch (error) {
        console.log('Post Academic Error: ', error);
        return { error: true };
    }
};