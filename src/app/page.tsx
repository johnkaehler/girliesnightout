'use client';

import { useState } from 'react';
import { BingoSquare, Player } from '../types/bingo';
import BingoBoard from '../components/BingoBoard';
import AddSquareForm from '../components/AddSquareForm';
import JoinGame from '../components/JoinGame';

const defaultSquares = [
  "Order a Negroni at a fancy bar",
  "Take a selfie at the Duomo",
  "Eat gelato at midnight",
  "Make friends with locals",
  "Dance at a rooftop club",
  "Try Milanese street food",
  "Share a pizza with strangers",
  "Find a hidden speakeasy",
  "Sing karaoke in Italian",
  "Take a group photo with the fashion police",
  "Try three different Italian wines",
  "Learn an Italian pickup line",
  "Find live music and dance",
  "Take a midnight stroll in Brera",
  "Photobomb tourist photos",
  "Order in broken Italian",
  "Find the best aperitivo spot",
  "Make a toast in Italian",
  "Exchange Instagram handles with locals",
  "Find a celebrity lookalike",
  "Try a traditional digestivo",
  "Get restaurant recommendations from locals",
  "Navigate the metro after midnight",
  "Find the best late-night pasta",
  "Start a dance party",
  // Spicy additions below 🔥
  "Take a body shot off someone",
  "Get a lap dance (or give one)",
  "Seductively feed someone a bite of your food",
  "Send a flirty text to an ex—then show the group",
  "Flash someone (discreetly or not)",
  "Take a risqué group photo in front of the Duomo",
  "Lose an article of clothing (and don’t retrieve it for 30 mins)",
  "Kiss a stranger (anywhere)",
  "Dance on a table or podium",
  "Convince a stranger to buy you a round",
  "Whisper something scandalous in a stranger’s ear",
  "Get caught making out in a dark corner",
  "Trade an item of clothing with a friend in the club bathroom",
  "Let a stranger pick your next drink (no backsies)",
  "Say 'I love you' to someone you just met",
  "End the night with a secret you’ll never tell",
  "Take a picture of Alex's tits and send to John"
];

export default function Home() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [customSquares, setCustomSquares] = useState<BingoSquare[]>([]);

  const handleJoinGame = (name: string) => {
    const newPlayer: Player = {
      id: Date.now().toString(),
      name,
      board: generateRandomBoard()
    };
    setPlayer(newPlayer);
  };

  const handleSquareClick = (squareId: string) => {
    if (!player) return;

    const updatedBoard = player.board.map(square =>
      square.id === squareId
        ? { ...square, isCompleted: !square.isCompleted }
        : square
    );

    setPlayer({ ...player, board: updatedBoard });
  };

  const handleAddCustomSquare = (text: string) => {
    if (!player) return;

    const newSquare: BingoSquare = {
      id: Date.now().toString(),
      text,
      isCompleted: false,
      createdBy: player.name
    };

    setCustomSquares(prev => [...prev, newSquare]);
  };

  function generateRandomBoard(): BingoSquare[] {
    const allSquares = [
      ...defaultSquares,
      ...customSquares.map(square => square.text)
    ];
    
    return shuffle(allSquares)
      .slice(0, 25)
      .map((text, index) => ({
        id: `${index}-${Date.now()}`,
        text,
        isCompleted: false
      }));
  }

  function shuffle<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  if (!player) {
    return <JoinGame onJoin={handleJoinGame} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-300 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <header className="text-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 font-cursive whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontFamily: '"Comic Sans MS", cursive' }}>✨ Girlies&apos; Night Out ✨</h1>
          <p className="text-gray-600">Playing as {player.name}</p>
        </header>

        <BingoBoard
          squares={player.board}
          onSquareClick={handleSquareClick}
          onRandomize={() => {
            const newBoard = generateRandomBoard();
            setPlayer({ ...player, board: newBoard });
          }}
        />

        <AddSquareForm onSubmit={handleAddCustomSquare} />

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Custom Squares Added:</h2>
          <ul className="space-y-2">
            {customSquares.map(square => (
              <li
                key={square.id}
                className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-pink-200 text-gray-800"
              >
                &ldquo;{square.text}&rdquo; - added by {square.createdBy}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
