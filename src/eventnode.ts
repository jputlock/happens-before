export class EventNode {
  // CLASS CONSTANTS
  public static readonly RADIUS: number = 30;

  // PRIVATE MEMBER DATA
  public x: number;

  constructor(x: number) {
    this.x = x;
  }

  // Draw this node
  public draw(thisY: number, context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, thisY, EventNode.RADIUS, 0, 2 * Math.PI);
    context.stroke();

    // draw the text
    // drawText(context, this.text, this.x, this.y, null, selectedObject == this);
  }

  // Project the specified 'point' onto the node's circular outline. In other words, get the
  // point on the circular outline which is closest to the specified 'point'.
  public getProjection(thisY: number, target: Point): Point {
    const dx = target.x - this.x;
    const dy = target.y - thisY;
    const magnitude = Math.sqrt(dx ** 2 + dy ** 2);
    return new Point(
      this.x + EventNode.RADIUS * (dx / magnitude),
      thisY + EventNode.RADIUS * (dy / magnitude)
    );
  }
}
