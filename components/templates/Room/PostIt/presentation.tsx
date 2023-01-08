import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
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
  const defaultValues = useMemo(
    () => ({
      text: defaultText,
      themeId: defaultTheme.toString(),
    }),
    [defaultText, defaultTheme],
  )
  const { register, handleSubmit, control, reset } = useForm<PostItUpdateInput>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
  })
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const mySubmit = (resolvedInput: unknown) => {
    const output = resolvedInput as PostItUpdateOutput
    onSubmit({
      ...output,
      ...defaultData,
    })
  }

  // textarea
  const myInput = useWatch({ control })
  const mySubmitOnResize = useCallback(
    (width: number, height: number) => {
      const prevSize = defaultData.size
      if (prevSize.width === width || prevSize.height === height) return
      const { text, themeId } = schema.parse(myInput)
      onSubmit({
        text,
        themeId,
        ...defaultData,
        size: {
          width,
          height,
        },
      })
    },
    [defaultData, myInput, onSubmit],
  )
  const { ref, ...registerResultOfTextArea } = register('text')
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  useLayoutEffect(() => {
    if (!textAreaRef.current) return () => {}
    const target = textAreaRef.current
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        mySubmitOnResize(width, height)
      }
    })
    resizeObserver.observe(target)
    return () => {
      resizeObserver.unobserve(target)
    }
  }, [mySubmitOnResize, textAreaRef])

  return (
    <div className={styles.root} data-theme-id={defaultTheme}>
      <form onChange={handleSubmit(mySubmit)} className={styles.form}>
        <textarea
          {...registerResultOfTextArea}
          className={styles.textArea}
          style={{
            width: `${defaultData.size.width}px`,
            height: `${defaultData.size.height}px`,
          }}
          // see: https://react-hook-form.com/faqs#question5
          ref={(e) => {
            ref(e)
            textAreaRef.current = e
          }}
          // TODO: font-size
        />
        <div className={styles.colors}>
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
        </div>
      </form>
    </div>
  )
}

export default Presentation
