import { FC } from 'react'
import styles from './index.module.css'

type Props = {
  children: React.ReactNode
}

const Centering: FC<Props> = ({ children }) => {
  return <div className={styles.root}>{children}</div>
}

export default Centering
