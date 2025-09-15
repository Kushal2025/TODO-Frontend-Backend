import { API_URL } from "./utils"

export const CreateTask = async (taskObj) => {
    const url = `${API_URL}/tasks`;
    console.log('url ', url)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskObj)
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}