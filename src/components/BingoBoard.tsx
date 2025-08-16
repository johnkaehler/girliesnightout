import { useState } from 'react';
import { BingoSquare as BingoSquareType } from '../types/bingo';
import BingoSquare from './BingoSquare';

interface Props {
  squares: BingoSquareType[];
  onSquareClick: (id: string) => void;
  onRandomize: () => void;
  hasWon?: boolean;
}

export default function BingoBoard({ squares, onSquareClick, onRandomize, hasWon = false }: Props) {
  const [hasRandomized, setHasRandomized] = useState(false);

  const handleRandomize = () => {
    if (!hasRandomized && !hasWon) {
      onRandomize();
      setHasRandomized(true);
    }
  };

  return (
    <div className={`border-4 ${hasWon ? 'border-rose-400' : 'border-pink-300/50'} rounded-xl bg-white/30 backdrop-blur-sm p-3 sm:p-6 shadow-lg max-w-4xl mx-auto relative`}>
      {hasWon && (
        <div className="absolute inset-0 flex items-center justify-center bg-rose-500/20 backdrop-blur-sm rounded-lg z-10">
          <div className="bg-white/90 px-6 py-4 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-rose-500 mb-2">🎉 BINGO! 🎉</h2>
            <p className="text-gray-600">You&apos;ve won!! Wow!!Congratulations!! You really did that. You&apos;re suuuuuch a good girl.</p>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center gap-2 sm:gap-4">
        <button
          onClick={handleRandomize}
          disabled={hasRandomized || hasWon}
          className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg transition-all shadow-sm hover:shadow-md text-sm ${
            hasRandomized || hasWon
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-rose-400 text-white hover:bg-rose-500'
          }`}
        >
          {hasRandomized ? '✓ Board Randomized' : '🎲 Shuffle Board'}
        </button>
        <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full aspect-square">
          {squares.map((square) => (
            <BingoSquare
              key={square.id}
              square={square}
              onClick={() => onSquareClick(square.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
