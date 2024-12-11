import axios from 'axios';

export const fetchSampleData = () => {
    return axios.get<{ id: number; name: string }[]>('http://localhost:5000/api/sample');
};

// Function to add a calendar event
export const addCalendarEvent = async (userId: number, title: string, date: string) => {
    try {
        console.log('Sending request to add calendar event:', { userId, title, date }); // Log the request data
        const response = await axios.post('http://localhost:5000/api/courses/calendar', {
            userId,
            title,
            date,
        });
        return response.data;
    } catch (error) {
        console.error('Error adding calendar event:', error);
        throw error;
    }
};
