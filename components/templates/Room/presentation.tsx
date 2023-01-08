import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { Room } from '../../../resources/Room/type'
import { UserLoginParam } from '../../../resources/User/type'
import PostIt from './PostIt'

import styles from './presentation.module.css'

type Props = Room

const Presentation: FC<Props> = ({ id, postIts, members }) => {
  return (
    <div className={styles.root}>
      {postIts.map((postit) => {
        return (
          <div key={postit.id} className={styles.postItPosition}>
            <PostIt data={postit} />
          </div>
        )
      })}
    </div>
  )
}

export default Presentation
