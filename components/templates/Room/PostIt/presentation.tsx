import { threadId } from 'worker_threads'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { THEME_IDS } from '../../../../resources/PostIt/constants'
import type { PostIt, PostItUpdateParam } from '../../../../resources/PostIt/type'

import styles from './presentation.module.css'

type PostItUpdateInput = {
  text: string
  themeId: string
}

const schema: z.ZodType<
  Pick<PostItUpdateParam, 'text' | 'themeId'>,
  {},
  PostItUpdateInput
> = z.object({
  text: z.string(),
  themeId: z
    .custom<PostItUpdateInput['themeId']>()
    .refine((v) => {
      return !isNaN(parseInt(v, 10))
    }, 'ThemeId must be number')
    .refine((themeId) => {
      const parsed = parseInt(themeId, 10) as typeof THEME_IDS[number]
      return THEME_IDS.includes(parsed)
    }, 'Invalid ThemeId')
    .transform((themeId) => {
      return parseInt(themeId, 10) as typeof THEME_IDS[number]
    }),
})

type PostItUpdateOutput = z.infer<typeof schema>

type Props = {
  data: PostIt
  onSubmit: (data: PostItUpdateParam) => void
}

const Presentation: FC<Props> = ({
  data: { text: defaultText, themeId: defaultTheme, ...defaultData },
  onSubmit,
}) => {
  const { register, handleSubmit, control } = useForm<PostItUpdateInput>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      text: defaultText,
      themeId: defaultTheme.toString(),
    },
  })

  const mySubmit = (resolvedInput: unknown) => {
    const output = resolvedInput as PostItUpdateOutput
    onSubmit({
      ...output,
      ...defaultData,
    })
  }

  const myInput = useWatch({ control })

  const [myOutput, setMyOutput] = useState<PostItUpdateOutput | null>(null)
  useEffect(() => {
    if (!schema.safeParse(myInput).success) return
    setMyOutput(schema.parse(myInput))
  }, [myInput])

  return (
    <div className={styles.root} data-theme-id={defaultTheme}>
      <form onSubmit={handleSubmit(mySubmit)}>
        <textarea {...register('text')} className={styles.textArea} />
        <input
          type='radio'
          {...register('themeId')}
          value={0}
          data-theme-id={0}
          className={styles.colorRadio}
        />
        <input
          type='radio'
          {...register('themeId')}
          value={1}
          data-theme-id={1}
          className={styles.colorRadio}
        />
        <input
          type='radio'
          {...register('themeId')}
          value={2}
          data-theme-id={2}
          className={styles.colorRadio}
        />
      </form>
    </div>
  )
}

export default Presentation
