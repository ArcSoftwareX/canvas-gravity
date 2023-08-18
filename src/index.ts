const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

type Coordinates = { x: number; y: number };

const gravity = 1;

const colors = ["#44001A", "#600047", "#770058", "#8E0045", "#9E0031"];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

class Ball {
  private x = Math.random() * (window.innerWidth - this.size * 2) + this.size;
  private y = Math.random() * (window.innerHeight - this.size * 2) + this.size;

  private dy = (Math.random() - 0.5) * this.initialForce;
  private dx = (Math.random() - 0.5) * this.initialForce;

  private color = getRandomColor();

  constructor(
    private size: number,
    private initialForce: number,
    private friction: number
  ) {}

  private draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  private checkCollisions() {
    if (this.y + this.size > window.innerHeight)
      this.dy = -this.dy * this.friction;
    else this.dy += gravity;

    if (this.x + this.size > window.innerWidth)
      this.dx = -this.dx * this.friction;
    else if (this.x - this.size < 0) this.dx = -this.dx * this.friction;
  }

  update(ctx: CanvasRenderingContext2D) {
    this.y += this.dy;
    this.x += this.dx;

    this.checkCollisions();

    this.draw(ctx);
  }
}

const updateCanvas = () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
};

const balls: Ball[] = [];

for (let i = 0; i < 100; i++) balls.push(new Ball(30, 20, 0.9));

const update = () => {
  updateCanvas();

  for (const ball of balls) ball.update(ctx);

  requestAnimationFrame(update);
};

update();
