const username: string = 'John Doe';
const isAdmin: boolean = false;
const age: number = 27;

console.log(`first name: ${username}, is admin: ${isAdmin}, age: ${age}`);

const names: string[] = username.split(' ');
const myValue: Array<number> = [1, 2, 3, 4, 5];

console.log(names, myValue);

interface Person {
  first: string;
  last: string;
}

const myPerson: Person = {
  first: 'John',
  last: 'Doe',
};

console.log(myPerson);

const ids: Record<number, string> = {
  1: 'John',
  2: 'Doe',
};
ids[3] = 'Jane';

console.log(ids);

for (let index = 0; index < 10; index += 1) {
  console.log(index);
}

[1, 2, 3].forEach((item) => {
  console.log(item);
});

const out = [4, 5, 6].map((item) => item * 2);
console.log(out);
