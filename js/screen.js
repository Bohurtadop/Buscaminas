var screen = {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
}

function printTittle(){
    var div = "<div class='container-fluid text-center h1'>Buscaminas</div>";
    var html = document.getElementById("tittle").innerHTML;
    document.getElementById("tittle").innerHTML = html + div;
    document.getElementById("tittle").style.backgroundColor = "red";
    document.getElementById("tittle").style.color = "white";
    document.getElementById("tittle").style.height = screen.height*0.08 + "px";
}

function printBoard(){
    var height = screen.height*0.92;
    var width = screen.width;
    var side;
    var id = 0;
    document.getElementById("board").style.backgroundColor = "white";
    document.getElementById("board").style.color = "white";
    document.getElementById("board").style.width = width + "px";
    document.getElementById("board").style.height = height + "px";
    if(width > height){
        side = height/12;
        for(var x = (width-height)/2 + (height/12); x < width - ((width-height)/2) - (height/11); x = x + side){
            for(var y = screen.height*0.08 + (height/12); y < screen.height*0.08 + height - (height/11); y = y + side){
                box(x, y, side, id);
                id++;
            }
        }
    }else{
        side = width/12;
        for(var x = 0 + (width/12); x < width - (width/11); x = x + side){
            for(var y = screen.height*0.08 + ((height-width)/2) + (width/12); y < screen.height*0.08 + height - ((height-width)/2) - (width/11); y = y + side){
                box(x, y, side, id);
                id++;
            }
        }
    }
    
}

function printScreen(){
    printTittle();
    printBoard();
    placeBombs();
}