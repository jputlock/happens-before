import {EventNode} from './eventnode';

class RelationLink {
  private startEvent: EventNode;
  private endEvent: EventNode;

  constructor(startEvent: EventNode, endEvent: EventNode) {
    this.startEvent = startEvent;
    this.endEvent = endEvent;
  }
}
