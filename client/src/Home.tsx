import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import ChatbotPopup from './ChatbotPopup'; // Chatbot popup component
import Game from './Game'; // Game component
import { addCalendarEvent } from './services/apiService'; // API service
import axios from 'axios'; // Axios for API requests
import Mental from './Mental'; // Import the MentalFunction component
import './Courses.css';
import './Chatbot.css';

const Courses: React.FC = () => {
    const [showGame, setShowGame] = useState(false);
    const [showMental, setShowMental] = useState(false);
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [concentrationDuration, setConcentrationDuration] = useState<number>(0);

    // Calendar state
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [events, setEvents] = useState<{ title: string; date: string }[]>([]);

    // Fetch courses
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

    const getYouTubeEmbedLink = (url: string) => {
        const videoId = url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    };

    const handleEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (eventTitle && eventDate) {
            const newEvent = { title: eventTitle, date: eventDate };
            setEvents([...events, newEvent]);

            try {
                await addCalendarEvent(1, eventTitle, eventDate); // Assuming userId = 1
            } catch (error) {
                console.error('Error adding event:', error);
            }

            setEventTitle('');
            setEventDate('');
        }
    };

    // Fetch concentration duration and set interval for mental function
    useEffect(() => {
        const fetchConcentrationDuration = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/concentration-duration', {
                    params: { userId: 1 }, // Replace with actual user ID
                });
                const duration = response.data.concentration_duration || 0;
                setConcentrationDuration(duration);

                if (duration > 0) {
                    const interval = setInterval(() => {
                        setShowMental(true);
                    }, duration * 60 * 1000); // Convert minutes to milliseconds

                    return () => clearInterval(interval); // Cleanup
                }
            } catch (error) {
                console.error('Error fetching concentration duration:', error);
            }
        };
        fetchConcentrationDuration();
    }, []);

    const handleGameClick = () => {
        setShowGame(true);
    };

    const handleCloseGame = () => {
        setShowGame(false);
    };

    const handleCloseMental = () => {
        setShowMental(false);
    };

    if (loading) {
        return <div className="loading">Loading courses...</div>;
    }

    return (
        <div className="courses-wrapper">
            {showGame ? (
                <Game onClose={() => setShowGame(false)} />
            ) : (
                <>
                    <h1>Welcome to Course Finder</h1>
                    <div className="courses-box">
                        <h2 className="courses-title">Courses</h2>
                        {courses.length === 0 ? (
                            <div>No courses found.</div>
                        ) : (
                            <div className="courses-container">
                                {courses.map((course: any) => (
                                    <div key={course.id} className="course-item">
                                        <h3 className="course-title">{course.title}</h3>
                                        <iframe
                                            className="course-video"
                                            src={`https://www.youtube.com/embed/${new URLSearchParams(
                                                course.link.split('?')[1]
                                            ).get('v')}`}
                                            title={course.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button onClick={() => setShowGame(true)} className="game-button">
                        Start Game
                    </button>

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
                            <button type="submit" className="add-event-button">Add Event</button>
                        </form>
                        <ul>
                            {events.map((event, index) => (
                                <li key={index}>{event.title} on {event.date}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Chatbot Section */}
                    <div className="chatbot-section">
                        <div className="chatbot-icon" onClick={() => setIsPopupOpen(true)}>
                            <img src="/chatbot-icon.png" alt="Chatbot" />
                        </div>
                        {isPopupOpen && (
                            <ChatbotPopup
                                closePopup={() => setIsPopupOpen(false)}
                                onSubmit={(newQuery) => setQuery(newQuery)}
                            />
                        )}
                    </div>

                    {/* Mental Function Pop-up */}
                    {showMental && (
                        <div className="mental-popup">
                            <div className="mental-container">
                                <button className="close-button" onClick={handleCloseMental}>
                                    Close
                                </button>
                                <Mental /> {/* Render as a component */}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Courses;
