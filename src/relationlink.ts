import {EventNode} from './eventnode';
import {Point} from './point';

export class RelationLink {
  readonly startEvent: EventNode;
  readonly endEvent: EventNode;

  constructor(startEvent: EventNode, endEvent: EventNode) {
    this.startEvent = startEvent;
    this.endEvent = endEvent;

    console.log(`Created new link from ${startEvent.name} -> ${endEvent.name}`);
  }

  draw(start: Point, end: Point, context: CanvasRenderingContext2D) {
    this.drawArrow(start, end, context);
  }

  private drawArrow(
    start: Point,
    end: Point,
    context: CanvasRenderingContext2D
  ) {
    context.lineWidth = 3;
    context.strokeStyle = 'black';
    context.fillStyle = 'black';

    // Line
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();

    // Arrowhead
    context.beginPath();
    const radius = 10;
    const scaled = new Point(end.x - start.x, end.y - start.y).scale_to(radius);

    let angle = Math.atan2(end.y - start.y, end.x - start.x);
    let x = radius * Math.cos(angle) + end.x - scaled.x;
    let y = radius * Math.sin(angle) + end.y - scaled.y;
    context.moveTo(x, y);

    angle += this.degToRad(120);
    x = radius * Math.cos(angle) + end.x - scaled.x;
    y = radius * Math.sin(angle) + end.y - scaled.y;
    context.lineTo(x, y);

    angle += this.degToRad(120);
    x = radius * Math.cos(angle) + end.x - scaled.x;
    y = radius * Math.sin(angle) + end.y - scaled.y;
    context.lineTo(x, y);

    context.closePath();
    context.fill();
  }

  degToRad(degrees: number) {
    return degrees * (Math.PI / 180);
  }
}
