const addNumbers = (a: number, b: number): number => a + b;

export default addNumbers;

export const addStrings = (str1: string, str2 = ''): string =>
  `${str1} ${str2}`;

export const fetchData = (url: string): Promise<string> =>
  Promise.resolve(`Data from ${url}`);

export const introduce = (salutation: string, ...names: string[]): string =>
  names.reduce((acc, name) => `${acc} ${salutation} ${name}`, '');
