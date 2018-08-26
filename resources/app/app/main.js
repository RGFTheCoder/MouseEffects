var x1 = 0,
    y1 = 0;

const { ipcRenderer } = require('electron')

ipcRenderer.on('setMousePos', (event, arg) => {
    x1 = arg.x;
    y1 = arg.y;
});

var particles = [];
var speed = 2;
var maxage = 100;

function createParticle(x, y, st) {
    var temp = {};
    temp.x = x;
    temp.y = y;
    temp.dx = Math.sin(Math.random() * 134259879485) * speed;
    temp.dy = Math.sin(Math.random() * 134259879485) * speed;
    temp.steps = st || maxage;
    temp.step = function() {
        if (this.steps > 0) {
            this.x += this.dx;
            this.y += this.dy;
            this.steps--;
        } else {
            this.x = x1;
            this.y = y1;
            this.dx = Math.sin(Math.random() * 134259879485) * speed;
            this.dy = Math.sin(Math.random() * 134259879485) * speed;
            this.steps = maxage;
        }
    }
    return temp;
}

setInterval(() => {
    ipcRenderer.send('get-mouse-pos');
}, 1000 / 60);

function setup() {
    createCanvas(innerWidth, innerHeight);
    for (var i = 0; i < 50; i++) {
        particles[i] = createParticle(x1, y1, i * 2);
    };
}

function draw() {
    clear();
    background("rgba(0,0,0,0.01)");
    fill("rgba(0,0,0,0.1)");
    noStroke();
    for (var i = 0; i < particles.length; i++) {
        particles[i].step();
        fill("rgba(0,0,0," + (0.1 / maxage * particles[i].steps) + ")");
        ellipse(particles[i].x, particles[i].y, 50, 50);
    }
}

function windowResized() {
    resizeCanvas(innerWidth, innerHeight);
}