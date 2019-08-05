var blackjack = (function() {

function Card(rank, suit){
	this.rank = rank;
this.suit = suit;
}

// GETS POINTS FOR CARDS
Card.prototype.getValue = function(currentTotal){
	var value = 0;

	if (this.rank == 'A' && currentTotal < 11){
			value = 11;
	} else if (this.rank == 'A'){
			value = 1;
	} else if (this.rank == 'J' || this.rank == 'Q' || this.rank == 'K'){
			value = 10;
	} else {
			value = parseInt(this.rank);
	}
	return value;
}





function Player(element, hand){
	this.hand = hand;
	this.element = element;
}

//Player Hit
Player.prototype.hit = function(card){
	this.hand.push(card);
}

//Returns player's total score
Player.prototype.getScore = function(){
	var points = 0;
	for(var i = 0; i < this.hand.length; i++){
		if(i == 0) points = this.hand[i].getValue(0);
		else points += this.hand[i].getValue(points);
	}
	return points;
}


Player.prototype.showHand = function(){
	var hand = "";
	for(var i = 0; i < this.hand.length; i++){
		hand += this.hand[i].view();
	}
	return hand;
}

// Renders cards
Card.prototype.view = function(){
	var htmlEntities = {
		'hearts' : '&#9829;',
		'diamonds' : '&#9830;',
		'clubs' : '&#9827;',
		'spades' : '&#9824;'
	}
	return `
		<div class="card ` + this.suit + `">
			<div class="top rank">` + this.rank + `</div>
			<div class="suit">` + htmlEntities[this.suit] + `</div>
			<div class="bottom rank">` + this.rank + `</div>
		</div>
	`;
}

var Deck = new function(){
	this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['hearts', 'spades', 'diamonds','clubs'];
this.deck;

	
	this.init = function(){
		this.deck = []; 
		for(var s = 3; s >= 0; s--){
		for(var r = 12; r >= 0; r--){
	this.deck.push(new Card(this.ranks[r], this.suits[s]));
		}
	}
	}

	//SHUFFLE FUNCTION
	
	this.shuffle = function(){
		var j, x, i;
		for (i = this.deck.length; i; i--) {
				j = Math.floor(Math.random() * i);
				x = this.deck[i - 1];
				this.deck[i - 1] = this.deck[j];
				this.deck[j] = x;
		}
	}

}


var Game = new function(){

	
		// DEAL BUTTON EVENT HANDLER
	
	this.dealButtonHandler = function(){
		Game.start();
		this.dealButton.disabled = true;
		this.hitButton.disabled = false;
		this.standButton.disabled = false;
	}

	
		// HIT BUTTON EVENT HANDLER
	
	this.hitButtonHandler = function(){
		//adds card to player's hand
		var card = Deck.deck.pop();
		this.player.hit(card);

		//render the card and score
		document.getElementById(this.player.element).innerHTML += card.view();
		this.playerScore.innerHTML = this.player.getScore();

		
		if(this.player.getScore() > 21){
			this.gameEnded('You lost! :(');
		}
	}

	
		// STAND BUTTON EVENT HANDLER
	
	this.standButtonHandler = function(){
		this.hitButton.disabled = true;
		this.standButton.disabled = true;

		
		while(true){
			var card = Deck.deck.pop();

			this.dealer.hit(card);
			document.getElementById(this.dealer.element).innerHTML += card.view();
			this.dealerScore.innerHTML = this.dealer.getScore();

			var playerBlackjack = this.player.getScore() == 21,
					dealerBlackjack = this.dealer.getScore() == 21;

			//Rule set
			if(dealerBlackjack && !playerBlackjack) {
					this.gameEnded('You lost! :(');
					break;
			} else if(dealerBlackjack && playerBlackjack) {
					this.gameEnded('Draw!');
					break;
			} else if(this.dealer.getScore() > 21 && this.player.getScore() <= 21) {
					this.gameEnded('You won! =D');
					break;
			} else if(this.dealer.getScore() > this.player.getScore() && this.dealer.getScore() <= 21 && this.player.getScore() < 21) {
					this.gameEnded('You lost! :(');
					break;
			}
			

		}
	}
	
		// INITIALIZE
	
	this.init = function(){
		this.dealerScore = document.getElementById('dealer-score').getElementsByTagName("span")[0];
		this.playerScore = document.getElementById('player-score').getElementsByTagName("span")[0];
		this.dealButton = document.getElementById('deal');
		this.hitButton = document.getElementById('hit');
		this.standButton = document.getElementById('stand');

		
		this.dealButton.addEventListener('click', this.dealButtonHandler.bind(this));
		this.hitButton.addEventListener('click', this.hitButtonHandler.bind(this));
		this.standButton.addEventListener('click', this.standButtonHandler.bind(this));

	}

	
		// START THE GAME
	
	this.start = function(){

		//initialize and shuffle the deck of cards
		Deck.init();
		Deck.shuffle();

		//deal one card to dealer
		this.dealer = new Player('dealer', [Deck.deck.pop()]);

		//deal two cards to player
		this.player = new Player('player', [Deck.deck.pop(), Deck.deck.pop()]);

		//render the cards
		document.getElementById(this.dealer.element).innerHTML = this.dealer.showHand();
		document.getElementById(this.player.element).innerHTML = this.player.showHand();

		//renders the current scores
		this.dealerScore.innerHTML = this.dealer.getScore();
		this.playerScore.innerHTML = this.player.getScore();

		this.setMessage("Hit or Stand");
	}

	
		// If the player wins or looses
	
	this.gameEnded = function(str){
		this.setMessage(str);
		this.dealButton.disabled = false;
		this.hitButton.disabled = true;
		this.standButton.disabled = true;

	}

	
		// Instructions or status of game
	
	this.setMessage = function(str){
		document.getElementById('status').innerHTML = str;
	}


}


return {
	init: Game.init.bind(Game)
}

})() 






