class Cicle {
  constructor() {
    this.w = 300;
    this.h = 100;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.w, this.w, this.h, 0, Math.PI * 2);
    context.stroke();
  }
}
