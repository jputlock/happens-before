import {ExecutionThread} from './executionthread';

class DrawingApp {
  private static readonly CLICK_RADIUS = 30;

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private threads: ExecutionThread[];

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d')!;
    this.threads = [];
    this.threads.push(new ExecutionThread(0), new ExecutionThread(1));

    this.canvas.width = this.getCanvasWidth();
    this.canvas.height = this.getCanvasHeight();

    this.context.lineWidth = 3;
    this.context.strokeStyle = 'black';

    // Hook up the event listeners
    this.createUserEvents();

    // Draw the thread
    this.drawThreads();
  }

  public getCanvasWidth(): number {
    return this.canvas.clientWidth;
  }

  public getCanvasHeight(): number {
    return this.canvas.clientHeight;
  }

  private createUserEvents() {
    const canvas = this.canvas;

    canvas.addEventListener('dblclick', this.doubleClickHandler);

    document
      .getElementById('clear')!
      .addEventListener('click', this.clearEventHandler);
  }

  private drawThreads() {
    console.log('Drawing threads.');
    for (const thread of this.threads) {
      thread.draw(this.getCanvasWidth(), this.getCanvasHeight(), this.context);
    }
  }

  private clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    console.log('Cleared the canvas.');
  }

  private clearEventHandler = () => {
    this.clearCanvas();
  };

  private doubleClickHandler = (event: MouseEvent) => {
    // Determine if we've clicked on anything

    // ASSERT: we haven't clicked on anything
    // Determine which thread to add to

    let minDistance: number | null = null;
    let thread: ExecutionThread | null = null;
    for (const currentThread of this.threads) {
      // The list of threads should be relatively short so iterating over it isn't expensive
      const distance = Math.abs(currentThread.y - event.y);
      if (distance > DrawingApp.CLICK_RADIUS) {
        continue;
      }
      if (minDistance === null || distance < minDistance) {
        minDistance = distance;
        thread = currentThread;
      }
    }
    if (thread === null) {
      return;
    }
    // Make sure that the node is correctly spaced between the other nodes

    // Add the node
    thread.addEvent(event.x);
    this.clearCanvas();
    this.drawThreads();
  };
}

new DrawingApp();
