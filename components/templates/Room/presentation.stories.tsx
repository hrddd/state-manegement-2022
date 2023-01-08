import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import Presentation from './presentation'

export default {
  component: Presentation,
} as ComponentMeta<typeof Presentation>

const _user1 = {
  name: 'sample1',
  age: 10,
  icon: null,
  type: 'user' as const,
}

export const Default: ComponentStoryObj<typeof Presentation> = {
  args: {
    id: 0,
    members: [_user1],
    postIts: [
      {
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
        user: _user1,
        lastUpdate: '2023-01-01T12:00',
      },
      {
        id: 1,
        text: 'test2',
        themeId: 1,
        position: {
          x: 100,
          y: 100,
          z: 1,
        },
        size: {
          width: 200,
          height: 200,
        },
        user: _user1,
        lastUpdate: '2023-01-01T12:00',
      },
    ],
  },
}
