import { useState } from 'react';

interface Props {
  onSubmit: (text: string) => void;
}

export default function AddSquareForm({ onSubmit }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex gap-2 max-w-lg mx-auto">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add your own square (e.g., 'Do a shot with the bartender')"
        className="flex-1 p-2 border border-pink-200 rounded-lg bg-white/80 backdrop-blur-sm focus:border-pink-300 focus:ring-pink-200 focus:ring-2 focus:outline-none transition-all"
      />
      <button
        type="submit"
        className="bg-rose-400 text-white px-4 py-2 rounded-lg hover:bg-rose-500 transition-all shadow-sm hover:shadow-md"
      >
        Add Square
      </button>
    </form>
  );
}
