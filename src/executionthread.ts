import {EventNode} from './eventnode';
import {Point} from './point';

export class ExecutionThread {
  // PUBLIC MEMBER DATA
  readonly identifier: number;
  y = 200;

  // PRIVATE MEMBER DATA
  private nodes: EventNode[];

  constructor(identifier: number) {
    this.identifier = identifier;
    this.nodes = [];

    // TODO: replace this
    this.y *= this.identifier + 1;
  }

  draw(width: number, _height: number, context: CanvasRenderingContext2D) {
    const oldStyle = {
      lineWidth: context.lineWidth,
      strokeStyle: context.strokeStyle,
    };

    context.lineWidth = 4;
    context.strokeStyle = 'gray';

    const y = this.y;

    context.beginPath();
    context.moveTo(0, y);
    for (const node of this.nodes) {
      const x = node.x;
      context.lineTo(x - EventNode.RADIUS, this.y);
      context.stroke();
      node.draw(x, y, context);
      context.beginPath();
      context.moveTo(x + EventNode.RADIUS, this.y);
    }
    context.lineTo(width, y);
    context.stroke();

    context.lineWidth = oldStyle.lineWidth;
    context.strokeStyle = oldStyle.strokeStyle;
  }

  clear() {
    this.nodes.length = 0;
  }

  tryAddEvent(x: number): number {
    if (
      this.nodes.some(node => Math.abs(x - node.x) < EventNode.RADIUS * 1.2)
    ) {
      return 1;
    }
    this.addEvent(x);
    return 0;
  }

  private addEvent(x: number) {
    this.nodes.push(new EventNode(x, this.identifier));

    // TODO: update this to be an efficient method
    this.nodes.sort((a, b) => a.x - b.x);
  }

  containsPoint(p: Point): boolean {
    return Math.abs(p.y - this.y) < EventNode.RADIUS;
  }

  getNodeAt(p: Point): EventNode | null {
    if (!this.containsPoint(p)) {
      return null;
    }

    // TODO: Use bin-search here
    for (const node of this.nodes) {
      if (Math.abs(node.x - p.x) < EventNode.RADIUS) {
        return node;
      }
    }

    return null;
  }
}
