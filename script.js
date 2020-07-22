const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
	if(lockBoard) return;

	//dont allow double click of same card
	if(this === firstCard) return;

	this.classList.add("flip");

	if(!hasFlippedCard){
		//first clicked
		hasFlippedCard = true;
		firstCard = this;

		return;
	} 
	//second click
	hasFlippedCard = false;
	secondCard = this;

	checkForMatch();	
}

function checkForMatch(){
	//do cards match?
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
		isMatch ? disableCards() : unflipCards();
}

function disableCards(){
	firstCard.removeEventlistener('click', flipCard);
	secondCard.removeEventlistener('click', flipCard);
	resetBoard();
}

function unflipCards(){
	lockBoard = true;
	setTimeout(()=>{
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');
			lockBoard = false;
			resetBoard();
			}, 1000);
}

function resetBoard(){
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

(function shuffle(){
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12)
		card.style.order = randomPos;
	});
})();

cards.forEach(card => card.addEventListener('click', flipCard));
