
// var dealButton = document.getElementById('deal-button');

var suits = ["D", "H", "S", "C"];
var deck = [];
var value = ["A", "2", "3", "4", "5", "6", "7", "8", "8", "10", "J", "Q", "K"];
var point = [11,2,3,4,5,6,7,8,9,10,10,10,10];


var playerHand = [];
var dealerHand = [];

// creating deck
function getDeck(){
    for (var s = 0; s < suits.length; s++) { 
        for (var n = 0; n < values, length, n++;){
        cardImg = "CardImages/" + values[n] + suits[s] + ".jpg";
        var card = {
            value: value[n],
            Suit: suits[s],
            Points: points[n],
            img: cardImg
        };
        deck.push(card);
    }
    return deck;
}
}

// function shuffleArray(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
//     return array;
// }


function deal(){
    var playerCard1 = deck.pop();
    playerHand.push(playerCard1);
    
    var dealerCard1 = deck.pop();
    dealerHand.push(dealerCard1);
    
    var playerCard2 = deck.pop();
    playerHand.push(playerCard2);

    var dealerCard2 = deck.pop();
    dealerHand.push(dealerCard2);
    
    console.log(playerHand);
    console.log(dealerHand);


    var playerCard1 = document.createElement('img')
    playerCard1.setAttribute('src', playerHand[0].img)
    var playerCard2 = document.createElement('img')
    playerCard2.setAttribute('src', playerHand[1].img)
    var dealerCard1 = document.createElement('img')
    
    dealerCard1.setAttribute('src', dealerHand[0].img)
    var dealerCard2 = document.createElement('img')
    dealerCard2.setAttribute('src', dealerHand[1].img)
    var playerTable = document.getElementById('player-hand')
    var dealerTable = document.getElementById('dealer-hand')

    playerTable.appendChild(playerCard1)
    playerTable.appendChild(playerCard2)

    dealerTable.appendChild(dealerCard1)
    dealerTable.appendChild(dealerCard2)

    
}
deal()








