import { BingoSquare as BingoSquareType } from '../types/bingo';

interface Props {
  square: BingoSquareType;
  onClick: () => void;
}

export default function BingoSquare({ square, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`aspect-square p-1 sm:p-2 border-2 rounded-lg cursor-pointer transition-all text-center flex items-center justify-center shadow-sm hover:shadow-md
        ${square.isCompleted 
          ? 'bg-rose-200 border-rose-400 text-rose-900' 
          : 'bg-white/80 backdrop-blur-sm border-pink-200 hover:border-pink-300 hover:bg-white/90 text-gray-800'
        }`}
    >
      <p className="text-[10px] sm:text-xs md:text-sm leading-tight line-clamp-4 px-0.5">{square.text}</p>
    </div>
  );
}
