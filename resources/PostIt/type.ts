import { User } from '../User/type'

export type PostIt = {
  id: number
  text: string
  themeId: number
  position: {
    x: number
    y: number
    z: number
  }
  user: User
  lastUpdate: string
}

export type PostItUpdateParam = Omit<PostIt, 'lastUpdate'>
