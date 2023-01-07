import { FC } from 'react'
import LoginForm from '../../../presentation/templates/LoginForm'

const Login: FC = () => {
  const onSubmit = (data) => {
    console.log(data)
  }
  return <LoginForm onSubmit={onSubmit} />
}

export default Login
