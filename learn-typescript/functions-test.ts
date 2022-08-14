/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import addNumbers, { addStrings, introduce } from './functions';

console.log(addNumbers(1, 2));

console.log(addStrings('Hello', 'World'));
console.log(addStrings('Hello'));
console.log(introduce('Hello', 'Elton', 'John', 'Jane'));
