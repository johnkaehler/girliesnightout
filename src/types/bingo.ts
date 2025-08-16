export interface BingoSquare {
  id: string;
  text: string;
  isCompleted: boolean;
  createdBy?: string;
}

export interface Player {
  id: string;
  name: string;
  board: BingoSquare[];
  hasWon?: boolean;
}

export interface GameState {
  players: Player[];
  customSquares: BingoSquare[];
}
