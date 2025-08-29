import { Card, SUITS, RANKS } from './card';

export function createDeck(): Card[] {
    const deck: Card[] = [];

    for (const suit of SUITS) {
        for (const rank of RANKS){
            deck.push({ suit, rank });
        }
    }
    return deck
}