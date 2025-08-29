import { Card } from './card';

export interface HandScore {
    value: number;
    length: number;
    isSoft: boolean; // Indicates if the hand contains an Ace counted as 11
}

// Calculate the value of a hand of cards
export function calculateHandValue(hand: Card[]): HandScore {
    let value = 0;
    let aceCount = 0;

    for (const card of hand) {
        if (card.rank === "A"){
            value += 11;
            aceCount++;
        }else if (['J', 'Q', 'K'].includes(card.rank)) {
            value += 10;
        }else {
            value += parseInt(card.rank);
        }
        
        if (value > 21 && aceCount > 0){
            value -= 10;
            aceCount--;
        }
    }
    return { value, length: hand.length ,isSoft: aceCount > 0 };
}

export function isBlackjack(hand: HandScore): boolean {
  return hand.value === 21 && hand.length === 2;
}

export function isBust(hand: HandScore): boolean {
    return hand.value > 21;
}