import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import ChatbotPopup from './ChatbotPopup'; // Chatbot popup component
import Game from './Game'; // Game component
import { addCalendarEvent } from './services/apiService'; // API service
import axios from 'axios'; // Axios for API requests
import Mental from './Mental'; // Import the MentalFunction component
import './Courses.css';
import './Chatbot.css';
import './Home.css';

const Courses: React.FC = () => {
    const [showGame, setShowGame] = useState(false);
    const [showMental, setShowMental] = useState(false);
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [timing, setTiming] = useState<number>(0); // Store timing from localStorage
    const [gameEnabled, setGameEnabled] = useState(false); // State to track if game button should be enabled

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

    // Set the timing from localStorage when the component mounts
    useEffect(() => {
        const savedTiming = localStorage.getItem('concentration_duration');
        console.log("saved: ",savedTiming);
        if (savedTiming) {
            const parsedTiming = Number(savedTiming);
            setTiming(parsedTiming);
        }
    }, []);

    // Trigger mental function automatically after timing interval
    useEffect(() => {
        console.log("i am timing: ",timing);
        if (timing > 0) {
            const interval = setInterval(() => {
                setShowMental(true);
            }, timing * 60 * 60 * 1000); // Convert hours to milliseconds

            // Enable the "Start Game" button after the interval
            setTimeout(() => {
                setGameEnabled(true); // Enable game button after the specified time has passed
            }, timing * 60 * 60 * 1000);

            return () => clearInterval(interval); // Cleanup
        }
    }, [timing]);

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

                    {/* Start Game Button: only shows after 'timing' hours */}
                    {//timing > 0 && (
                        <button
                            onClick={handleGameClick}
                            className="game-button"
                            disabled={!gameEnabled} // Disable button until timing is reached
                        >
                            Start Game
                        </button>
                    //)
                    }

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

                    {/* Mental Function Full-Screen */}
                        {showMental && (
                            <div className="mental-fullscreen">
                                <button className="close-button" onClick={handleCloseMental}>
                                    Close
                                </button>
                                <Mental /> {/* Render as a component */}
                            </div>
                        )}

                </>
            )}
        </div>
    );
};

export default Courses;
