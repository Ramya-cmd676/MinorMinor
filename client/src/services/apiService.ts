import axios from 'axios';

export const fetchSampleData = () => {
    return axios.get<{ id: number; name: string }[]>('http://localhost:5000/api/sample');
};

// Function to add a calendar event
export const addCalendarEvent = async (userId: number, title: string, date: string) => {
    try {
        console.log('Sending request to add calendar event:', { userId, title, date });
        const response = await axios.post('http://localhost:5000/api/courses/calendar', {
            userId,
            title,
            date,
        });

        console.log('Event added successfully:', response.data);  // Log the response data
        return response.data;
    } catch (error) {
        // Check if the error is an AxiosError
        if (axios.isAxiosError(error)) {
            console.error('Axios error occurred:', error.response ? error.response.data : error.message);
        } else {
            console.error('Unknown error occurred:', error);
        }
        throw error;  // Re-throw the error to handle it in the calling function
    }
};
