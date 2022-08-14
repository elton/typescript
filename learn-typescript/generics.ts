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

interface Dog {
  name: string;
  age: number;
}
const dogs: Dog[] = [
  { name: 'Fido', age: 12 },
  { name: 'Spot', age: 14 },
];

console.log(pluck(dogs, 'name'));
console.log(pluck(dogs, 'age'));

interface Rank<RankItem> {
  item: RankItem;
  rank: number;
}

function ranker<RankItem>(
  items: RankItem[],
  rank: (v: RankItem) => number
): RankItem[] {
  const ranks: Rank<RankItem>[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));
  ranks.sort((a, b) => a.rank - b.rank);
  return ranks.map((rank) => rank.item);
}

const sortedDogs = ranker<Dog>(dogs, (dog) => dog.age);
console.log(sortedDogs);

interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  addToCart: BaseEvent & { quantity: number; productID: string };
  checkout: BaseEvent;
}

function setEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name]
): void {
  console.log([name, data]);
}

setEvent('addToCart', {
  time: Date.now(),
  user: 'bob',
  quantity: 2,
  productID: '123',
});

setEvent('checkout', { time: Date.now(), user: 'bob' });
