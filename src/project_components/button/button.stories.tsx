import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { Button } from './button';

const meta = {
  title: 'Project/Button',
  component: Button,
  args: {
    text: 'Continue',
    bgColor: '#005BBF',
    textColor: '#FFFFFF',
  },
  argTypes: {
    bgColor: { control: { type: 'color' } },
    textColor: { control: { type: 'color' } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { text: 'Cancel', bgColor: '#E6E8F2', textColor: '#3D5481' },
};

export const Danger: Story = {
  args: { text: 'Delete', bgColor: '#BA1A1A', textColor: '#FFFFFF' },
};

export const Ghost: Story = {
  args: { text: 'Skip', bgColor: 'transparent', textColor: '#005BBF' },
};

export const Success: Story = {
  args: { text: 'Save', bgColor: '#16A34A', textColor: '#FFFFFF' },
};
