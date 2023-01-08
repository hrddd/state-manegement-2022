import { FC, useState } from 'react'
import type { PostIt, PostItUpdateParam } from '../../../../resources/PostIt/type'
import Presentation from './presentation'

type Props = {
  data: PostIt
}

const PostIt: FC<Props> = ({ data }) => {
  const [dummyUpdatedData, setDummyUpdatedData] = useState(data)
  const onSubmit = (data: PostItUpdateParam) => {
    setDummyUpdatedData({
      ...dummyUpdatedData,
      ...data,
    })
  }
  return <Presentation data={dummyUpdatedData} onSubmit={onSubmit}></Presentation>
}

export default PostIt
