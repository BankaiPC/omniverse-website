export class Vector3D {
  x: number = 0;
  y: number = 0;
  z: number = 0;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.set(x, y, z);
  }

  dot2d(x: number, y: number): number {
    return ((this.x * x) + (this.y * y));
  }

  dot3d(x: number, y: number, z: number): number {
    return ((this.x * x) + (this.y * y) + (this.z * z));
  }

  set(x: number, y: number, z: number): Vector3D {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  add(other: Vector3D | number): Vector3D {
    if (typeof other === "number") {
      this.x += other;
      this.y += other;
      this.z += other;
      return this;
    }
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    return this;
  }

  sub(other: Vector3D | number): Vector3D {
    if (typeof other === "number") {
      this.x -= other;
      this.y -= other;
      this.z -= other;
      return this;
    }
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    return this;
  }

  mul(other: Vector3D | number): Vector3D {
    if (typeof other === "number") {
      this.x *= other;
      this.y *= other;
      this.z *= other;
      return this;
    }
    this.x *= other.x;
    this.y *= other.y;
    this.z *= other.z;
    return this;
  }

  div(other: Vector3D | number): Vector3D {
    if (typeof other === "number") {
      this.x /= other;
      this.y /= other;
      this.z /= other;
      return this;
    }
    this.x /= other.x;
    this.y /= other.y;
    this.z /= other.z;
    return this;
  }

  move(dest: Vector3D): Vector3D {
    if (dest instanceof Vector3D) {
      dest.x = this.x;
      dest.y = this.y;
      dest.z = this.z;
    }
    return this;
  }

  within2d(bounds: Vector3D): boolean {
    return (this.x >= 0 && this.x < bounds.x && this.y >= 0 && this.y < bounds.y);
  }

  wrap2d(bounds: Vector3D): boolean {
    if (this.x > bounds.x) {
      this.x = 0;
      return true;
    }

    if (this.x < 0) {
      this.x = bounds.x;
      return true;
    }

    if (this.y > bounds.y) {
      this.y = 0;
      return true;
    }

    if (this.y < 0) {
      this.y = bounds.y;
      return true;
    }
    return false;
  }

  eq(other: Vector3D): boolean {
    return (other instanceof Vector3D) && this.x === other.x && this.y === other.y && this.z === other.z;
  }
  
  distance(other: Vector3D): number {
    const dx = (this.x - other.x);
    const dy = (this.y - other.y);
    
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  clone(): Vector3D {
    return new Vector3D(this.x, this.y, this.z);
  }
}
