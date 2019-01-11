class Car {
  constructor (x, y, game) {
    this.img = new Image()
    this.img.src = '../assets/ken.png';
    this.scale = 0.07
    this.imgw = 1520 * this.scale
    this.imgh = 766 * this.scale
    this.x = x;
    this.y = y;
    this.rad = 0
    this.frontLeft = {x: this.x - this.imgw / 3, y: this.y + this.imgh / 2};
    this.backLeft = {x: this.x + this.imgw / 3 * 2, y: this.y + this.imgh / 2};
    this.frontRight = {x: this.x - this.imgw / 3, y: this.y - this.imgh /2};
    this.backRight = {x: this.x + this.imgw / 3 * 2, y: this.y - this.imgh / 2};
    this.corners = [this.frontLeft, this.frontRight, this.backLeft, this.backRight];
    this.velX = 0
    this.velY = 0
    this.accX = 0
    this.accY = 0
    this.game = game
    console.log(this.corners)
  }

  draw() {
    const c  = canvas.getContext('2d');

    const friction = 0.96;
    this.velX *= friction;
    this.velY *= friction;

    c.translate(this.velX, this.velY)
    this.update();

    c.save()
    c.translate(this.x , this.y);
    c.rotate(this.rad);

    c.drawImage(this.img, this.imgw / 3 * -1, this.imgh  / 2 * -1, this.imgw , this.imgh)
    c.restore();
  }

  update() {
    this.velX += this.accX;
    this.velY += this.accY;

    this.x -= (this.velX);
    this.y -= (this.velY);
  }


  moveCar() {
    const c = canvas.getContext('2d');
    if (this.game.keys['w']) {
      let ax = Math.cos(this.rad) * 0.08;
      let ay = Math.sin(this.rad) * 0.08;
      this.accX = ax;
      this.accY = ay;

      const newCorners = this.corners.map(corner => {
        return this.turnCorners(corner.x, corner.y)
      })
    } else {
      this.accX = this.accY = 0;
    }

    if (this.game.keys['a']) {
      this.rad -= 0.03
      const newCorners = this.corners.map(corner => {
        return this.turnCorners(corner.x, corner.y)
      })

      this.corners = newCorners;
      console.log(this.corners)
    } else if (this.game.keys['d']) {
      this.rad += 0.03
      const newCorners = this.corners.map(corner => {
        return this.turnCorners(corner.x, corner.y)
      })

      this.corners = newCorners;
      console.log(this.corners)
    }

    if (this.game.keys['s']) {
      let ax = Math.cos(this.rad) * 0.01 * - 1
      let ay = Math.sin(this.rad) * 0.01 * - 1
      this.accX = ax;
      this.accY = ay;
    }
  }

  turnCorners(x,y) {
    let tempX = x - this.x
    let tempY = y - this.y

    let rotatedX = tempX * Math.cos(this.rad) - tempY * Math.sin(this.rad);
    let rotatedY = tempX * Math.sin(this.rad) + tempY * Math.cos(this.rad);

    return {x: rotatedX + this.x, y: rotatedY + this.y}
  }

  moveCorners(x, y) {
    
  }
}

export default Car;
