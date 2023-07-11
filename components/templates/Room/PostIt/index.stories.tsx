import * as react from '@storybook/react'
import PostIt from '.'

export default {
  component: PostIt,
} as react.ComponentMeta<typeof PostIt>

export const Default: react.ComponentStoryObj<typeof PostIt> = {
  args: {
    data: {
      id: 0,
      text: 'test',
      themeId: 0,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      size: {
        width: 200,
        height: 200,
      },
      user: {
        name: 'sample1',
        age: 10,
        icon: null,
        type: 'user' as const,
      },
      lastUpdate: '2023-01-01T12:00',
    },
  },
}
