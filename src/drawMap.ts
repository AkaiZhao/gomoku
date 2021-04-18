export default class {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
    this.inital();
  }
  /**
   *  初始化棋盤
   */
  public inital(): void {
    this.clearBoard();
    this.drawBoard();
  }
  /**
   * 清除棋盤
   */
  private clearBoard(): void {
    this.context = this.canvas.getContext('2d');
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#845c3b';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  /**
   * 繪製棋盤
   */
  private drawBoard(): void {
    for (let i = 20; i < this.canvas.height; i += 40) {
      this.context.strokeStyle = '#000';
      this.context.beginPath();
      this.context.moveTo(20, i);
      this.context.lineTo(this.canvas.height - 20, i);
      this.context.moveTo(i, 20);
      this.context.lineTo(i, this.canvas.height - 20);
      this.context.closePath();
      this.context.stroke();
    }
  }
}
