import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const userName = "User";

  const quotes = [
    "The only way to do great work is to love what you do. — Steve Jobs",
    "You are enough just as you are. — Meghan Markle",
    "Journaling is like whispering to one's self and listening at the same time. — Mina Murray"
  ];

  const handleStartJourney = () => navigate('/mood-log');
  const handleViewGoals = () => navigate('/goals');

  return (
    <div className="min-h-[80vh] bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('https://i.pinimg.com/736x/cf/ae/17/cfae175bafd7f6167c53e541cdcdd3e5.jpg')"
      }}
    >
      <div className="mx-8 sm:mx-12 min-h-[80vh] flex flex-col py-6">
        <div
          className="backdrop-blur-sm rounded-xl p-6 shadow-xl flex-1"
          style={{
            backgroundColor: '#153A50'
          }}
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-2 text-gray-800">Welcome back, {userName}!</h2>
            <p className="text-lg text-gray-700 mb-6">How are you feeling today?</p>
            
            <div className="flex justify-center gap-2 mb-6">
              {['😊', '😢', '😠', '🤩', '😴'].map((emoji, index) => (
                <button 
                  key={index}
                  className="text-3xl hover:scale-125 transition-transform hover:shadow-lg rounded-full p-2"
                  onClick={() => console.log(`Mood selected: ${emoji}`)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/80 p-8 rounded-xl shadow-md border border-white/30 hover:shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Mood Tracking</h3>
              <p className="text-gray-700 mb-6 text-lg">
                Your emotional patterns this week:
              </p>
              <div className="h-24 flex items-end gap-1 mb-4">
                {[3, 5, 4, 7, 6, 8, 5].map((value, index) => (
                  <div 
                    key={index} 
                    className="bg-gradient-to-t from-blue-400 to-blue-600 flex-1 rounded-t" 
                    style={{ height: `${value * 10}%` }}
                  ></div>
                ))}
              </div>
              <button 
                onClick={handleStartJourney}
                className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full text-sm font-medium hover:shadow-md"
              >
                View Full History
              </button>
            </div>
            
            <div className="bg-white/80 p-8 rounded-xl shadow-md border border-white/30 hover:shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-green-600">Journaling</h3>
              <p className="text-gray-700 mb-4 text-lg">
                Capture today's thoughts:
              </p>
              <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border-l-4 border-green-400">
                <p className="text-gray-600 italic">
                  {quotes[Math.floor(Math.random() * quotes.length)]}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">Today's Wellness Challenge</h3>
            <p className="text-gray-700">Take 5 deep breaths and write down one thing you appreciate about yourself.</p>
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="bg-white/80 p-6 rounded-xl shadow-inner text-center flex-1">
              <p className="text-gray-600">Days logged:</p>
              <p className="text-3xl font-bold text-blue-600"> 0</p>
              <p className="text-3xl font-bold text-blue-600">Dont make me sad😢</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <button
                onClick={handleStartJourney}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium shadow-lg"
              >
                Start Your Journey
              </button>
              
              <button
                onClick={handleViewGoals}
                className="px-8 py-3 bg-gradient-to-r from-teal-500 to-sky-600 text-white rounded-full font-medium shadow-lg"
              >
                View Your Goals
              </button>
            </div>
            
            <div className="bg-white/80 p-6 rounded-xl shadow-inner text-center flex-1">
              <p className="text-gray-600">Positive days</p>
              <p className="text-3xl font-bold text-green-600">Try being above 75%</p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Need support? 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
