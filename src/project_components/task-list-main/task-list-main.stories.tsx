import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';

import { TaskListMain } from './task-list-main';

const Glyph = ({ color }: { color?: string }) => (
  <Text style={{ color, fontSize: 18, fontWeight: '700' }}>★</Text>
);

const hoursAgo = (h: number) => new Date(Date.now() - h * 3_600_000);
const daysAgo = (d: number) => new Date(Date.now() - d * 86_400_000);

const meta = {
  title: 'Project/TaskListMain',
  component: TaskListMain,
  args: {
    tag: 'Core Science',
    title: 'Computer Science',
    icon: <Glyph />,
    color: '#005BBF',
    progress: 0.72,
    lastCompletedTitle: 'Data Structures and Algorithms',
    lastCompletedAt: hoursAgo(3),
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
export const HoursAgo: Story = {
  args: { lastCompletedAt: hoursAgo(5) },
};
export const DaysAgo: Story = {
  args: { lastCompletedAt: daysAgo(3) },
};
export const StaleSevenPlus: Story = {
  args: { lastCompletedAt: daysAgo(12) },
};
export const Success: Story = {
  args: {
    color: '#1E9E5A',
    tag: 'Wellness',
    title: 'Health & Fitness',
    lastCompletedTitle: 'Morning run 5km',
    progress: 0.4,
  },
};
