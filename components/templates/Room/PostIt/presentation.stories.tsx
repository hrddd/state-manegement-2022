import * as react from '@storybook/react'
import Presentation from './presentation'

export default {
  component: Presentation,
} as react.ComponentMeta<typeof Presentation>

export const Default: react.ComponentStoryObj<typeof Presentation> = {
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
    onSubmit: (data) => {
      console.log(data)
    },
  },
}
