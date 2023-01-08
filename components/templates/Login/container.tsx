import { FC } from 'react'
import { UserLoginParam } from '../../../resources/User/type'
import Presentation from './presentation'

const Container: FC = () => {
  const onSubmit = (data: UserLoginParam) => {
    console.log(data)
  }
  return <Presentation onSubmit={onSubmit} />
}

export default Container
