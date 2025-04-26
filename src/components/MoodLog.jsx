import { useState, useEffect } from 'react';
import MoodEntry from './MoodEntry';

const moodChoices = [
  { mood: 'Happy', emoji: '😊' },
  { mood: 'Sad', emoji: '😢' },
  { mood: 'Excited', emoji: '🤩' },
  { mood: 'Angry', emoji: '😠' },
  { mood: 'Tired', emoji: '😴' },
  { mood: 'Anxious', emoji: '😰' },
  { mood: 'Peaceful', emoji: '😌' }
];

const MoodTracker = () => {
  const [pastMoods, setPastMoods] = useState([]);
  const [currentMood, setCurrentMood] = useState('');
  const [moodReason, setMoodReason] = useState('');
  const [isLoadingMoods, setIsLoadingMoods] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getSavedMoods = async () => {
      try {
        const response = await fetch('https://mood-mate-json.vercel.app/moods');
        if (!response.ok) throw new Error('Having trouble loading your mood history');
        const moodData = await response.json();
        setPastMoods(moodData);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoadingMoods(false);
      }
    };
    getSavedMoods();
  }, []);

  const saveNewMood = async (e) => {
    e.preventDefault();
    const newMoodEntry = { 
      mood: currentMood, 
      reflection: moodReason,
      date: new Date().toISOString()
    };

    try {
      const response = await fetch('https://mood-mate-json.vercel.app/moods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMoodEntry)
      });
      if (!response.ok) throw new Error('Oops! Could not save your mood this time');
      const savedMood = await response.json();
      setPastMoods([...pastMoods, savedMood]);
      setCurrentMood('');
      setMoodReason('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-8"
      style={{
        backgroundImage: "url('https://i.pinimg.com/736x/76/fe/f5/76fef5ec0bc899199bf988b81552ffd9.jpg')"
      }}
    >
      <div 
        className="p-8 w-full max-w-3xl rounded-xl shadow-2xl mx-4"
        style={{
          backgroundColor: '#7198AF',
          opacity: '0.9'
        }}
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">How Are You Feeling Today?</h2>
        {errorMessage && <p className="text-red-200 mb-4 text-center">{errorMessage}</p>}
        
        <form onSubmit={saveNewMood} className="space-y-4">
          <select
            className="w-full p-3 border rounded-md bg-white/90 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={currentMood}
            onChange={(e) => setCurrentMood(e.target.value)}
            required
          >
            <option value="">Choose how you're feeling...</option>
            {moodChoices.map((choice) => (
              <option key={choice.mood} value={choice.mood}>
                {choice.emoji} {choice.mood}
              </option>
            ))}
          </select>

          <textarea
            className="w-full p-3 border rounded-md bg-white/90 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="What's making you feel this way?"
            value={moodReason}
            onChange={(e) => setMoodReason(e.target.value)}
            rows="4"
          ></textarea>

          <div className="flex justify-center">
            <button 
              className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
              type="submit"
            >
              Save My Mood
            </button>
          </div>
        </form>

        <div className="mt-10">
          <h3 className="font-semibold text-xl text-white mb-4 text-center">Your Mood Journey</h3>
          {isLoadingMoods ? (
            <p className="text-center text-gray-200">Looking back at your feelings...</p>
          ) : pastMoods.length === 0 ? (
            <p className="text-center text-gray-200">Your mood history is waiting to be written</p>
          ) : (
            <div className="space-y-6">
              {pastMoods.map((entry) => (
                <MoodEntry 
                  key={entry.id} 
                  mood={entry.mood} 
                  reflection={entry.reflection}
                  date={entry.date}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;