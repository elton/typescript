/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
function myLogFunction() {
  return (str: string) => {
    console.log(str);
  };
}

const logger = myLogFunction();
logger('Hello World');

function createSimpleMemoryDatabase<T>() {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {};

    set(id: string, value: T) {
      this.db[id] = value;
    }

    get(id: string): T {
      return this.db[id];
    }

    getObject(): object {
      return this.db;
    }
  };
}

const SimpleMemoryDatabase = createSimpleMemoryDatabase<string>();

const sdb1 = new SimpleMemoryDatabase();
sdb1.set('id', 'Hello World');

type Constructor<T> = new (...arg: any[]) => T;

function Dumpale<T extends Constructor<{ getObject(): object }>>(base: T) {
  return class extends base {
    dump() {
      console.log(this.getObject());
    }
  };
}

const DumpableStringDatabase = Dumpale(SimpleMemoryDatabase);

const sdb2 = new DumpableStringDatabase();
sdb2.set('jack', 'Hello Jack');
sdb2.dump();
