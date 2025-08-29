console.log("Welcome to blackjack!");
import { createDealer, addDealerCard } from "./dealer";
import { createDeck, shuffleDeck, dealCard } from "./deck";
import { createPlayer, addPlayerCard } from "./player";
import { Player, Dealer } from "./types";
import { calculateHandValue, HandScore } from "./hand";
import PromptSync from "prompt-sync";

const prompt = PromptSync();
const deck = createDeck();
shuffleDeck(deck);

const player: Player = createPlayer(1000);
const dealer: Dealer = createDealer()

const bet = prompt(`Enter bet amount (Balance: $${player.balance}): `);
const betAmount = Math.floor(Number(bet));

if(isNaN(betAmount) || betAmount <= 0 || betAmount > player.balance){
    console.log("Invalid bet amount.");
    process.exit(1);
}else{
    console.log(`Bet placed: ${betAmount}`);
    player.currentBet = betAmount;
    player.balance -= betAmount;
}

const playerCard1 = dealCard(deck);
const playerCard2 = dealCard(deck);
const dealerCard1 = dealCard(deck);
const dealerCard2 = dealCard(deck);

if(!playerCard1 || !playerCard2 || !dealerCard1 || !dealerCard2){
    console.log("Not enough cards in the deck.");
}else{
    addPlayerCard(player, playerCard1);
    addDealerCard(dealer, dealerCard1);
    addPlayerCard(player, playerCard2);
    addDealerCard(dealer, dealerCard2, true); // second card is hidden
}

console.log("Your hand:", player.hand.map(c => `${c.rank} of ${c.suit}`).join(", "));
console.log("Dealer's visible card:", dealer.hand.map(c => `${c.rank} of ${c.suit}`).join(", "), "and a hidden card.");