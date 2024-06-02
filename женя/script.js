window.onload = function() {
    div = document.querySelector('.class');
    div.removeAttribute('style');
}
div = document.querySelector('.class');
button = document.querySelector('.peremehenie');

function generationColor() {
    var color = [];
    for (var i = 0; i < 3; i++) {
        color[i] = Math.floor(Math.random() * 256);
    }
    return color;
}

function tp() {
    var x = Math.floor(Math.random() * 821);
    var y = Math.floor(Math.random() * 1001);
    var size = Math.floor(Math.random() * 91);
    var color = generationColor();
    div.setAttribute('style', 'position: absolute; top: ' + x + 'px; right: ' + y + 'px; font-size: ' + size + 'px; color: rgb(' + color + ')');
    console.log('отступ сверху - ' + x + '  отступ справа - ' + y + '  размер - ' + size + '  цвет - (' + color + ')');
}

button.onclick = tp;
// document.body.onmousemove = tp;
document.body.onkeypress = tp;