export default function JournalEntry({ entry, date }) {
    const formatDate = (dateString) => {
      if (!dateString) return '';
      
      const dateObj = new Date(dateString);
      if (isNaN(dateObj.getTime())) return '';       
      return dateObj.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
    return (
      <div className="bg-white border-l-4 border-green-400 pl-4 py-3 rounded-md shadow-sm">
        <p className="text-gray-800 mb-2">{entry}</p>
        {date && (
          <p className="text-xs text-gray-400">
            {formatDate(date)}
          </p>
        )}
      </div>
    );
  }