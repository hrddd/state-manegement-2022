import { FC, useEffect, useState } from 'react'
import { Room } from '../../../resources/Room/type'
import { trpcClient } from '../../../utils/trpc'
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
  postIts: [],
}

type Props = {
  roomId: number
}

const Container: FC<Props> = ({ roomId }) => {
  const [dummyUpdatedData, setDummyUpdatedData] = useState({
    ...roomData,
    id: roomId,
  })
  const onPostItMove = async (next: { id: number; position: { x: number; y: number } }) => {
    // for debug
    const data = await trpcClient.postIt.query()
    console.log(data)

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
  useEffect(() => {
    ;(async function () {
      const data = await trpcClient.postIt.query()
      console.log(data)
      setDummyUpdatedData({
        ...dummyUpdatedData,
        postIts: data.data,
      })
    })()
  }, [])

  return (
    <Presentation
      {...dummyUpdatedData}
      onPostItMove={onPostItMove}
      onClickPostItCreate={onClickPostItCreate}
    />
  )
}

export default Container
