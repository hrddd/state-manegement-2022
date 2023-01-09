import { FC } from 'react'
import Centering from '../../layout/Centering'
import Container from './container'

type Props = {
  roomId: number
}

const Room: FC<Props> = ({ roomId }) => {
  return (
    <Centering>
      <Container roomId={roomId} />
    </Centering>
  )
}

export default Room
