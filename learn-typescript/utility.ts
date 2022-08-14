interface MyUser {
  name: string;
  id: number;
  email?: string;
}

// interface MyUserOptional {
//   name?: string;
//   id?: string;
//   email?: string;
// }

// Partial 所有属性都可以为空
type MyUserOptional = Partial<MyUser>;

// Required 所有属性都不可以为空
type RequiredMyUser = Required<MyUser>;

// Pick 对象仅包含指定的属性
type JustEmailAndName = Pick<MyUser, 'email' | 'name'>;

// Omit 删除指定的属性
type UserWithoutId = Omit<MyUser, 'id'>;

const merge = (user: MyUser, overrides: MyUserOptional): MyUser => ({
  ...user,
  ...overrides,
});

console.log(
  merge(
    { name: 'Elton', id: 3, email: 'elton@foo.com' },
    { email: 'elton2@foo.com' }
  )
);

// Record 创建对象集合并指定键值类型
const mapById = (users: MyUser[]): Record<MyUser['id'], UserWithoutId> =>
  users.reduce((acc, val) => {
    const { id, ...rest } = val;
    return { ...acc, [id]: rest };
  }, {});

console.log(
  mapById([
    { id: 1, name: 'Mr. Foo' },
    { id: 2, name: 'Mr. Bar' },
  ])
);
