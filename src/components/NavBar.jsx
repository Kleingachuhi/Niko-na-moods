import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">MoodMate</h1>
      <div className="space-x-4">
        <Link to="/home" className="hover:underline">Home</Link>
        <Link to="/mood-log" className="hover:underline">Mood Log</Link>
        <Link to="/journal" className="hover:underline">Journal</Link>
      </div>
    </nav>
  );
}