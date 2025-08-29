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

export function shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

export function dealCard(deck: Card[]): Card | undefined {
    const dealtCard = deck.pop();
    return dealtCard;
}