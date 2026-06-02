import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';

import { TaskListMain } from './task-list-main';

const Glyph = ({ color }: { color?: string }) => (
  <Text style={{ color, fontSize: 18, fontWeight: '700' }}>★</Text>
);

const meta = {
  title: 'Project/TaskListMain',
  component: TaskListMain,
  args: {
    tag: 'Core Science',
    title: 'Computer Science',
    icon: <Glyph />,
    color: '#005BBF',
    progress: 0.72,
    lastTaskTitle: 'Data Structures',
  },
  argTypes: {
    color: { control: { type: 'color' } },
    progress: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#F9F9FF', width: 342 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TaskListMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = {};

export const Success: Story = {
  args: {
    color: '#1E9E5A',
    tag: 'Wellness',
    title: 'Health & Fitness',
    progress: 0.4,
    lastTaskTitle: 'Morning run 5km',
  },
};

