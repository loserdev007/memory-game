const cardLists = document.getElementById("cardList");
const startGameBtn = document.getElementById("start");
const startOverBtn = document.getElementById("start-over");
const gameMode = document.getElementById("difficulty-selection");
const modal = document.getElementById("myModal");
const level = document.getElementById("level");
const modalContent = document.getElementById("modalContent");
const modalCloseBtn = document.getElementById("modal-close");
let GOAL = null;
let SCORE = 0;
const clickRecords = new Set();
let multipleViews = 0;
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

// Creates unique n digit id
const makeid = (length) => {
   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
};
// Shows modal
const showModal = (msg, lvl) => {
   modalContent.textContent = msg;
   if (lvl == 0) {
      level.textContent = 'Excellent Work!';
   }else if(lvl > 0 && lvl <= cardLists.length / 3){
      level.textContent = 'Need to work better!';
   }else if(lvl < cardLists.length / 3 && lvl <= cardLists.length / 2){
      level.textContent = 'NoooooB!';
   }
   modal.style.display = 'flex';
};
// Creates n number of card elements
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
// Shuffles all card elements from the list
const shuffleList = () => {
   const listLength = cardElements.length;
   for(let i = 0; i < listLength; i++){
      const random = Math.floor(Math.random() * listLength);
      const temp = cardElements[random];
      cardElements[random] = cardElements[random - random];
      cardElements[random - random] = temp;
   }
};
// Inserts all card elements into the dom ul
const insertElements = () => {
   let allCardsHtml = '';
   for (const cardEl of cardElements) {
      allCardsHtml += cardEl.outerHTML;
   }
   cardLists.innerHTML = allCardsHtml;
};
// All step by step processing
const allProcess = () => {
   // Game is running
   if (isGameRunning) {
      modal.style.display = "flex";
      return;
   }
   // New Game Start
   else {
      startGameBtn.textContent = "Game is running...Start Over?";
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
// Starts the game from beginning
const startOver = () => {
   isGameRunning = false;
   modal.style.display = "none";
   allProcess();
};

let isCardflipped = false;
let cardId = null;
let selectedCardElement = null;

// Resets card checking logic
const reset = () => {
   isCardflipped = false;
   cardId = null;
   selectedCardElement = null;
}
// Resets game result and others
const resetGameLogic = () => {
   SCORE = null;
   GOAL = null;
   for (const item of clickRecords) {
      clickRecords.delete(item);
   }
   multipleViews = 0;
}

// Main Game Logic!!!
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

      // Memory power calculation
      const uniqueId = closestLi.getAttribute('data-unique-id');
      if (clickRecords.has(uniqueId)) {
         multipleViews++;
      }else{
         clickRecords.add(uniqueId);
      }
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

            // If no card available to open
            if (SCORE == GOAL) {
               // showModal('YAHOOO!\nYou\'v won the game. Start Over?');
               showModal('YAHOOO!\nYou\'v won the game. Start again?', multipleViews);
               resetGameLogic();
               reset();
               return;
            }
            // Memory power calculation
            clickRecords.delete(closestLi.getAttribute('data-unique-id'));
            if (multipleViews > 0) {
               multipleViews--;
            }
            reset();
         }else{
            // Memory power calculation
            const uniqueId = closestLi.getAttribute('data-unique-id');
            if (clickRecords.has(uniqueId)) {
               multipleViews++;
            }else{
               clickRecords.add(uniqueId);
            }
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