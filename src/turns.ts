import { Card } from "./card"; 
import { Player } from "./types";
import { HandScore } from "./hand";
import { addPlayerCard }from "./player";

export interface TurnResult {
    finalScore: HandScore;
    result: 'bust' | 'blackjack' | 'stand';
    draws: number;
    actions: Array<'hit' | 'stand'>;
}
// Handle player hit or stand decisions
export function playerTurn(player: Player, draw: () => Card | undefined, score: (hand: Card[]) => HandScore, ask: (q:string) => string ) {
    let draws = 0;
    const actions: Array<'hit' | 'stand'> = [];

    const initialScore = score(player.hand);
    // Check for player blackjack and end game
    if (initialScore.value === 21 && player.hand.length === 2) {
        return { finalScore: initialScore, result: 'blackjack', draws, actions };
    }

    while (true){
        const currentScore = score(player.hand);
        if (currentScore.value > 21){
            return { finalScore: currentScore, result: 'bust', draws, actions };
        }
        const action = ask("Do you want to 'hit' or 'stand'? ").trim().toLowerCase();

        if (action.startsWith('s') || (currentScore.value >= 21)){
            actions.push('stand');
            return { finalScore: currentScore, result: 'stand', draws, actions };
        }

        if (action.startsWith('h')){
            const newCard = draw();
            if (!newCard){
                actions.push('stand');
                return { finalScore: currentScore, result: 'stand', draws, actions };
            }else{
                addPlayerCard(player, newCard);
                actions.push('hit');
                draws++;
                continue;
            }
            
        }
    }
}