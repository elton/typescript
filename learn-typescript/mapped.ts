/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-vars */
type MyFlexibleDogInfo = {
  name: string;
  [key: string]: string | number;
};

const dog: MyFlexibleDogInfo = {
  name: 'Fido',
  breed: 'Mutt',
  age: 1,
};

interface DogInfo {
  name: string;
  age: number;
}

type OptionalFlags<Type> = {
  [Key in keyof Type]?: Type[Key] extends string ? string : number;
};

type DogInfoOptions = OptionalFlags<DogInfo>;

type Listeners<Type> = {
  [Property in keyof Type as `on${Capitalize<string & Property>}Change`]?: (
    newValue: Type[Property]
  ) => void;
} & {
  [Property in keyof Type as `on${Capitalize<
    string & Property
  >}Delete`]?: () => void;
};

function listenToObject<T>(obj: T, listeners: Listeners<T>) {
  throw 'Needs to be implemented';
}

const lg: DogInfo = {
  name: 'Fido',
  age: 1,
};

type DogInfoListeners = Listeners<DogInfo>;

listenToObject(lg, {
  onNameChange: (newName: string) => {},
  onAgeChange: (newAge: number) => {},
  onNameDelete: () => {},
});
