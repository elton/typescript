interface Name {
  first: string;
  last: string;
}

function addFullName(name: Name): Name & { fullName: string } {
  return {
    ...name,
    fullName: `${name.first} ${name.last}`,
  };
}

// `T extends (...args: any[]) => any` make sure the T is a function
function permuteJSONRows<T extends (...args: any[]) => any>(
  iteratorFunc: T,
  // `Parameters<T>[0]` is the type of the first argument of the function T, that is the type of `Name`.
  data: Parameters<T>[0][]
  // `ReturnType<T>` is the type of the return value of the function T.
): ReturnType<T>[] {
  return data.map(iteratorFunc);
}

const records = permuteJSONRows(addFullName, [
  { first: 'John', last: 'Doe' },
  { first: 'Jane', last: 'Doe' },
]);

console.log(records);

class PersonRecord {
  constructor(public name: { first: string; last: string }) {}

  get fullName(): string {
    return `${this.name.first} ${this.name.last}`;
  }
}

// `T extends new (...arg: any[]) => any` make sure the T is a class
function createObjects<T extends new (...arg: any[]) => any>(
  ObjectType: T,
  // `ConstructorParameters<T>[0]` is the type of the first argument of the constructor of the class T, that is the type of `{ first: string; last: string }`.
  data: ConstructorParameters<T>[0][]
  // `InstanceType<T>` is the type of the return value of the constructor of the class T.
): InstanceType<T>[] {
  return data.map((data) => new ObjectType(data));
}

const objs = createObjects(PersonRecord, [
  { first: 'John', last: 'Doe' },
  { first: 'Jane', last: 'Doe' },
]);

console.log(objs.map((obj) => obj.fullName));
