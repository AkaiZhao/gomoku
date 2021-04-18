export default class {
  private data: number[][] = [];
  private isWhite: boolean = false;
  private context: CanvasRenderingContext2D;
  public winner: number = 0;
  private lastChess: { x: number; y: number; px: number; py: number };
  private lastTwoChess: { x: number; y: number; px: number; py: number };
  private undoCount: number = 0;
  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.createNewGame();
  }

  /**
   * 開始新遊戲
   */
  public createNewGame() {
    for (let x = 0; x < 15; x++) {
      this.data[x] = [];
      for (let y = 0; y < 15; y++) {
        this.data[x][y] = 0;
      }
    }
    this.isWhite = false;
    this.winner = 0;
    this.lastChess = null;
  }
  /**
   * 悔棋
   */
  public undo() {
    if (!this.lastChess || this.undoCount == 1) return;
    this.undoCount++;
    let { x, y } = this.lastChess;
    this.isWhite = !this.isWhite;
    this.data[x][y] = 0;
    this.lastChess = this.lastTwoChess;
    this.lastTwoChess = null;
  }
  /**
   * 下棋
   */
  public play({ e, offset }: WindowData) {
    if (this.winner) return;
    let { x, y, px, py } = this.calcPosition({ e, offset });
    if (x >= 15 || x < 0 || y >= 15 || y < 0 || this.data[x][y] != 0) return;
    if (this.lastChess) this.lastTwoChess = this.lastChess;
    this.lastChess = { x, y, px, py };
    if (this.isWhite) {
      this.data[x][y] = -1;
      this.drawChess({ x, y, c: this.data[x][y] });
      this.isWhite = false;
    } else {
      this.data[x][y] = 1;
      this.drawChess({ x, y, c: this.data[x][y] });
      this.isWhite = true;
    }
    this.undoCount = 0;
    this.judgement({ x, y, c: this.data[x][y] });
    this.refresh();
  }
  /**
   * 重整棋盤
   */
  public refresh() {
    for (let x = 0; x < this.data.length; x++) {
      for (let y = 0; y < this.data.length; y++) {
        this.drawChess({ x, y, c: this.data[x][y] });
        this.mark();
      }
    }
  }
  /**
   * 滑鼠特效
   */
  public hover({ e, offset }: WindowData) {
    if (this.winner) return;
    let { px, py } = this.calcPosition({ e, offset });
    this.drawBlock(px, py);
  }
  /**
   * 計算位置
   * @param e 滑鼠事件
   * @param offset 螢幕間隔
   */
  private calcPosition({
    e,
    offset
  }: WindowData): { x: number; y: number; px: number; py: number } {
    let x: number = Math.round((e.clientX - offset.left - 20) / 40);
    let y: number = Math.round((e.clientY - offset.top - 20) / 40);
    let px: number = 20 + x * 40;
    let py: number = 20 + y * 40;
    return { x, y, px, py };
  }
  /**
   *  將棋子畫到畫布上
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {number} c 棋子顏色
   */
  private drawChess({ x, y, c }: ChessData) {
    let rx: number = 20 + x * 40,
      ry: number = 20 + y * 40,
      r: number = 15,
      pi: number = 2 * Math.PI;
    this.context.beginPath();
    this.context.arc(rx, ry, r, 0, pi);
    this.context.closePath();
    let gradient = this.context.createRadialGradient(
      rx + 2,
      ry - 2,
      r,
      rx + 2,
      ry + 2,
      0
    );
    if (c === 1) {
      gradient.addColorStop(0, '#0A0A0A');
      gradient.addColorStop(1, '#636766');
    } else if (c === -1) {
      gradient.addColorStop(0, '#D1D1D1');
      gradient.addColorStop(1, '#F9F9F9');
    }
    this.context.fillStyle = gradient;
    this.context.fill();
  }
  /**
   * 計算輸贏結果
   * @param {number} x 座標X軸
   * @param {number} y 座標Y軸
   * @param {number} c 棋子顏色(1or-1)
   */
  private judgement({ x, y, c }: ChessData): void {
    let row: Counter = { count: -1, bright: false, bleft: false };
    let col: Counter = { count: -1, bright: false, bleft: false };
    let ltrb: Counter = { count: -1, bright: false, bleft: false };
    let rtlb: Counter = { count: -1, bright: false, bleft: false };
    for (let i = 0; i < 5; i++) {
      // 水平
      if (this.data[x + i] && !row.bright) {
        if (this.data[x + i][y] == c) row.count++;
        else row.bright = true;
      }
      if (this.data[x - i] && !row.bleft) {
        if (this.data[x - i][y] === c) row.count++;
        else row.bleft = true;
      }
      // 垂直
      if (this.data[y + i] && !col.bright) {
        if (this.data[x][y + i] == c) col.count++;
        else col.bright = true;
      }
      if (this.data[y - i] && !col.bleft) {
        if (this.data[x][y - i] === c) col.count++;
        else col.bleft = true;
      }
      // 左上右下
      if (this.data[x + i] && this.data[y + i] && !ltrb.bright) {
        if (this.data[x + i][y + i] == c) ltrb.count++;
        else ltrb.bright = true;
      }
      if (this.data[x - i] && this.data[y - i] && !ltrb.bleft) {
        if (this.data[x - i][y - i] === c) ltrb.count++;
        else ltrb.bleft = true;
      }
      // 右上左下
      if (this.data[x + i] && this.data[y - i] && !rtlb.bright) {
        if (this.data[x + i][y - i] == c) rtlb.count++;
        else rtlb.bright = true;
      }
      if (this.data[x - i] && this.data[y + i] && !rtlb.bleft) {
        if (this.data[x - i][y + i] === c) rtlb.count++;
        else rtlb.bleft = true;
      }
    }
    if (
      row.count >= 5 ||
      col.count >= 5 ||
      ltrb.count >= 5 ||
      rtlb.count >= 5
    ) {
      this.winner = c;
    }
  }
  /**
   * 在棋子上標記紅點
   */
  private mark() {
    if (!this.lastChess) return;
    let { px, py } = this.lastChess;
    this.context.fillStyle = 'red';
    this.context.beginPath();
    this.context.fillRect(px - 2.5, py - 2.5, 5, 5);
    this.context.closePath();
  }
  /**
   * 滑入的時候繪製方塊
   * @param px X軸位置
   * @param py Y軸位置
   */
  private drawBlock(px: number, py: number) {
    if (this.isWhite) this.context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    else this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.context.beginPath();
    this.context.fillRect(px - 20, py - 20, 40, 40);
    this.context.closePath();
  }
}
