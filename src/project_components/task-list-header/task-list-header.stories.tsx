import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { TaskListHeader } from './task-list-header';

const meta = {
  title: 'Project/TaskListHeader',
  component: TaskListHeader,
  args: {
    tag: 'Core Science',
    title: 'Computer Science',
    description: 'Master the fundamentals of computation and problem solving.',
    color: '#005BBF',
  },
  argTypes: {
    color: { control: { type: 'color' } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#F9F9FF', width: 342 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TaskListHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = {};
export const Success: Story = {
  args: {
    color: '#1E9E5A',
    tag: 'Wellness',
    title: 'Health & Fitness',
    description: 'Build healthy daily habits and stay consistent.',
  },
};
export const Danger: Story = {
  args: {
    color: '#BA1A1A',
    tag: 'Urgent',
    title: 'Overdue Tasks',
    description: 'Catch up on items that need your attention now.',
  },
};
export const Violet: Story = {
  args: {
    color: '#6B4EFF',
    tag: 'Creative',
    title: 'Design Studio',
    description: 'Sketch, prototype, and ship new product ideas.',
  },
};
