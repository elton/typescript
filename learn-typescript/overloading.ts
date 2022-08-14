interface Point {
  x: number;
  y: number;
}

function createPoint(x: number, y: number): Point;
function createPoint(json: string): Point;
function createPoint(first: number | string, second?: number): Point {
  if (typeof first === 'number' && typeof second === 'number') {
    return { x: first, y: second };
  }
  return JSON.parse(first as string) as Point;
}

console.log(createPoint(1, 2));
console.log(createPoint('{ "x": 3, "y": 4 }'));
