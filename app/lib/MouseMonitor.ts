import { Vector3D } from './Vector3D';

export class MouseMonitor {
  position: Vector3D;
  state: { left: boolean; middle: boolean; right: boolean };
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.position = new Vector3D(0, 0, 0);
    this.state = { left: false, middle: false, right: false };
    this.element = element;
    
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.element.addEventListener('mousemove', (event) => {
      let pageX: number, pageY: number;
      
      if (event.pageX == null && event.clientX != null) {
        const eventDoc = (event.target && (event.target as Element).ownerDocument) || document;
        const doc = eventDoc.documentElement;
        const body = eventDoc.body;
        pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
        pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0 );
      } else {
        pageX = event.pageX;
        pageY = event.pageY;
      }

      this.position.x = pageX;
      this.position.y = pageY;
    });

    this.element.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
    
    this.element.addEventListener('mousedown', (event) => {
      if (event.button === 0) this.state.left = true;
      if (event.button === 1) this.state.middle = true;
      if (event.button === 2) this.state.right = true;
      
      event.preventDefault();
    });

    this.element.addEventListener('mouseup', (event) => {
      this.state.left = this.state.middle = this.state.right = false;
      
      event.preventDefault();
    });
  }
}
