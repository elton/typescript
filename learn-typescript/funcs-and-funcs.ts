export function printToFile(text: string, callback: () => void): void {
  console.log(text);
  callback();
}

type MutationFunction = (v: number) => number;

export function arrayMutate(
  numbers: number[],
  mutate: MutationFunction
): number[] {
  return numbers.map(mutate);
}

console.log(arrayMutate([1, 2, 3], (v) => v + 1));

// Generics
const arrayMutate2 = <T>(numbers: T[], mutate: (v: T) => T): T[] => {
  return numbers.map(mutate);
};
console.log(arrayMutate2([1, 2, 3], (v) => v * 2));
console.log(arrayMutate2(['Elton', 'Tom'], (v) => `Hello ${v}`));

// return a function that takes a number and returns a number
type Adder = (v: number) => number;

export function createAdder(num: number): Adder {
  return (v: number) => v + num;
}

const addOne = createAdder(1);
console.log(addOne(1));
