/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
abstract class StreetFighter {
  constructor() {}

  move() {}

  fight() {
    console.log(`attack with ${this.getSpecialAttack()}`);
  }

  abstract getSpecialAttack(): string;

  abstract get name(): string;
}

class Ryu extends StreetFighter {
  getSpecialAttack(): string {
    return 'Hadouken';
  }

  get name(): string {
    return 'Ryu';
  }
}

class ChunLi extends StreetFighter {
  getSpecialAttack(): string {
    return 'Lightning Kick';
  }

  get name(): string {
    return 'Chun-Li';
  }
}

const ryu = new Ryu();
ryu.fight();

const chunLi = new ChunLi();
chunLi.fight();
