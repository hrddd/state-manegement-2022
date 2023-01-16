import { zodResolver } from '@hookform/resolvers/zod'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { Room } from '../../../resources/Room/type'
import { UserLoginParam } from '../../../resources/User/type'
import PostIt from './PostIt'

import styles from './presentation.module.css'

type Props = Room & {
  onClickPostItCreate: (props: React.MouseEvent<HTMLButtonElement>) => void
  onPostItMove: (props: { id: number; position: { x: number; y: number } }) => void
  num: number
}

const Presentation: FC<Props> = ({
  id,
  postIts,
  members,
  onPostItMove,
  onClickPostItCreate,
  num,
}) => {
  const draggingInfo = useRef<{
    id: number
    startX: number
    startY: number
  } | null>(null)
  return (
    <div className={styles.root}>
      <div
        className={styles.postIts}
        onDrop={(e) => {
          if (!draggingInfo.current) return

          onPostItMove({
            id: draggingInfo.current.id,
            // see: https://qiita.com/numanomanu/items/e0ace008565164c17b75#step4-%E8%A4%87%E6%95%B0%E6%9E%9A%E3%81%AE%E3%82%AB%E3%83%BC%E3%83%89%E3%82%92%E7%B7%A8%E9%9B%86%E3%81%97%E3%81%9F%E3%82%8A%E3%81%86%E3%81%94%E3%81%8B%E3%81%9B%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B
            position: {
              x: e.clientX - draggingInfo.current.startX,
              y: e.clientY - draggingInfo.current.startY,
            },
          })
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {postIts.map((postIt) => {
          return (
            <div
              key={postIt.id}
              className={styles.postItPosition}
              style={{
                top: `${postIt.position.y}px`,
                left: `${postIt.position.x}px`,
                zIndex: postIt.position.z,
              }}
              draggable
              onDragStart={(e) => {
                draggingInfo.current = {
                  id: postIt.id,
                  startX: e.clientX - postIt.position.x,
                  startY: e.clientY - postIt.position.y,
                }
              }}
            >
              <PostIt data={postIt} />
            </div>
          )
        })}
      </div>
      <div className={styles.tools}>
        <button type='button' onClick={onClickPostItCreate}>
          付箋を追加する
        </button>
        web-socket-resp{num}
      </div>
    </div>
  )
}

export default Presentation
