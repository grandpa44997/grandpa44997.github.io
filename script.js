const cyclist = document.getElementById('cyclist');
const moto = document.getElementById('moto');

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});

function jump() {
    if (!cyclist.classList.contains('jump')) {
        cyclist.classList.add('jump');
        setTimeout(function() {
            cyclist.classList.remove('jump');
        }, 500);
    }
}

let isAlive = setInterval(function() {
    let cyclistBottom = parseInt(window.getComputedStyle(cyclist).getPropertyValue('bottom'));
    let motoLeft = parseInt(window.getComputedStyle(moto).getPropertyValue('right'));

    if (motoLeft > 550 && motoLeft < 600 && cyclistBottom <= 50) {
        alert('Game Over!');
        moto.style.animation = 'none';
        moto.style.display = 'none';
        clearInterval(isAlive);
    }
}, 10);
