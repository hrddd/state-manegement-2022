import { FC } from 'react'
import { UserLoginParam } from '../../../../types/resources/User'
import LoginForm from '../../../presentation/templates/LoginForm'

const Login: FC = () => {
  const onSubmit = (data: UserLoginParam) => {
    console.log(data)
  }
  return <LoginForm onSubmit={onSubmit} />
}

export default Login
