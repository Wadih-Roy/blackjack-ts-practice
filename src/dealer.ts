import { Card } from "./card";
import { Dealer } from "./types";
import { HandScore } from "./hand";

export function createDealer(): Dealer {
    return {
        hand: [],
        hiddenCard: null
    };
}

export function addDealerCard(dealer: Dealer, card: Card, isHidden: boolean = false): void {
    if (isHidden) {
        dealer.hiddenCard = card;
    } else {
        dealer.hand.push(card);
    }
}

export function revealHiddenCard(dealer: Dealer): void {
    if (dealer.hiddenCard) {
        dealer.hand.push(dealer.hiddenCard);
        dealer.hiddenCard = null;
    }
}
export function getDealerHand(dealer: Dealer): Card[] {
    return [...dealer.hand]; // return a copy of the hand
}

export function resetDealerHand(dealer: Dealer): void {
    dealer.hand = [];
    dealer.hiddenCard = null;
}

export function dealerHitStand(handScore: HandScore): { action: 'hit' | 'stand'; reason: string; } {
    if (handScore.value < 17) {
        return { action: 'hit', reason: 'Dealer hits on hand value less than 17' };
    } else if (handScore.value === 17 && handScore.isSoft) {
        return { action: 'hit', reason: 'Dealer hits on soft 17' };
    } else {
        return { action: 'stand', reason: 'Dealer stands on 17 or higher' };
    } 
}