import { FC, useState } from 'react'
import { Room } from '../../../resources/Room/type'
import Presentation from './presentation'

const _user1 = {
  name: 'sample1',
  age: 10,
  icon: null,
  type: 'user' as const,
}

const roomData: Room = {
  id: 0,
  members: [_user1],
  postIts: [
    {
      id: 0,
      text: 'test',
      themeId: 0,
      position: {
        x: 0,
        y: 0,
        z: 1,
      },
      size: {
        width: 200,
        height: 200,
      },
      user: _user1,
      lastUpdate: '2023-01-01T12:00',
    },
    {
      id: 1,
      text: 'test2',
      themeId: 1,
      position: {
        x: 100,
        y: 100,
        z: 0,
      },
      size: {
        width: 200,
        height: 200,
      },
      user: _user1,
      lastUpdate: '2023-01-01T12:00',
    },
  ],
}

const Container: FC = () => {
  const [dummyUpdatedData, setDummyUpdatedData] = useState(roomData)
  const onPostItMove = (next: { id: number; position: { x: number; y: number } }) => {
    const newPostIts = dummyUpdatedData.postIts.map((prev) => {
      if (prev.id !== next.id) return prev
      return {
        ...prev,
        position: {
          ...next.position,
          z: prev.position.z,
        },
      }
    })
    setDummyUpdatedData({
      ...dummyUpdatedData,
      postIts: newPostIts,
    })
  }
  return <Presentation {...dummyUpdatedData} onPostItMove={onPostItMove} />
}

export default Container
