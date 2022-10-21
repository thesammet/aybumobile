const baseURL = 'http://localhost:3000';

export const postComment = async (
    token,
    comment) => {
    try {
        const response = await fetch(
            `${baseURL}/comments`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    comment
                }),
            },
        );

        const json = await response.json();
        return json;
    } catch (error) {
        console.log('Post Comment Error: ', error);
        return { error: true };
    }
};