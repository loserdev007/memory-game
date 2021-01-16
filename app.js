const cardLists = document.getElementById("cardList");
const startGameBtn = document.getElementById("start");
const startOverBtn = document.getElementById("start-over");
const gameMode = document.getElementById("difficulty-selection");
const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modalContent");
const modalCloseBtn = document.getElementById("modal-close");
let GOAL = null;
let SCORE = 0;

let isGameRunning = false;
const imageLinks = [
   "ion-social-twitter",
   "ion-social-facebook",
   "ion-social-googleplus",
   "ion-social-google",
   "ion-social-dribbble",
   "ion-social-octocat",
   "ion-social-github",
   "ion-social-instagram",
   "ion-social-whatsapp",
   "ion-social-snapchat",
   "ion-social-foursquare",
   "ion-social-pinterest",
   "ion-social-rss",
   "ion-social-tumblr",
   "ion-social-wordpress",
]
let cardElements = [];

// ==========================================================
// All Functions
const makeid = (length) => {
   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
};
const showModal = (msg) => {
   modalContent.textContent = msg;
   modal.style.display = 'flex';
};
const createCardElements = (totalCards) => {
   // Making array empty
   // cardElements.splice(0, cardElements.length);
   cardElements.length = 0;
   for(let i = 0; i < totalCards; i++){
      const cardIcon = imageLinks[i];
      const liElement = document.createElement('li');
      liElement.innerHTML = `<div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"></div><div class="flip-card-back"><i class="${cardIcon}"></i></div></div></div>`;
      liElement.setAttribute("data-unique-id", makeid(6));
      cardElements.push(liElement);
      cardElements.push(liElement);
   }
};
const shuffleList = () => {
   const listLength = cardElements.length;
   for(let i = 0; i < listLength; i++){
      const random = Math.floor(Math.random() * listLength);
      const temp = cardElements[random];
      cardElements[random] = cardElements[random - random];
      cardElements[random - random] = temp;
   }
};
const insertElements = () => {
   let allCardsHtml = '';
   for (const cardEl of cardElements) {
      allCardsHtml += cardEl.outerHTML;
   }
   cardLists.innerHTML = allCardsHtml;
};
const allProcess = () => {
   // Game is running
   if (isGameRunning) {
      modal.style.display = "flex";
      return;
   }
   // New Game Start
   else {
      startGameBtn.textContent = "Game is running...Start Over?";
      console.log("Selecting", parseInt(gameMode.value));
      switch (parseInt(gameMode.value)) {
         case 1:
            createCardElements(5);
            GOAL = 5;
            break;
         case 2:
            createCardElements(10);
            GOAL = 10;
            break;
         case 3:
            createCardElements(15);
            GOAL = 15;
            break;
      }
      shuffleList();
      shuffleList();
      insertElements();
      isGameRunning = true;
   }
};
const startOver = () => {
   isGameRunning = false;
   modal.style.display = "none";
   allProcess();
};

let isCardflipped = false;
let cardId = null;
let selectedCardElement = null;

const reset = () => {
   isCardflipped = false;
   cardId = null;
   selectedCardElement = null;
}
const mainFunction = (Element) => {
   const targetedElement = Element.target;
   const targetedElClassName = targetedElement.className;
   const cardFront = 'flip-card-front';
   const cardBack = 'flip-card-back';
   const cardInner = 'flip-card-inner';
   const flip = 'flip';
   const closestLi = targetedElement.closest('li');
   const closestInner = targetedElement.closest('.' + cardInner);

   // Noooo card is flipped
   if (targetedElClassName === cardFront && !cardId && !isCardflipped) {
      cardId = closestLi.getAttribute('data-unique-id');
      isCardflipped = true;
      selectedCardElement = closestLi;
      closestInner.classList.toggle(flip);
   }
   // One card is selected and checking for equality
   else if(targetedElClassName === cardFront && isCardflipped){
      const anotherCardId = closestLi.getAttribute('data-unique-id');
      closestInner.classList.toggle(flip);
      setTimeout(() => {
         if (cardId === anotherCardId) {
            targetedElement.nextElementSibling.style.backgroundColor = "#4349503b";
            targetedElement.nextElementSibling.children[0].style.color = "#3e46509c";
            selectedCardElement.getElementsByClassName(cardBack)[0].style.backgroundColor = "#4349503b";
            selectedCardElement.getElementsByTagName('i')[0].style.color = "#3e46509c";
            SCORE++;
            if (SCORE == GOAL) {
               SCORE = null;
               GOAL = null;
               showModal('YAHOOO!\nYou\'v won the game. Start Over?');
            }
            reset();
         }else{
            closestInner.classList.toggle(flip);
            selectedCardElement.getElementsByClassName(cardInner)[0].classList.toggle(flip);
            reset();
         }
      }, 600)
   }
   // Clicked on the same card
   else if(targetedElClassName === cardBack && closestLi.getAttribute('data-unique-id') === cardId){
      reset();
      closestInner.classList.toggle(flip);
   }
}



