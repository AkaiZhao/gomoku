// import drawMap from './drawMap';

export default function(
  e: MouseEvent,
  chessData: number[][],
  isWhite: boolean
): boolean {
  let x: number = Math.floor((e.clientX - 10 - 20) / 40);
  let y: number = Math.floor((e.clientY - 10 - 20) / 40);
  if (chessData[x][y] != 0) {
    alert('error');
    return;
  }
  if (isWhite) {
    return false;
  } else {
    return true;
  }
}
