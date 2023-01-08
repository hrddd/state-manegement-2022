import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import Presentation from './presentation'

export default {
  component: Presentation,
} as ComponentMeta<typeof Presentation>

export const Default: ComponentStoryObj<typeof Presentation> = {
  args: {
    onSubmit: () => {},
  },
}
