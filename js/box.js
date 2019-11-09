function Box(x, y, side){
    console.log("Drawing box");
    this.x = x;
    this.y = y;
    this.side = side;
    this.id = "box" + x + y;
    var div = '<button type="button" id="' + this.id + '" class="btn btn-secondary btn-outline-light">1</button>';
    var board = document.getElementById("board").innerHTML;
    document.getElementById("board").innerHTML = board + div;
    document.getElementById(this.id).style.position = "absolute";
    document.getElementById(this.id).style.left = this.x + "px";
    document.getElementById(this.id).style.top = this.y + "px";
    document.getElementById(this.id).style.height = this.side-2 + "px";
    document.getElementById(this.id).style.width = this.side-2 + "px";
}