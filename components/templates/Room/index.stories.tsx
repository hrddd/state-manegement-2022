import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import Room from '.'

export default {
  component: Room,
} as ComponentMeta<typeof Room>

const _user1 = {
  name: 'sample1',
  age: 10,
  icon: null,
  type: 'user' as const,
}

export const Default: ComponentStoryObj<typeof Room> = {}
