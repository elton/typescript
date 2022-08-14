/* eslint-disable brace-style */
/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
interface Database<K, T> {
  get(id: K): T;
  set(id: K, value: T): void;
}

interface Persistable {
  saveToString(): string;
  restoreFromString(serialized: string): void;
}

type DBKeyType = string | number | symbol;
class InMemoryDatabase<K extends DBKeyType, T> implements Database<K, T> {
  protected db: Record<K, T> = {} as Record<K, T>;

  get(id: K): T {
    return this.db[id];
  }

  set(id: K, value: T): void {
    this.db[id] = value;
  }
}

class PersistentMemoryDatabase<K extends DBKeyType, T>
  extends InMemoryDatabase<K, T>
  implements Persistable
{
  saveToString(): string {
    return JSON.stringify(this.db);
  }

  restoreFromString(serialized: string): void {
    this.db = JSON.parse(serialized);
  }
}

const myDatabase = new InMemoryDatabase();
myDatabase.set('foo', 'bar');
console.log(myDatabase.get('foo'));

const myPersistentDatabase = new PersistentMemoryDatabase<number, string>();
myPersistentDatabase.set(1, 'bar');
console.log(myPersistentDatabase.get(1));
console.log(myPersistentDatabase.saveToString());
myPersistentDatabase.restoreFromString('{"1":"baz"}');
console.log(myPersistentDatabase.get(1));
