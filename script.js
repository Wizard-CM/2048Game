let boardContainer = document.getElementById("board");

window.onload = function () {
  gameSet();
};

// Variables
let cols = 4;
let rows = 4;
let score=0;

let board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

// let board = [
//   [2, 2, 2, 2],
//   [2, 2, 2, 2],
//   [4, 4, 8, 8],
//   [4, 4, 8, 8],
// ];
function gameSet() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let tile = document.createElement("div");
      tile.id = `${r.toString()}-${c.toString()}`;
      let tileInnerElement = board[r][c];
      tileUpdate(tile, tileInnerElement);
      document.getElementById("board").append(tile);
    }
  }
  SetTwo();
  SetTwo();
}

function tileUpdate(tile, tileInnerElement) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if (tileInnerElement > 0) {
    tile.innerText = tileInnerElement;
  }
  if (tileInnerElement <= 4096) {
    tile.classList.add("x" + tileInnerElement.toString());
  } else {
    tile.classList.add("x8192");
  }
}

document.addEventListener("keyup", function (e) {
  if (e.code == "ArrowLeft") {
    slideLeft();
    SetTwo();
  }
  if (e.code == "ArrowRight") {
    slideRight();
    SetTwo();
  }
  if (e.code == "ArrowUp") {
    slideUp();
    SetTwo();
  }
  if (e.code == "ArrowDown") {
    slideDown();
    SetTwo();
  }
  document.querySelector('.score').innerText = `Score : ${score}`;
});

// Zerofilterer function
function filterZero(eachrow) {
  return eachrow.filter((num) => num > 0);
}

function slider(eachrow) {
  eachrow = filterZero(eachrow);

  for (let r = 0; r < eachrow.length; r++) {
    if (eachrow[r] == eachrow[r + 1]) {
      eachrow[r] = eachrow[r] * 2;
      eachrow[r + 1] = 0;
      score = score + eachrow[r]
    }
  }

  eachrow = filterZero(eachrow);

  while (eachrow.length < cols) {
    eachrow.push(0);
  }
  return eachrow;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let eachrow = board[r];
    eachrow = slider(eachrow);
    board[r] = eachrow;

    for (let c = 0; c < cols; c++) {
      tile = document.getElementById(`${r}-${c}`);
      tileInnerElement = board[r][c];
      tileUpdate(tile, tileInnerElement);
      boardContainer.append(tile);
    }
  }
}
function slideRight() {
  for (let r = 0; r < rows; r++) {
    let eachrow = board[r];
    eachrow.reverse();
    eachrow = slider(eachrow);
    eachrow.reverse();
    board[r] = eachrow;

    for (let c = 0; c < cols; c++) {
      tile = document.getElementById(`${r}-${c}`);
      tileInnerElement = board[r][c];
      tileUpdate(tile, tileInnerElement);
      boardContainer.append(tile);
    }
  }
}
function slideUp() {
  for (let c = 0; c < cols; c++) {
    let eachrow = [board[0][c], board[1][c], board[2][c], board[3][c]];
    eachrow = slider(eachrow);
    board[0][c] = eachrow[0];
    board[1][c] = eachrow[1];
    board[2][c] = eachrow[2];
    board[3][c] = eachrow[3];

    for (let r = 0; r < rows; r++) {
      board[r][c] = eachrow[r];
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let tileInnerElement = board[r][c];
      tileUpdate(tile, tileInnerElement);
    }
  }
}
function slideDown() {
  for (let c = 0; c < cols; c++) {
    let eachrow = [board[0][c], board[1][c], board[2][c], board[3][c]];
    eachrow.reverse();
    eachrow = slider(eachrow);
    eachrow.reverse();
    board[0][c] = eachrow[0];
    board[1][c] = eachrow[1];
    board[2][c] = eachrow[2];
    board[3][c] = eachrow[3];

    for (let r = 0; r < rows; r++) {
      board[r][c] = eachrow[r];
      let tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      let tileInnerElement = board[r][c];
      tileUpdate(tile, tileInnerElement);
    }
  }
}

function SetTwo() {
  let run = true;

  while (run) {
    if(isFull()){
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if(board[r] !== board[c]){
                  setTimeout(()=>{
                    document.getElementById('board').innerHTML=`<h1>GameOver</h1>`
                  },5000)
                }
            }
            
          }
        return;
    }


    let r = Math.floor(Math.random() * 4);
    let c = Math.floor(Math.random() * 4);
    if (board[r][c] == 0) {
      board[r][c] = 2;
      tile = document.getElementById(`${r.toString()}-${c.toString()}`);
      tile.innerText = board[r][c];
      tile.classList.add("tile");
      tile.classList.add("x2");
      run = false;
      console.log("run");
    }
  }

}
function isFull(){
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < rows; c++) {
            if(board[r][c] == 0){
                return false;
            }
            
        }
        
    }
    return true;
}
