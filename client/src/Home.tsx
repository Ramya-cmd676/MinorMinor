import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt } from 'react-icons/fa';
import { addCalendarEvent } from './services/apiService';
import './Courses.css';
import './Chatbot.css';
import ChatbotPopup from './ChatbotPopup';
import Game from './Game';
import Mental from './Mental';
import Quiz from './Quiz';

const Courses: React.FC = () => {
  const [showGame, setShowGame] = useState(false);
  const [showMental, setShowMental] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [timing, setTiming] = useState<number>(0);
  const [gameEnabled, setGameEnabled] = useState(false);
  const [events, setEvents] = useState<{ title: string; date: string }[]>([]);

  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/courses/scrape', {
          params: { query },
        });
        setCourses(response.data?.courses || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [query]);

  const getYouTubeEmbedLink = (url: string) => {
    if (!url.includes('v=')) return '';
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    if (eventTitle && eventDate && userId) {
      const newEvent = { title: eventTitle, date: eventDate };
      setEvents([...events, newEvent]);
      try {
        await addCalendarEvent(userId, eventTitle, eventDate);
      } catch (error) {
        console.error('Error adding event:', error);
      }
      setEventTitle('');
      setEventDate('');
    }
  };

  useEffect(() => {
    const savedTiming = localStorage.getItem('concentration_duration');
    if (savedTiming) {
      const parsedTiming = Number(savedTiming);
      setTiming(isNaN(parsedTiming) ? 0 : parsedTiming);
    }
  }, []);

  useEffect(() => {
    if (timing > 0) {
      const interval = setInterval(() => {
        setShowMental(true);
      }, timing *60*60* 1000);

      const timeout = setTimeout(() => {
        setGameEnabled(true);
      }, timing  * 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [timing]);

  // Automatically close Mental component after 5 minutes
  useEffect(() => {
    let mentalTimeout: NodeJS.Timeout;
    if (showMental) {
      mentalTimeout = setTimeout(() => {
        setShowMental(false);
      }, 5*60*1000); // 5 minutes
    }
    return () => clearTimeout(mentalTimeout);
  }, [showMental]);

  const handleQuizClick = () => setShowQuiz(true);

  if (showQuiz) return <Quiz onClose={() => setShowQuiz(false)} />;
  if (loading) return <div className="loading">Loading courses...</div>;
  if (showMental) return <Mental />;

  return (
    <div className="courses-wrapper">
      {showGame ? (
        <Game onClose={() => setShowGame(false)} />
      ) : (
        <>
          <h1>Welcome to Course Finder</h1>
          <h2>Courses</h2>
          {loading && <div className="loading">Loading courses...</div>}
          {!loading && courses.length === 0 && <div>No courses found.</div>}
          <div className="courses-container">
            {courses.map((course) => (
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
          <button
            onClick={() => setShowGame(true)}
            className="game-button"
            disabled={!gameEnabled}
          >
            Start Game
          </button>
          <button onClick={handleQuizClick} style={{marginLeft:'20px'}} className="quiz-button">
            Take a Quiz
          </button>
          <div className="chatbot-icon" onClick={() => setIsPopupOpen(true)}>
            <img src="/chatbot-icon.png" alt="Chatbot" />
          </div>
          {isPopupOpen && (
            <ChatbotPopup
              closePopup={() => setIsPopupOpen(false)}
              onSubmit={(newQuery) => setQuery(newQuery)}
            />
          )}
          <div className="calendar-container">
            <h2>
              <FaCalendarAlt /> Academic Calendar
            </h2>
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
                <li key={index}>
                  {event.title} on {event.date}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Courses;
