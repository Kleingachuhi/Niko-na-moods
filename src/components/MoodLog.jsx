import { useState, useEffect } from 'react';

const moodChoices = [
  { mood: 'Happy', emoji: '😊' },
  { mood: 'Sad', emoji: '😢' },
  { mood: 'Excited', emoji: '🤩' },
  { mood: 'Angry', emoji: '😠' },
  { mood: 'Tired', emoji: '😴' },
  { mood: 'Anxious', emoji: '😰' },
  { mood: 'Peaceful', emoji: '😌' }
];

const moodEmojis = {
  Happy: '😊',
  Sad: '😢',
  Excited: '🤩',
  Angry: '😠',
  Tired: '😴',
  Anxious: '😰',
  Peaceful: '😌'
};

const MoodTracker = () => {
  const [pastMoods, setPastMoods] = useState([]);
  const [currentMood, setCurrentMood] = useState('');
  const [moodReason, setMoodReason] = useState('');
  const [isLoadingMoods, setIsLoadingMoods] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchMoods = async () => {
    try {
      const response = await fetch('https://mood-mate-json.vercel.app/moods');
      if (!response.ok) throw new Error('Having trouble loading your mood history');
      const moodData = await response.json();
      setPastMoods([...moodData].sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoadingMoods(false);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const saveNewMood = async (e) => {
    e.preventDefault();
    setIsLoadingMoods(true);
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
      if (!response.ok) throw new Error(`Error ${response.status}: Failed to save mood`);
      await fetchMoods();
      setCurrentMood('');
      setMoodReason('');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoadingMoods(false);
    }
  };

  const handleDeleteMood = async (moodId) => {
    setIsLoadingMoods(true);
    try {
      const response = await fetch(`https://mood-mate-json.vercel.app/moods/${moodId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error(`Error ${response.status}: Failed to delete mood`);
       fetchMoods();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoadingMoods(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const dateObj = new Date(dateString);
      if (isNaN(dateObj.getTime())) return '';
      return dateObj.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '';
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
                <div key={entry.id} className="bg-white/90 p-4 rounded-lg shadow-sm border border-white/20 hover:bg-white transition-colors relative group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl" role="img" aria-label={entry.mood}>
                      {moodEmojis[entry.mood] || '❓'}
                    </span>
                    <p className="font-semibold text-blue-600 capitalize">{entry.mood.toLowerCase()}</p>
                    {entry.date && (
                      <span className="text-xs text-gray-400 ml-auto">
                        {formatDate(entry.date)}
                      </span>
                    )}
                    <button
                      onClick={() => handleDeleteMood(entry.id)}
                      className="ml-2 w-6 h-6 rounded-full bg-pink-400 hover:bg-red-500 flex items-center justify-center text-white transition-colors duration-200"
                      aria-label="Delete mood entry"
                    >
                      <span className="text-xs">✕</span>
                    </button>
                  </div>
                  {entry.reflection && (
                    <div className="mt-2">
                      <p className="text-gray-700 text-sm whitespace-pre-wrap">{entry.reflection}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;