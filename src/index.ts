console.log("Welcome to blackjack!");

// Testing calculateHandValue

import { Card } from "./card";
import { createDeck, dealCard, shuffleDeck } from "./deck";
import { calculateHandValue } from "./hand";

const deck = createDeck();

const hand: Card[] = [];

for (let i = 0; i < 2; i++){
    const card = dealCard(shuffleDeck(deck));
    if (card) hand.push(card);
}

console.log("Initial hand:", hand.map(card => `${card.rank} of ${card.suit}`).join(", "));

console.log("Hand value:", calculateHandValue(hand));