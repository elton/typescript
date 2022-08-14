/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
interface Cat {
  name: string;
  breed: string;
}

type ReadOnlyCat = Readonly<Cat>;

function MakeCat(name: string, breed: string): ReadOnlyCat {
  return { name, breed };
}

const cat: ReadOnlyCat = MakeCat('Garfield', 'Orange Tabby');
console.log(cat);

function makeCoordinate(
  x: number,
  y: number,
  z: number
): readonly [number, number, number] {
  return [x, y, z];
}

const c1 = makeCoordinate(10, 20, 30);
console.log(c1);
// c1[0] = 100; // error!

// Immutable Array
const reallyConst = [1, 2, 3] as const;
// reallyConst[0] = 100; // error!
