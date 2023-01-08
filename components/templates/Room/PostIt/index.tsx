import { FC } from 'react'
import type { PostIt, PostItUpdateParam } from '../../../../resources/PostIt/type'
import Presentation from './presentation'

type Props = {
  data: PostIt
}

const PostIt: FC<Props> = ({ data }) => {
  const onSubmit = (data: PostItUpdateParam) => {
    console.log(data)
  }

  return <Presentation data={data} onSubmit={onSubmit}></Presentation>
}

export default PostIt
