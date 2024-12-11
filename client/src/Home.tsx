import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa'; // Importing a calendar icon
import ChatbotPopup from './ChatbotPopup';
import { addCalendarEvent } from './services/apiService'; // Importing the API service
import axios from 'axios'; // Importing axios
import './Courses.css';
import './Chatbot.css';

const Courses: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [query, setQuery] = useState('');

    // Calendar state
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [events, setEvents] = useState<{ title: string; date: string }[]>([]);

    // Fetching courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/courses/scrape', {
                    params: { query },
                });
                setCourses(response.data.courses || []);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [query]);

    const handleEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (eventTitle && eventDate) {
            const newEvent = { title: eventTitle, date: eventDate };
            setEvents([...events, newEvent]);

            // Call the API to add the event
            try {
                await addCalendarEvent(1, eventTitle, eventDate); // Assuming userId is 1 for now
            } catch (error) {
                console.error('Error adding event:', error);
            }

            setEventTitle('');
            setEventDate('');
        }
    };

    const getYouTubeEmbedLink = (url: string) => {
        const videoId = url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <div className="courses-wrapper">
            <h1>Welcome to Course Finder</h1>
            <h2>Courses</h2>
            {loading && <div className="loading">Loading courses...</div>}
            {!loading && courses.length === 0 && <div>No courses found.</div>}

            <div className="courses-container">
            {courses.map((course: any) => (
                    <div key={course.id} className="course-item">
                        <h3 className="course-title">{course.title}</h3>
                        <iframe
                            className="course-video"
                            src={getYouTubeEmbedLink(course.link)}
                            title={course.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}

            </div>

            <div className="chatbot-icon" onClick={() => setIsPopupOpen(true)}>
                <img src="/chatbot-icon.png" alt="Chatbot" />
            </div>
            {isPopupOpen && (
                <ChatbotPopup
                    closePopup={() => setIsPopupOpen(false)}
                    onSubmit={(newQuery) => setQuery(newQuery)}
                />
            )}

            {/* Calendar Section */}
            <div className="calendar-container">
                <h2><FaCalendarAlt /> Academic Calendar</h2>
                <form onSubmit={handleEventSubmit}>
                    <input
                        type="text"
                        placeholder="Event Title"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                    />
                    <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                    />
                    <button type="submit">Add Event</button>
                </form>
                <ul>
                    {events.map((event, index) => (
                        <li key={index}>{event.title} on {event.date}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Courses;
