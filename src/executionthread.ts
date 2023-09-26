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

  tryAddNode(x: number, name: string | null = null): EventNode | false {
    if (
      this.nodes.some(node => Math.abs(x - node.x) < EventNode.RADIUS * 1.2)
    ) {
      return false;
    }
    return this.addNode(x, name);
  }

  insertNode(node: EventNode) {
    this.nodes.push(node);

    // TODO: update this to be an efficient method
    this.nodes.sort((a, b) => a.x - b.x);
  }

  removeNode(target: EventNode) {
    const index = this.nodes.findIndex(node => node === target);
    if (index === -1) {
      console.log("Trying to remove node that doesn't exist in thread");
      return;
    }
    this.nodes.splice(index, 1);
  }

  private addNode(x: number, name: string | null = null): EventNode {
    const node = new EventNode(x, this.identifier, name);
    this.nodes.push(node);

    // TODO: update this to be an efficient method
    this.nodes.sort((a, b) => a.x - b.x);
    return node;
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
