/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
function simpleStringState<T>(initial: T): [() => T, (v: T) => void] {
  let state = initial;
  return [
    () => state,
    (v) => {
      state = v;
    },
  ];
}

const [st1Getter, st1Setter] = simpleStringState(10);
console.log(st1Getter());
st1Setter(20);
console.log(st1Getter());

const [st2Getter, st2Setter] = simpleStringState<string | null>(null);
console.log(st2Getter());
st2Setter('Hello');
console.log(st2Getter());

function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}

const dogs = [
  { name: 'Fido', age: 12 },
  { name: 'Spot', age: 14 },
];

console.log(pluck(dogs, 'name'));
console.log(pluck(dogs, 'age'));
