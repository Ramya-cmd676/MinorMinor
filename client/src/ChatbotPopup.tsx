import React, { useState } from 'react';
import axios from 'axios';

interface ChatbotPopupProps {
    closePopup: () => void;
    onSubmit: (query: string) => void;
}

const ChatbotPopup: React.FC<ChatbotPopupProps> = ({ closePopup, onSubmit }) => {
    const [topic, setTopic] = useState('');
    const [studyDepth, setStudyDepth] = useState('');
    const [availableHours, setAvailableHours] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerateQuery = () => {
        if (!topic || !studyDepth || !availableHours) {
            alert('Please fill in all the fields!');
            return;
        }

        const query = `${topic} ${studyDepth === 'exam' ? 'exam prep' : 'detailed study'}`;
        const maxDurationMinutes = availableHours * 60; // Convert hours to minutes

        setLoading(true);

        axios
            .get('http://localhost:5000/api/courses/scrape', {
                params: { query, maxDuration: maxDurationMinutes },
            })
            .then(() => {
                onSubmit(query); // Send generated query back to the parent component
                setLoading(false);
                closePopup(); // Close the popup after submitting
            })
            .catch((error) => {
                console.error('Error generating query:', error);
                setLoading(false);
            });
    };

    return (
        <div className="chatbot-popup">
            <div className="chatbot-popup-header">
                <h3>Study Assistant</h3>
                <button onClick={closePopup}>Close</button>
            </div>
            <div className="chatbot-popup-body">
                <label>
                    <strong>What do you want to learn?</strong>
                </label>
                <input
                    type="text"
                    placeholder="Enter topic (e.g., AI, React)"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
                <label>
                    <strong>Study Depth</strong>
                </label>
                <select value={studyDepth} onChange={(e) => setStudyDepth(e.target.value)}>
                    <option value="">--Select--</option>
                    <option value="exam">Exam Preparation</option>
                    <option value="detailed">In-depth Study</option>
                </select>
                <label>
                    <strong>How many hours can you dedicate?</strong>
                </label>
                <input
                    type="number"
                    placeholder="Enter hours"
                    value={availableHours || ''}
                    onChange={(e) => setAvailableHours(Number(e.target.value))}
                />
                <button onClick={handleGenerateQuery}>Fetch Courses</button>
            </div>
            {loading && <div>Loading...</div>}
        </div>
    );
};

export default ChatbotPopup;
