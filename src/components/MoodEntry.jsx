const moodEmojis = {
    Happy: '😊',
    Sad: '😢',
    Excited: '🤩',
    Angry: '😠',
    Tired: '😴',
    Anxious: '😰',
    Peaceful: '😌'
  };
  
  export default function MoodEntry({ mood, reflection, date }) {
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
      <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-100 hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl" role="img" aria-label={mood}>
            {moodEmojis[mood] || '❓'}
          </span>
          <p className="font-semibold text-blue-600 capitalize">{mood.toLowerCase()}</p>
          {date && (
            <span className="text-xs text-gray-400 ml-auto">
              {formatDate(date)}
            </span>
          )}
        </div>
        
        {reflection && (
          <div className="mt-2">
            <p className="text-gray-700 text-sm whitespace-pre-wrap">
              {reflection}
            </p>
          </div>
        )}
      </div>
    );
  }