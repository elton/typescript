/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
type TreeDCoordinate = [x: number, y: number, z: number];

function add3DCoordinate(
  c1: TreeDCoordinate,
  c2: TreeDCoordinate
): TreeDCoordinate {
  return [c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2]];
}

console.log(add3DCoordinate([0, 0, 0], [10, 20, 30]));

function simpleStringState(
  initial: string
): [() => string, (v: string) => void] {
  let state = initial;
  return [
    () => state,
    (v) => {
      state = v;
    },
  ];
}

const [getString, setString] = simpleStringState('Hello');
console.log(getString());
setString('World');
console.log(getString());
