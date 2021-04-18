declare global {
  interface WindowData {
    e: MouseEvent;
    offset: ClientRect | DOMRect;
  }
  interface ChessData {
    x: number;
    y: number;
    c: number;
  }
  interface Counter {
    count: number;
    bright: boolean;
    bleft: boolean;
  }
}

export {};
