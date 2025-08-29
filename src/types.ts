import { Card } from "./card";

export interface Player {
    hand: Card[];
    balance: number;
    currentBet: number;
}

export interface Dealer{
    hand: Card[];
    hiddenCard: Card | null; // The dealer's hidden card
}