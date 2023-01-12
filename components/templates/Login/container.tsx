import { Zodios, makeErrors } from '@zodios/core'
import { FC } from 'react'
import { helloApi } from '../../../common/api/hello'
import { UserLoginParam } from '../../../resources/User/type'
import Presentation from './presentation'

const apiClient = new Zodios('/api', [...helloApi])

const Container: FC = () => {
  const onSubmit = async (data: UserLoginParam) => {
    const hello = await apiClient.hello()
    alert(hello.message)
  }
  return <Presentation onSubmit={onSubmit} />
}

export default Container
