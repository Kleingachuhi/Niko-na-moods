import React, { useState, useEffect } from 'react';

const Journal = () => {
  const [entry, setEntry] = useState('');
  const [journals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [charCount, setCharCount] = useState(0);

  const fetchJournals = async () => {
    try {
      const res = await fetch('https://niko-na-mamoods.onrender.com/journals');
      if (!res.ok) throw new Error('Failed to fetch journals');
      const data = await res.json();
      setJournals([...data].sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry.trim()) return;

    try {
      const res = await fetch('https://niko-na-mamoods.onrender.com/journals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entry,
          date: new Date().toISOString()
        })
      });

      if (!res.ok) throw new Error('Failed to save journal');
      await fetchJournals();
      setEntry('');
      setCharCount(0);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://niko-na-mamoods.onrender.com/journals/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete entry');
      await fetchJournals();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEntryChange = (e) => {
    setEntry(e.target.value);
    setCharCount(e.target.value.length);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen p-6 bg-[#63607D]">
      <div className="max-w-2xl mx-auto bg-[#1A1A1D] text-[#E0E0E0] shadow-xl rounded-xl p-6 transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#D391BD]">📝 Journal Your Thoughts</h2>

        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            className="w-full p-4 border border-[#444] bg-[#181d24] text-[#E0E0E0] rounded-lg shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D391BD] transition"
            placeholder="What’s on your mind today?"
            value={entry}
            onChange={handleEntryChange}
            rows="6"
            maxLength={500}
          ></textarea>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{charCount}/500 characters</span>
            <button
              className="px-5 py-2 rounded-md bg-[#D391BD] text-black font-semibold hover:bg-[#e6a3d4] transition"
              type="submit"
            >
              Save Entry
            </button>
          </div>
        </form>

        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4 text-[#D391BD]">📚 Your Journal Entries</h3>
          {isLoading ? (
            <p className="text-gray-400">Loading your journals...</p>
          ) : journals.length === 0 ? (
            <p className="text-gray-500 italic">No journal entries yet. Your story starts here.</p>
          ) : (
            <div className="space-y-4">
              {journals.map((j) => (
                <div
                  key={j.id}
                  className="relative group bg-[#181d24] border border-[#444] p-5 rounded-lg shadow-sm transition duration-300 hover:shadow-lg hover:border-[#D391BD] cursor-pointer hover:scale-[1.01]"
                >
                    <button
                       onClick={() => handleDelete(j.id)}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-[#5C2A74] hover:bg-[#803b9a] flex items-center justify-center text-white transition"
                               aria-label="Delete journal entry"
                                             >
                                    <span className="text-xs">✕</span>
                                   </button>

                  <p className="text-xs text-gray-400 mb-2 group-hover:text-[#D391BD] transition">
                    {formatDate(j.date)}
                  </p>
                  <p className="text-[#E0E0E0] whitespace-pre-wrap leading-relaxed">{j.entry}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;
