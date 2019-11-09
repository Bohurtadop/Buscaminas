var board = initMatriz();

function box(x, y, side, id){
    this.x = x;
    this.y = y;
    this.side = side;
    this.id = "" + Math.floor(id%10) + Math.floor(id/10);
    var div = '<button type="button" id="' + this.id + '" onclick="revealBox(this.id)" class="btn btn-secondary btn-outline-light"></button>';
    var board = document.getElementById("board").innerHTML;
    document.getElementById("board").innerHTML = board + div;
    document.getElementById(this.id).style.position = "absolute";
    document.getElementById(this.id).style.left = this.x + "px";
    document.getElementById(this.id).style.top = this.y + "px";
    document.getElementById(this.id).style.height = this.side-2 + "px";
    document.getElementById(this.id).style.width = this.side-2 + "px";
}

function initMatriz(){
    board = [];
    for (i = 0; i < 10; i++){
        board[i] = [0,0,0,0,0,0,0,0,0,0];
    }
    return board;
}

function placeBombs(){
    console.log("Placing bombs around the board");
    n = 0;
    while (n < 5){
        rand1 = Math.floor(Math.random() * 10);
        rand2 = Math.floor(Math.random() * 10);
        if (board[rand1][rand2] != 9){
            board[rand1][rand2] = 9;
            placeNumbs(rand1, rand2);
            n++;
            console.log(n);
        }
    }
    console.log(board);
}

function placeNumbs(x, y){
    console.log("Placing numbers around the bombs");
    for (i = x-1; i <= x+1; i++){
        for (j = y-1; j <= y+1; j++){
            if ( i >= 0 && i <= 9 && j >= 0 && j <= 9){
                if (board[i][j] != 9){
                    board[i][j]++;
                }
            }
        }
    }
}

function revealBox(id){
    var html = document.getElementById(id).innerHTML;
    document.getElementById(id).innerHTML = html + board[id[0]][id[1]];
    document.getElementById(id).style.backgroundColor = "red";
}