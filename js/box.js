var board = initMatriz();

function box(x, y, side, id) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.id = "" + Math.floor(id % 10) + Math.floor(id / 10);
    var div = '<button type="button" id="' + this.id + '" onclick="revealBox(this.id)" class="p-0 btn btn-secondary btn-outline-light"></button>';
    var brd = document.getElementById("board").innerHTML;
    document.getElementById("board").innerHTML = brd + div;
    document.getElementById(this.id).style.position = "absolute";
    document.getElementById(this.id).style.left = this.x + "px";
    document.getElementById(this.id).style.top = this.y + "px";
    document.getElementById(this.id).style.height = this.side - 2 + "px";
    document.getElementById(this.id).style.width = this.side - 2 + "px";
}

function initMatriz() {
    board = [];
    for (i = 0; i < 10; i++) {
        board[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    return board;
}

function placeBombs() {
    console.log("Placing bombs around the board");
    n = 0;
    var bombs = parseInt(prompt("Bienvenido/a a Buscaminas, digite el número de bombas (Máximo 20, default 10).", "20"));
    if (isNaN(bombs) || bombs < 1 || bombs > 20){
        bombs = 10;
    }
    while (n < bombs) {
        rand1 = Math.floor(Math.random() * 10);
        rand2 = Math.floor(Math.random() * 10);
        if (board[rand1][rand2] != 9) {
            board[rand1][rand2] = 9;
            placeNumbs(rand1, rand2);
            n++;
            console.log(n);
        }
    }
}

function placeNumbs(x, y) {
    console.log("Placing numbers around the bombs");
    for (i = x - 1; i <= x + 1; i++) {
        for (j = y - 1; j <= y + 1; j++) {
            if (i >= 0 && i <= 9 && j >= 0 && j <= 9) {
                if (board[i][j] != 9) {
                    board[i][j]++;
                }
            }
        }
    }
}

async function revealBox(id) {
    var html = document.getElementById(id).innerHTML;
    if (board[id[0]][id[1]] > 0) {
        if(board[id[0]][id[1]] == 9){
            var bombImg = '<img class="p-0 m-0" src="assets/img/bomb.png" style="height: ' + side*0.85 + 'px; width: ' + side*0.86 + 'px;">';
            document.getElementById(id).style.backgroundColor = "darkorange";
            document.getElementById(id).style.background = "transparent";
            document.getElementById(id).innerHTML = bombImg; 
            setTimeout(lose, 200);
        }else{
            document.getElementById(id).style.backgroundColor = "cadetblue";
            document.getElementById(id).style.color = "white";
            document.getElementById(id).innerHTML = html + board[id[0]][id[1]];
        }
        board[id[0]][id[1]] = -2;
        if(verifyFullBoard()){
            setTimeout(win, 200);
        }
    } else if(board[id[0]][id[1]] == 0){
        new expandBoxes(parseInt(id[0]), parseInt(id[1]));
        document.getElementById(id).style.backgroundColor = "floralwhite";
        document.getElementById(id).style.color = "black";
    } else if(board[id[0]][id[1]] != -2){
        document.getElementById(id).style.backgroundColor = "floralwhite";
        document.getElementById(id).style.color = "black";
    }
}

var expandBoxes = function(px, py) {
    this.x = px;
    this.y = py;
    for (this.i = (this.x-1); this.i <= (this.x+1); this.i++) {
        for (this.j = (this.y-1); this.j <= (this.y+1); this.j++) {
            if (this.i == this.x && (this.j == (this.y-1) || this.j == (this.y+1))){
                if (this.i >= 0 && this.i <= 9 && this.j >= 0 && this.j <= 9) {
                    if (board[this.i][this.j] == 0) {
                        board[this.i][this.j] = -1;
                        revealBox("" + this.i + this.j);
                        new expandBoxes(this.i, this.j);
                    }
                }
            }
            if (this.j == this.y && (this.i == (this.x-1) || this.i == (this.x+1))){
                if (this.i >= 0 && this.i <= 9 && this.j >= 0 && this.j <= 9) {
                    if (board[this.i][this.j] == 0) {
                        board[this.i][this.j] = -1;
                        revealBox("" + this.i + this.j);
                        new expandBoxes(this.i, this.j);
                    }
                }
            }
        }
    }
}

function verifyFullBoard(){
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++){
            if (board[i][j] < 9 && board[i][j] > 0){
                return false;
            }
        }
    }
    return true;
}

function win(){
    alert("You win")
    location.reload();
}

function lose(){
    alert("You lose")
    location.reload();
}