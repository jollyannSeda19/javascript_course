function showDate()  {
    document.getElementById('demo').innerHTML=Date();
}

function hideDate() {
    document.getElementById('demo').innerHTML="";
}

function mouseEnter() {
    let gameCanvas = document.getElementById('game');
    gameCanvas.addEventListener("mouseenter", function() {
        document.getElementById('demo').textContent="mouseIn";
    });
}