import { PostIt } from '../PostIt/type'
import { User } from '../User/type'

export type Room = {
  id: number
  members: User[]
  postIts: PostIt[]
}
