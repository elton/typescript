/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

export interface Vaccine {
  image: string;
  title: string;
}

export interface Reserve {
  describe: string;
  image: string;
  title: string;
}

export interface Popular {
  background: string;
  dep_id: string;
  image: string;
  title: string;
}

export interface SelfTest {
  describe: string;
  image: string;
  minute: number;
  name: string;
  number_of_people: number;
  question: number;
}
