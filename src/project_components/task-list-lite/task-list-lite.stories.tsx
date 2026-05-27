import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';

import { TaskListLite } from './task-list-lite';

const Glyph = ({ color }: { color?: string }) => (
  <Text style={{ color, fontSize: 14, fontWeight: '700' }}>＋</Text>
);

const meta = {
  title: 'Project/TaskListLite',
  component: TaskListLite,
  args: {
    title: 'Add new task',
    icon: <Glyph />,
    bgColor: '#005BBF',
  },
  argTypes: {
    bgColor: { control: { type: 'color' } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#F9F9FF' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TaskListLite>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = {};
export const Success: Story = {
  args: { bgColor: '#1E9E5A', title: 'Mark complete' },
};
export const Danger: Story = {
  args: { bgColor: '#BA1A1A', title: 'Delete list' },
};
