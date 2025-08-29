import { Card } from './card';

// Calculate the value of a hand of cards
export function calculateHandValue(hand: Card[]): number {
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
    return value;
}