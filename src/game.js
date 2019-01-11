import Car from './car.js';
import Background from './background.js';
import Track from './track.js';
import Tree from './tree.js';
import Corner from './corner.js';

class Game {
  constructor (canvas) {
    this.canvas = canvas;
    this.keys = [];
    canvas.width = 1000;
    canvas.height = 700;
    this.obstacles = [new Tree(300, 300, 100, 100), new Tree(450, 450, 100, 100)];
    this.background = new Background(this.canvas, this.obstacles);
    this.car = new Car(canvas.width / 2, canvas.height / 2, this);
  }
  
  run () {
    this.loadListeners();
    this.car.update();
    this.draw();
    requestAnimationFrame(this.run.bind(this))
  }

  draw() {
    const c = canvas.getContext('2d');
    c.save();
    c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    c.translate(-this.car.x + this.canvas.width / 2, -this.car.y + this.canvas.height / 2);
    this.background.render();
    this.car.moveCar();
    this.car.draw();
    c.restore();
  }


  loadListeners() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
    })
  }

  // checkCollision() {
  //   const car = this.car;
  //   const obstacles = this.obstacles;
  //   for (let i = 0; i < obstacles.length; i++) {
  //     const obj = obstacles[i]
      

  //     }
  //   }
  // }
}


export default Game;
