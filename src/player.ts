import { Card } from "./card";
import { Player } from "./types";

export function createPlayer(balance: number): Player {
    return {
        hand: [],
        balance,
        currentBet: 0
    };
}

export function addPlayerCard(player: Player, card: Card): void {
    player.hand.push(card);
}

export function getPlayerHand(player: Player): Card[] {
    return [...player.hand]; // return a copy of the hand
}

export function resetPlayerHand(player: Player): void {
    player.hand = [];
}