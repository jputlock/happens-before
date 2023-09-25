import {EventNode} from './eventnode';

export class ExecutionThread {
  // PUBLIC MEMBER DATA
  public readonly identifier: number;
  public y = 200;

  // PRIVATE MEMBER DATA
  private nodes: EventNode[];

  constructor(identifier: number) {
    this.identifier = identifier;
    this.nodes = [];
    this.y *= this.identifier + 1;
  }

  public draw(
    width: number,
    _height: number,
    context: CanvasRenderingContext2D
  ) {
    // TODO: replace this
    const y = this.y;

    context.beginPath();
    context.moveTo(0, y);
    for (const node of this.nodes) {
      context.lineTo(node.x - EventNode.RADIUS, this.y);
      context.stroke();
      node.draw(y, context);
      context.beginPath();
      context.moveTo(node.x + EventNode.RADIUS, this.y);
    }
    context.lineTo(width, y);
    context.stroke();
  }

  public addEvent(x: number) {
    this.nodes.push(new EventNode(x));

    // TODO: update this to be an efficient method
    this.nodes.sort((a, b) => a.x - b.x);
  }
}
