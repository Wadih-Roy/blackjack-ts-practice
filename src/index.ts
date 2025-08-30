console.log("Welcome to blackjack!");
    import {
    createDealer,
    addDealerCard,
    getDealerHand,
    revealHiddenCard,
    dealerHitStand,
    } from "./dealer";
    import { createDeck, shuffleDeck, dealCard } from "./deck";
    import { createPlayer, addPlayerCard } from "./player";
    import { Player, Dealer } from "./types";
    import { calculateHandValue, HandScore } from "./hand";
    import { playerTurn } from "./turns";
    import PromptSync from "prompt-sync";
    
    const prompt = PromptSync();
    const ask = (q: string) => prompt(q);
    const draw = () => dealCard(deck);
    const deck = createDeck();
    shuffleDeck(deck);
do {
    // Initialize player and dealer
    const player: Player = createPlayer(1000);
    const dealer: Dealer = createDealer();

    const bet = prompt(`Enter bet amount (Balance: $${player.balance}): `);
    const betAmount = Math.floor(Number(bet));

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > player.balance) {
    console.log("Invalid bet amount.");
    process.exit(1);
    } else {
    console.log(`Bet placed: ${betAmount}`);
    player.currentBet = betAmount;
    player.balance -= betAmount;
    }

    const playerCard1 = dealCard(deck);
    const dealerCard1 = dealCard(deck);
    const playerCard2 = dealCard(deck);
    const dealerCard2 = dealCard(deck);

    if (!playerCard1 || !playerCard2 || !dealerCard1 || !dealerCard2) {
    console.log("Not enough cards in the deck.");
    } else {
    addPlayerCard(player, playerCard1);
    addDealerCard(dealer, dealerCard1);
    addPlayerCard(player, playerCard2);
    addDealerCard(dealer, dealerCard2, true); // second card is hidden
    }

    console.log(
    "Your hand:",
    player.hand.map((c) => `${c.rank} of ${c.suit}`).join(", ")
    );
    console.log(
    "Dealer's visible card:",
    getDealerHand(dealer).map((card) => `${card.rank} of ${card.suit}`)
    );

    // Check for player/dealer blackjack
    const playerHandScore = calculateHandValue(player.hand);
    console.log(`Your hand value is ${playerHandScore.value}`);

    if (playerHandScore.value === 21 && playerHandScore.length === 2) {
    console.log("Blackjack! You win 1.5x your bet.");
    revealHiddenCard(dealer);
    const dealerScore = calculateHandValue(getDealerHand(dealer));
    console.log(
        `Dealer has ${getDealerHand(dealer)
        .map((c) => `${c.rank} of ${c.suit}`)
        .join(", ")} with value ${dealerScore.value}${
        dealerScore.isSoft ? " (soft)" : ""
        }`
    );
    if (dealerScore.value === 21 && dealerScore.length === 2) {
        console.log("Dealer also has blackjack! It's a push.");
    } else {
        console.log("You win with blackjack!");
        player.balance += player.currentBet * 2.5;
    }
    process.exit(0);
    }

    // PLAYER TURN
    const turn = playerTurn(player, draw, calculateHandValue, ask);

    console.log(`\nYou chose to ${turn.actions.join(", ")}
                \nYour final hand: ${player.hand
                .map((c) => `${c.rank} of ${c.suit}`)
                .join(", ")} (value: ${turn.finalScore.value}${
    turn.finalScore.isSoft ? " (soft)" : ""
    })`);

    // if player busts, dealer wins
    if (turn.result === "bust") {
    console.log("You busted! Dealer wins.");
    console.log(`Your balance is now $${player.balance}`);
    process.exit(0);
    }

    // DEALER TURN
    console.log("\nDealer reveals hidden card...");
    revealHiddenCard(dealer);

    while (true) {
        const dealerHandScore = calculateHandValue(getDealerHand(dealer));
        console.log(`Dealer's hand: ${getDealerHand(dealer).map(c => `${c.rank} of ${c.suit}`).join(", ")} (value: ${dealerHandScore.value}${dealerHandScore.isSoft ? " (soft)" : ""})`);
        if (dealerHandScore.value > 21) {
            console.log("Dealer busts! You win.");
            process.exit(0);
        }
        const dealerDecision = dealerHitStand(dealerHandScore);

        if (dealerDecision.action === 'stand') {
            console.log("Dealer stands.");
            break;
        }

        const drawCard = draw();
        if (!drawCard){
            console.log("No more cards in the deck. Dealer stands.");
            break;
        }
        addDealerCard(dealer, drawCard, false);
    }

    // FINAL COMPARISON
    const finalPlayerScore = calculateHandValue(player.hand);
    const finalDealerScore = calculateHandValue(getDealerHand(dealer));

    console.log(`Your final hand value is: ${finalPlayerScore.value}${finalPlayerScore.isSoft ? " (soft)" : ""}`);
    console.log(`Dealer's final hand value is: ${finalDealerScore.value}${finalDealerScore.isSoft ? " (soft)" : ""}`);

    if (finalDealerScore.value > 21 || finalPlayerScore.value > finalDealerScore.value){
        console.log('YOU WIN!!!');
    }else if (finalPlayerScore.value < finalDealerScore.value){
        console.log('DEALER WINS!!!');
    }else console.log("IT'S A PUSH!!!");
}while (ask("Play another round? (y/n): ").trim().toLowerCase().startsWith('y'));