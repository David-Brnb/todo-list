import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { ProgressBar } from './progress-bar';

const meta = {
  title: 'Project/ProgressBar',
  component: ProgressBar,
  args: { value: 0.45, color: '#005BBF' },
  argTypes: {
    color: { control: { type: 'color' } },
    value: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, width: '100%' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = {};
export const Success: Story = { args: { color: '#006D2C', value: 0.72 } };
export const Empty: Story = { args: { value: 0 } };
export const Full: Story = { args: { value: 1 } };
