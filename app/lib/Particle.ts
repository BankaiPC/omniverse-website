import { Vector3D } from './Vector3D';
import { Perlin } from './Perlin';
import { MouseMonitor } from './MouseMonitor';
import { SmallPRNG } from './SmallPRNG';

export class Particle {
  p: Vector3D; // position
  t: Vector3D; // trail to
  v: Vector3D; // velocity
  g: Perlin; // simplex noise generator
  b: Vector3D; // window bounds for wrapping
  r: SmallPRNG; // random context
  m: MouseMonitor; // mouse position monitor
  i: number; // iteration
  l: number; // life

  constructor(generator: Perlin, bounds: Vector3D, rctx: SmallPRNG, mon: MouseMonitor) {
    this.p = new Vector3D(); // position
    this.t = new Vector3D(); // trail to
    this.v = new Vector3D(); // velocity
    this.g = generator; // simplex noise generator
    this.b = bounds; // window bounds for wrapping
    this.r = rctx; // random context
    this.m = mon; // mouse position monitor
    
    this.reset();
  }

  reset(): void {
    // new random position
    this.p.x = this.t.x = Math.floor(this.r.random() * this.b.x);
    this.p.y = this.t.y = Math.floor(this.r.random() * this.b.y);
    
    // reset velocity
    this.v.set(1, 1, 0);
    
    // iteration and life
    this.i = 0; 
    this.l = this.r.random() * 9000 + 1000; // life time before particle respawns
  }

  step(): void {
    if (this.i++ > this.l) {
      this.reset();
    }
    
    const xx = (this.p.x / 200);
    const yy = (this.p.y / 200);
    const zz = (Date.now() / 5000);
    const a = (this.r.random() * Math.PI * 2);
    const rnd = (this.r.random() / 4);

    // calculate the new velocity based on the noise
    // random velocity in a random direction
    this.v.x += (rnd * Math.sin(a) + this.g.simplex3d(xx, yy, -zz)); // sin or cos, no matter
    this.v.y += (rnd * Math.cos(a) + this.g.simplex3d(xx, yy, zz)); // opposite zz's matters
    
    if (this.m.state.left) {
      // add a difference between mouse pos and particle pos (a fraction of it) to the velocity.
      this.v.add(this.m.position.clone().sub(this.p).mul(.00085));
    }
    
    // repulse the particles if the right mouse button is down and the distance between
    // the mouse and particle is below an arbitrary value between 200 and 250.
    if (this.m.state.right && this.p.distance(this.m.position) < this.r.random() * 50 + 200) {
      this.v.add(this.p.clone().sub(this.m.position).mul(.02));
    }
    
    // time dilation field, stuff moves at 10% here, depending on distance
    if (this.m.state.middle) {
      const d = this.p.distance(this.m.position);
      const l = this.r.random() * 50 + 200;
      
      if (d < l) {
        this.v.mul(d / l);
      }
    }
    
    // keep a copy of the current position, for a nice line between then and now and add velocity
    this.p.move(this.t).add(this.v.mul(.94)); // slow down the velocity slightly

    // wrap around the edges
    if (this.p.wrap2d(this.b)) {
      this.p.move(this.t);
    }
  }

  // plot the line, but do not stroke yet.
  render(context: CanvasRenderingContext2D): void {
    context.moveTo(this.t.x, this.t.y);
    context.lineTo(this.p.x, this.p.y);
  }
}
