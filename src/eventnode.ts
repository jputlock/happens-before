import {Point} from './point';

export class EventNode {
  // CLASS CONSTANTS
  static readonly RADIUS: number = 30;

  private static NODE_COUNTER = 1;
  public static resetCounter() {
    this.NODE_COUNTER = 0;
  }

  // MEMBER DATA
  parentIdentifier: number;
  x: number;
  name: string | null = null;
  isSelected = false;

  constructor(x: number, id: number, name: string | null = null) {
    this.parentIdentifier = id;
    this.x = x;
    this.name = name !== null ? name : `${EventNode.NODE_COUNTER++}`;
  }

  // Draw this node
  draw(x: number, y: number, context: CanvasRenderingContext2D) {
    const oldStyle = {
      lineWidth: context.lineWidth,
      strokeStyle: context.strokeStyle,
    };

    context.lineWidth = 3;
    context.strokeStyle = this.isSelected ? 'red' : 'blue';

    context.beginPath();
    context.arc(x, y, EventNode.RADIUS, 0, 2 * Math.PI);
    context.stroke();

    // draw the text
    if (this.name !== null) {
      this.drawText(x, y, this.name, context);
    }

    context.lineWidth = oldStyle.lineWidth;
    context.strokeStyle = oldStyle.strokeStyle;
  }

  private drawText(
    x: number,
    y: number,
    text: string,
    context: CanvasRenderingContext2D
  ) {
    let fontSize = 26;
    let width = 0;
    do {
      context.font = `${fontSize--}px "Arial", serif`;
      width = context.measureText(text).width;
    } while (width > EventNode.RADIUS * 2 - 6);

    x -= width / 2;

    context.fillText(text, Math.round(x), Math.round(y) + 6);
  }

  // Project the specified 'point' onto the node's circular outline. In other words, get the
  // point on the circular outline which is closest to the specified 'point'.
  getProjection(x: number, y: number, target: Point): Point {
    const dx = target.x - x;
    const dy = target.y - y;
    const magnitude = Math.sqrt(dx ** 2 + dy ** 2);
    return new Point(
      this.x + EventNode.RADIUS * (dx / magnitude),
      y + EventNode.RADIUS * (dy / magnitude)
    );
  }
}
