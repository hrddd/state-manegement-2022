import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { UserLoginParam } from '../../../resources/User/type'

import styles from './presentation.module.css'

type UserLoginInput = {
  name?: string | undefined
  age?: string | undefined
  icon?: FileList | undefined
  isDeveloper?: boolean | undefined
}

const defaultValues: UserLoginInput = {
  icon: undefined,
  name: '',
  age: '',
  isDeveloper: false,
}

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml']

const schema: z.ZodType<UserLoginParam, {}, UserLoginInput> = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    age: z
      .string()
      .min(1, { message: 'Age is required' })
      .refine((v) => {
        return !isNaN(parseInt(v, 10))
      }, 'Age must be number')
      .transform((v) => {
        return parseInt(v, 10)
      }),
    isDeveloper: z.boolean(),
    icon: z
      .custom<UserLoginInput['icon']>()
      .refine(
        (files) => !files?.[0] || (files?.[0]?.size && files?.[0]?.size <= MAX_FILE_SIZE),
        `Max file size is 5MB.`,
      )
      .refine(
        (files) =>
          !files?.[0] || (files?.[0]?.type && ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type)),
        '.jpg, .jpeg, .png and .webp .svg files are accepted.',
      )
      .transform((files) => {
        return files?.[0]
      }),
  })
  .transform(({ isDeveloper, ...rest }) => ({
    ...rest,
    type: isDeveloper ? 'developer' : 'user',
  }))

type UserLoginOutput = z.infer<typeof schema>

type Props = {
  onSubmit: (data: UserLoginOutput) => void
}

const Presentation: FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UserLoginInput>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
  })

  const mySubmit = (resolvedInput: unknown) => {
    // see:
    const output = resolvedInput as UserLoginOutput
    onSubmit(output)
  }

  const myInput = useWatch({ control })

  const [myOutput, setMyOutput] = useState<UserLoginOutput | null>(null)
  useEffect(() => {
    if (!schema.safeParse(myInput).success) return
    setMyOutput(schema.parse(myInput))
  }, [myInput])

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(mySubmit)}>
        <div className={styles.row}>
          <label>
            name: <input {...register('name')} />
          </label>
        </div>
        <div className={styles.row}>
          <label>
            age: <input {...register('age')} />
          </label>
        </div>
        <div className={styles.row}>
          <label>
            isDeveloper: <input type='checkbox' {...register('isDeveloper')} />
          </label>
        </div>
        <div className={styles.row}>
          <label>
            icon: <input type='file' accept='image/*' {...register('icon')} />
          </label>
        </div>
        <div>
          {errors.name && <span>{errors.name.message}</span>}
          {errors.age && <span>{errors.age.message}</span>}
          {errors.icon && <span>{errors.icon.message}</span>}
        </div>
        <div className={styles.row}>
          <h3>input: </h3>
          <code>{JSON.stringify(myInput)}</code>
        </div>
        <div className={styles.row}>
          <h3>output: </h3>
          <code>{JSON.stringify(myOutput)}</code>
        </div>
        <div className={styles.row}>
          <button type='submit'>ログイン</button>
        </div>
      </form>
    </div>
  )
}

export default Presentation
