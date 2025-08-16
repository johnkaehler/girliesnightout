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
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Girlies' Night Out</h1>
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
