import { useState } from 'react';

interface Props {
  onJoin: (name: string) => void;
}

export default function JoinGame({ onJoin }: Props) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (name.trim()) {
        onJoin(name.trim());
      }
    } catch (err) {
      console.error('Error joining game:', err);
      setError('Unable to join the game. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-pink-300">
      <div className="max-w-md w-full p-6 bg-white/30 backdrop-blur-sm border-4 border-pink-300/50 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl md:text-4xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 font-cursive whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontFamily: '"Comic Sans MS", cursive' }}>✨ Girlies&apos; Night Out ✨</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Enter your name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md"
              placeholder="Your name"
              required
            />
          </div>
          {error && (
            <p className="text-rose-500 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-rose-400 text-white py-2 px-4 rounded-md hover:bg-rose-500 transition-all shadow-sm hover:shadow-md"
          >
            Join Game
          </button>
        </form>
      </div>
    </div>
  );
}
