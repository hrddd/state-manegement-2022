import { FC, useState } from 'react'
import { Room } from '../../../resources/Room/type'
import { trpc } from '../../../utils/trpc'
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

type Props = {
  roomId: number
}

const Container: FC<Props> = ({ roomId }) => {
  const [dummyUpdatedData, setDummyUpdatedData] = useState({
    ...roomData,
    id: roomId,
  })
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
  const onClickPostItCreate = () => {
    setDummyUpdatedData({
      ...dummyUpdatedData,
      postIts: [
        ...dummyUpdatedData.postIts,
        {
          id: dummyUpdatedData.postIts.length,
          text: '',
          themeId: 2,
          position: {
            x: 0,
            y: 0,
            z: dummyUpdatedData.postIts.length - 1,
          },
          size: {
            width: 200,
            height: 200,
          },
          user: _user1,
          lastUpdate: '2023-01-01T12:00',
        },
      ],
    })
  }
  const [num, setNumber] = useState<number>()
  trpc.randomNumber.useSubscription(undefined, {
    onData(n) {
      setNumber(n)
    },
  })

  return (
    <Presentation
      {...dummyUpdatedData}
      onPostItMove={onPostItMove}
      onClickPostItCreate={onClickPostItCreate}
      num={num}
    />
  )
}

export default Container
