import { User } from '../user/type'
import { THEME_IDS } from './constants'

export type PostIt = {
  id: number
  text: string
  themeId: typeof THEME_IDS[number]
  position: {
    x: number
    y: number
    z: number
  }
  size: {
    width: number
    height: number
  }
  user: User
  lastUpdate: string
}

export type PostItUpdateParam = Omit<PostIt, 'lastUpdate'>
