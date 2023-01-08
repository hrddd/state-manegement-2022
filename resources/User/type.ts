export type User = {
  name: string
  age: number
  icon: string | null
  type: 'user' | 'developer'
}

export type UserLoginParam = Omit<User, 'icon'> & {
  icon?: File
}
