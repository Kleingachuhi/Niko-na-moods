import React, { useEffect, useState } from 'react';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('https://mood-mate-json.vercel.app/goals')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGoals(data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title !== '' && description !== '') {
      setIsLoading(true);

      fetch('https://mood-mate-json.vercel.app/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description,
          userId: 1
        })
      })
        .then((res) => res.json())
        .then((data) => {
          setGoals([...goals, data]);
          setTitle('');
          setDescription('');
          setIsLoading(false);
        });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed p-6"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/cf/ae/17/cfae175bafd7f6167c53e541cdcdd3e5.jpg')"
      }}
    >
      <div className="max-w-4xl mx-auto bg-white/70 rounded-xl p-8 shadow-xl backdrop-blur-sm">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Your Goals</h2>
          <p className="text-lg text-gray-700">Set goals that support your emotional and personal growth.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 p-6 rounded-lg shadow-md border border-white/30 mb-10">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Add New Goal</h3>
          <input
            type="text"
            placeholder="Goal Title"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            placeholder="Goal Description"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            rows="3"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Goal'}
          </button>
        </form>

        <div className="space-y-6">
          {goals.length === 0 ? (
            <p className="text-lg text-gray-600 text-center">Loading your goals...</p>
          ) : (
            goals.map((goal) => {
              return (
                <div
                  key={goal.id}
                  className="bg-white/80 p-6 rounded-xl shadow-md border-l-4 border-indigo-500"
                >
                  <h3 className="text-2xl font-semibold text-indigo-700">{goal.title}</h3>
                  <p className="text-base text-gray-700 mt-2">{goal.description}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Goals;
