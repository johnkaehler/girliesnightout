import { BingoSquare as BingoSquareType } from '../types/bingo';

interface Props {
  square: BingoSquareType;
  onClick: () => void;
}

export default function BingoSquare({ square, onClick }: Props) {
  const textLength = square.text.length;
  
  // Dynamic text size based on content length
  const getTextSize = () => {
    if (textLength > 100) return 'text-[8px] sm:text-[10px] md:text-xs';
    if (textLength > 70) return 'text-[9px] sm:text-xs md:text-sm';
    if (textLength > 40) return 'text-[10px] sm:text-xs md:text-sm';
    return 'text-xs sm:text-sm md:text-base';
  };

  return (
    <div
      onClick={onClick}
      className={`aspect-square p-1.5 sm:p-2.5 border-2 rounded-lg cursor-pointer transition-all text-center flex items-center justify-center shadow-sm hover:shadow-md
        ${square.isCompleted 
          ? 'bg-rose-200 border-rose-400 text-rose-900' 
          : 'bg-white/80 backdrop-blur-sm border-pink-200 hover:border-pink-300 hover:bg-white/90 text-gray-800'
        }`}
    >
      <p className={`${getTextSize()} leading-tight px-0.5 break-words max-h-full overflow-hidden`}>{square.text}</p>
    </div>
  );
}
