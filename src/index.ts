import {ExecutionThread} from './executionthread';
import {EventNode} from './eventnode';
import {RelationLink} from './relationlink';
import {Point} from './point';

class DrawingApp {
  private static readonly CLICK_RADIUS = 30;

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private selected: EventNode | null = null;

  private threads: Map<number, ExecutionThread>;
  private links: RelationLink[];

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d')!;

    // Set to default state
    this.threads = new Map();
    this.links = [];
    this.reset();

    // Hook up the event listeners
    this.createUserEvents();

    // Draw the thread
    this.redraw();
  }

  getCanvasWidth(): number {
    return this.canvas.width;
  }

  getCanvasHeight(): number {
    return this.canvas.height;
  }

  private createUserEvents() {
    window.addEventListener('resize', this.resizeHandler);

    const canvas = this.canvas;
    canvas.addEventListener('dblclick', this.doubleClickHandler);
    canvas.addEventListener('mousedown', this.pressHandler);

    document
      .getElementById('add_thread')!
      .addEventListener('click', this.addThreadHandler);
    document
      .getElementById('reset')!
      .addEventListener('click', this.resetHandler);
  }

  private redraw() {
    this.clearCanvas();
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Draw the threads
    for (const thread of this.threads.values()) {
      thread.draw(this.getCanvasWidth(), this.getCanvasHeight(), this.context);
    }

    // Draw the links
    for (const link of this.links) {
      const start = new Point(
        link.startEvent.x,
        this.threads.get(link.startEvent.parentIdentifier)!.y
      );
      const end = new Point(
        link.endEvent.x,
        this.threads.get(link.endEvent.parentIdentifier)!.y
      );
      const startProjection = link.startEvent.getProjection(
        start.x,
        start.y,
        end
      );
      const endProjection = link.endEvent.getProjection(end.x, end.y, start);
      link.draw(startProjection, endProjection, this.context);
    }
  }

  private reset() {
    this.threads = new Map();
    for (const num of [0, 1]) {
      this.threads.set(num, new ExecutionThread(num));
    }

    this.links = [];
  }

  private clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    console.log('Cleared the canvas.');
  }

  // EVENT HANDLERS
  private addThreadHandler = () => {
    const nextId = this.threads.size;
    this.threads.set(nextId, new ExecutionThread(nextId));
    this.redraw();
  };

  private resetHandler = () => {
    this.reset();
    this.redraw();
  };

  private resizeHandler = () => {
    this.redraw();
  };

  private doubleClickHandler = (event: MouseEvent) => {
    const mouseX = event.pageX;
    const mouseY = event.pageY;

    // Determine if we've clicked on anything
    let minDistance: number | null = null;
    let thread: ExecutionThread | null = null;
    for (const currentThread of this.threads.values()) {
      // The list of threads should be relatively short so iterating over it isn't expensive
      const distance = Math.abs(currentThread.y - mouseY);
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

    // TODO: check if clicked on pre-existing node

    if (!thread.tryAddEvent(mouseX)) {
      this.redraw();
    }
  };

  private pressHandler = (event: MouseEvent) => {
    const mouseX = event.pageX;
    const mouseY = event.pageY;
    const clickPoint = new Point(mouseX, mouseY);
    console.log(clickPoint);

    let newSelection: EventNode | null = null;
    for (const thread of this.threads.values()) {
      newSelection = thread.getNodeAt(clickPoint);
      if (newSelection !== null) {
        break;
      }
    }

    if (newSelection === null) {
      if (this.selected !== null) {
        this.selected.isSelected = false;
        this.selected = null;
      }
      this.redraw();
      return;
    }

    if (this.selected === null) {
      newSelection.isSelected = true;
      this.selected = newSelection;
    } else if (this.selected !== newSelection) {
      this.selected.isSelected = false;
      if (this.selected.parentIdentifier !== newSelection.parentIdentifier) {
        // TODO: prevent duplicate links
        this.links.push(new RelationLink(this.selected, newSelection));
        newSelection.isSelected = false;
        this.selected = null;
      } else {
        newSelection.isSelected = true;
        this.selected = newSelection;
      }
    }
    this.redraw();
  };
}

new DrawingApp();