// ==========================================================
// All Event Listeners
cardLists.addEventListener('click', mainFunction);
startGameBtn.addEventListener('click', allProcess);
startOverBtn.addEventListener('click', startOver);
modalCloseBtn.addEventListener('click', () => {modal.style.display = "none";});



// ==========================================================
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}












// Shuffle array (Image Links)
// create card element from last item of that array
// append element to the list











// let shuffledCards = [];
// // https://flaviocopes.com
// for (const link of imageLinks) {
//    const cardLi = document.createElement("li");
//    cardLi.id = makeid(3);
//    cardLi.innerHTML = `<div class="flip-card"><div class="flip-card-inner"></div><div class="flip-card-back"><img src="img/${link}" alt="doug" style="width:200px;height:200px;"></div></div></div>`;
//    shuffledCards.push(cardLi);
//    shuffledCards.push(cardLi);
// }
// const shuffledCardsLen = shuffledCards.length;
// for(let i = shuffledCardsLen - 1; i > 0; i--){
//   const j = Math.floor(Math.random() * i);
//   const temp = shuffledCards[i];
//   shuffledCards[i] = shuffledCards[j];
//   shuffledCards[j] = temp;
// }
// let htm = '';
// for (const perCard of shuffledCards) {
//    htm += perCard.outerHTML;
//    console.log("...data");
// }
// cardLists.innerHTML = htm;
// function makeid(length) {
//    var result = '';
//    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//    var charactersLength = characters.length;
//    for (var i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//    }
//    return result;
// }

// let number = null;
// cardLists.addEventListener('click', event => {
//    if (number === null && event.target.tagName == 'DIV') {
//       // console.log("First Time", number);
//       if (event.target.tagName == 'DIV') {
//          event.target.closest('div.flip-card-inner').classList.toggle('flip');
//          number = event.target.closest('li').id;
//          // console.log(number);
//       }
//       // console.log("First End")
//    }else if(number !== null && event.target.tagName == 'DIV'){
//       // console.log('=========');
//       // console.log("Second Time", number);
//       event.target.closest('div.flip-card-inner').classList.toggle('flip');
//       const allCards = document.getElementsByTagName("div");
//       for (const cardEl of allCards) {
//          cardEl.style.pointerEvents = "none";
//       }
//       const anotherNumber = event.target.closest('li').id;
//       setTimeout(() => {
//          if (anotherNumber != number) {
//             console.log("You Looooose!");
//             const lists = document.querySelectorAll(".flip");
//             for (el of lists) {
//                if (!el.classList.contains("complete")){
//                   el.classList.toggle('flip');
//                }
//             }
//          }else{
//             console.log("Yaaahooooo!");
//             const lists = document.querySelectorAll(".flip img");
//             for (el of lists) {
//                el.closest(".flip").className += ' complete';
//                // if (!el.closest(".flip").classList.contains("complete")){
//                //    el.classList.toggle('flip');
//                // }
//                el.style.outline = "5px solid cyan";

//             }
//          }
//          number = null;
//          for (const cardEl of allCards) {
//             cardEl.style.pointerEvents = "auto";
//          }
//       }, 1200);
//    }
//    // else {
//    //    event.target.closest('div.flip-card-inner').classList.toggle('flip');
//    // }
// })