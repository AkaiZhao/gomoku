import DrawMap from './drawMap';
import Chess from './chess';
let canvas = <HTMLCanvasElement>document.getElementById('canvas');
let context = <CanvasRenderingContext2D>canvas.getContext('2d');
let drawMap = new DrawMap(canvas, context);
let chess = new Chess(context);

canvas.addEventListener('click', e => {
  chess.play({ e, offset: canvas.getBoundingClientRect() });
  if (chess.winner)
    document.getElementById('title').innerText =
      chess.winner == 1 ? 'BLACK WIN' : 'WHITE WIN';
});

window.addEventListener('keyup', e => {
  drawMap.inital();
  chess.refresh();
});
function refresh(e: MouseEvent): void {
  drawMap.inital();
  chess.refresh();
  chess.hover({ e, offset: canvas.getBoundingClientRect() });
}
canvas.addEventListener('mousemove', e => {
  refresh(e);
});

let restartBtn = <HTMLElement>document.getElementById('restart');

restartBtn.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('title').innerText = 'GOMOKU';
  drawMap.inital();
  chess.createNewGame();
});
let undoBtn = <HTMLElement>document.getElementById('undo');
undoBtn.addEventListener('click', e => {
  e.preventDefault();
  if (chess.winner) return;
  chess.undo();
  drawMap.inital();
  chess.refresh();
});
