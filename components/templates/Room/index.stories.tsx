import * as react from '@storybook/react'
import Room from '.'

export default {
  component: Room,
} as react.ComponentMeta<typeof Room>

const _user1 = {
  name: 'sample1',
  age: 10,
  icon: null,
  type: 'user' as const,
}

export const Default: react.ComponentStoryObj<typeof Room> = {}
