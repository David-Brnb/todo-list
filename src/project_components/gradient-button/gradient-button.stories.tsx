import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { GradientButton } from './gradient-button';

const meta = {
  title: 'Project/GradientButton',
  component: GradientButton,
  args: {
    title: 'Create task',
    color: '#005BBF',
  },
  argTypes: {
    color: { control: { type: 'color' } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#F9F9FF', width: 186 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof GradientButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = {};
export const Success: Story = { args: { color: '#1E9E5A', title: 'Save' } };
export const Danger: Story = { args: { color: '#BA1A1A', title: 'Delete' } };
export const Violet: Story = { args: { color: '#6B4EFF', title: 'Continue' } };
