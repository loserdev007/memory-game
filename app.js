const cardLists = document.getElementById("cardList");
const imageLinks = [
   'justin.jpg',
   'doug.jpg',
   'bernard.jpg'
]
let shuffledCards = [];
// https://flaviocopes.com
for (const link of imageLinks) {
   const cardLi = document.createElement("li");
   cardLi.id = makeid(3);
   cardLi.innerHTML = `<div class="flip-card">
           <div class="flip-card-inner">
             <div class="flip-card-front">
             </div>
             <div class="flip-card-back">
               <img src="img/${link}" alt="doug" style="width:250px;height:250px;">
             </div>
           </div>
         </div>`;
   shuffledCards.push(cardLi);
   shuffledCards.push(cardLi);
}
const shuffledCardsLen = shuffledCards.length;
for(let i = shuffledCardsLen - 1; i > 0; i--){
  const j = Math.floor(Math.random() * i);
  const temp = shuffledCards[i];
  shuffledCards[i] = shuffledCards[j];
  shuffledCards[j] = temp;
}
let htm = '';
for (const perCard of shuffledCards) {
   htm += perCard.outerHTML;
   console.log("...data");
}
cardLists.innerHTML = htm;
function makeid(length) {
   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

let number = null;
cardLists.addEventListener('click', event => {
   if (number === null && event.target.tagName == 'DIV') {
      // console.log("First Time", number);
      if (event.target.tagName == 'DIV') {
         event.target.closest('div.flip-card-inner').classList.toggle('flip');
         number = event.target.closest('li').id;
         // console.log(number);
      }
      // console.log("First End")
   }else if(number !== null && event.target.tagName == 'DIV'){
      // console.log('=========');
      // console.log("Second Time", number);
      event.target.closest('div.flip-card-inner').classList.toggle('flip');
      const allCards = document.getElementsByTagName("div");
      for (const cardEl of allCards) {
         cardEl.style.pointerEvents = "none";
      }
      const anotherNumber = event.target.closest('li').id;
      setTimeout(() => {
         if (anotherNumber != number) {
            console.log("You Looooose!");
            const lists = document.querySelectorAll(".flip");
            for (el of lists) {
               if (!el.classList.contains("complete")){
                  el.classList.toggle('flip');
               }
            }
         }else{
            console.log("Yaaahooooo!");
            const lists = document.querySelectorAll(".flip img");
            for (el of lists) {
               el.closest(".flip").className += ' complete';
               // if (!el.closest(".flip").classList.contains("complete")){
               //    el.classList.toggle('flip');
               // }
               el.style.outline = "5px solid cyan";

            }
         }
         number = null;
         for (const cardEl of allCards) {
            cardEl.style.pointerEvents = "auto";
         }
      }, 1200);
   }
   // else {
   //    event.target.closest('div.flip-card-inner').classList.toggle('flip');
   // }
})