class Doggy {
  constructor(public readonly name: string, public readonly age: number) {}
}

const fido = new Doggy('Fido', 1);
console.log(fido.name);

class DogList {
  private doggies: Doggy[] = [];

  static instance: DogList = new DogList();

  private constructor() {}

  static addDog(dog: Doggy) {
    this.instance.doggies.push(dog);
  }

  getDogs() {
    return this.doggies;
  }
}

DogList.addDog(new Doggy('Fido', 1));
DogList.addDog(new Doggy('Spot', 2));
console.log(DogList.instance.getDogs());
