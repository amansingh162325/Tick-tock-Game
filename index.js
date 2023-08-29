const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winnigPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let create a function to initialise the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI pr empty bhi karana padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn()
{
    if(currentPlayer === 'X') {
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    // UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
     
    let answer = "";

    winnigPositions.forEach((positiin) => {
        // All 3 boxes should be non-empty and exactly same in value
        if((gameGrid[positiin[0]] !== "" || gameGrid[positiin[1]] !== "" || gameGrid[positiin[2]] !== "")
        && (gameGrid[positiin[0]] === gameGrid[positiin[1]]) && (gameGrid[positiin[1]]===gameGrid[positiin[2]])) {
        
            // check if winner is X
            if(gameGrid[positiin[0]] === "X")
            {
                answer = "X";
            }
            else
            {
                answer = "O";
            }
            // disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // now we know X/0 is a winner

            boxes[positiin[0]].classList.add("win");
            boxes[positiin[1]].classList.add("win");
            boxes[positiin[2]].classList.add("win");
    }
    });
    // it means we have a winner
    if(answer !=="") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // we know, No Winner Found, let's check whether there is tie
    let fillount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
        {
            fillount++;
        }
    });

    // bord is Filled, game is tie
    if(fillount === 9){
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }
}

 function handleClick(index)
 {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap karo turn ko
        swapTurn();
        // to check for anyone win or not
        checkGameOver();
    }
 }

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});


newGameBtn.addEventListener("click", initGame);
