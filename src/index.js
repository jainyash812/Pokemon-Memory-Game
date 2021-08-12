import "./styles.css";

const cards = [
  {
    name: "pikachu",
    image: "./images/pikachu.png"
  },
  {
    name: "ponyta",
    image: "./images/ponyta.png"
  },
  {
    name: "bulbasaur",
    image: "./images/bulbasaur.png"
  },
  {
    name: "squirtle",
    image: "./images/squirtle.gif"
  },
  {
    name: "squirtle",
    image: "./images/squirtle.gif"
  },
  {
    name: "pikachu",
    image: "./images/pikachu.png"
  },
  {
    name: "ponyta",
    image: "./images/ponyta.png"
  },
  {
    name: "eve",
    image: "./images/eva.png"
  },
  {
    name: "bulbasaur",
    image: "./images/bulbasaur.png"
  },
  {
    name: "eve",
    image: "./images/eva.png"
  },
  {
    name: "scooby dooby doo",
    image: "./images/snorlax.png"
  },
  {
    name: "scooby dooby doo",
    image: "./images/snorlax.png"
  }
];

const cardContainer = document.getElementById("card-container");

const header = document.querySelector("#header");
const result = document.querySelector("#result");
const numOfMoves = document.querySelector("#numOfMoves");
const resetBtn = document.querySelector("#reset");

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let moves = 0;

function resetBoard() {
  result.textContent = "Number of Cards Matched: 0";
  numOfMoves.textContent = "Number of Moves Played: 0";
  document.querySelector(".won-gif").classList.add("none");
  cardsChosen = [];
  cardsChosenId = [];
  cardsWon = [];
  moves = 0;
  cards.sort(() => Math.random() - 0.5);
  createBoard();
}

function createBoard() {
  document.getElementById("card-container").innerHTML = null;
  header.innerText = "Poke Mem";
  resetBtn.innerText = "Restart ";
  result.innerText = "Number of Cards Matched: 0";
  numOfMoves.innerText = "Number of Cards Matched: 0";
  resetBtn.addEventListener("click", resetBoard);

  const resultEmoji = document.createElement("img");
  resultEmoji.setAttribute(
    "src",
    "https://media.giphy.com/media/ZcKASxMYMKA9SQnhIl/giphy.gif"
  );
  resultEmoji.setAttribute("class", "won-gif none");
  document.querySelector(".result-emoji").appendChild(resultEmoji);

  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement("img");
    card.setAttribute(
      "src",
      "https://upload.wikimedia.org/wikipedia/en/3/3b/Pokemon_Trading_Card_Game_cardback.jpg"
    );
    card.setAttribute("id", i);
    card.setAttribute("class", "card-images");
    card.addEventListener("click", flipCard);
    cardContainer.appendChild(card);
  }
}

createBoard();

function flipCard() {
  moves++;
  const cardId = this.getAttribute("id");
  cardsChosen.push(cards[cardId].name);
  cardsChosenId.push(cardId);
  this.setAttribute("src", cards[cardId].image);
  numOfMoves.innerHTML = "Number of Moves Played : " + moves;
  if (cardsChosen.length === 2 && cardsChosenId[0] !== cardsChosenId[1]) {
    setTimeout(checkForMatch, 2000);
  } else if (cardsChosenId[0] === cardsChosenId[1]) {
    result.textContent = "You clicked the same card twice";
    this.setAttribute(
      "src",
      "https://upload.wikimedia.org/wikipedia/en/3/3b/Pokemon_Trading_Card_Game_cardback.jpg"
    );
    cardsChosen = [];
    cardsChosenId = [];
  }
}

function checkForMatch() {
  let fakeCard = document.querySelectorAll(".card-images");
  const firstId = cardsChosenId[0];
  const secondId = cardsChosenId[1];
  if (cardsChosen[0] === cardsChosen[1]) {
    fakeCard[firstId].style.display = "none";
    fakeCard[secondId].style.display = "none";
    cardsWon.push(cardsChosen);
  } else {
    fakeCard[firstId].setAttribute(
      "src",
      "https://upload.wikimedia.org/wikipedia/en/3/3b/Pokemon_Trading_Card_Game_cardback.jpg"
    );
    fakeCard[secondId].setAttribute(
      "src",
      "https://upload.wikimedia.org/wikipedia/en/3/3b/Pokemon_Trading_Card_Game_cardback.jpg"
    );
  }

  cardsChosen = [];
  cardsChosenId = [];
  result.textContent = "Number of Cards Matched : " + cardsWon.length;
  if (cardsWon.length === cards.length / 2) {
    result.textContent = "Congratulations you found them all!!!";
    document.querySelector(".won-gif").classList.remove("none");
    setTimeout(resetBoard, 10000);
  }
}
