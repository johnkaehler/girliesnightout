import { BingoSquare as BingoSquareType } from '../types/bingo';

interface Props {
  square: BingoSquareType;
  onClick: () => void;
}

export default function BingoSquare({ square, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`p-2 sm:p-4 border-2 rounded-lg cursor-pointer transition-all text-center min-h-[60px] sm:min-h-[100px] flex items-center justify-center shadow-sm hover:shadow-md
        ${square.isCompleted 
          ? 'bg-rose-200 border-rose-400 text-rose-900' 
          : 'bg-white/80 backdrop-blur-sm border-pink-200 hover:border-pink-300 hover:bg-white/90 text-gray-800'
        }`}
    >
      <p className="text-xs sm:text-sm leading-tight">{square.text}</p>
    </div>
  );
}
