export type User = {
  name: string
  age: number
  icon: string
  type: 'user' | 'developer'
}

export type UserLoginParam = Omit<User, 'icon'> & {
  icon?: File
}
