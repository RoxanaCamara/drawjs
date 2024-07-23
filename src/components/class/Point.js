export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class AgentDot {
  constructor(x, y) {
    this.pos = new Point(x, y);
    this.radius = 10;
  }

  draw(context) {
    context.fillStyle = "black";
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 5);
    context.fill();
  }
}
