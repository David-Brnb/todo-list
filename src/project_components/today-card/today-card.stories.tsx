import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { TodayCard } from './today-card';

const meta = {
  title: 'Project/TodayCard',
  component: TodayCard,
  args: {
    title: 'Math homework',
    time: '10:30 AM',
    color: '#BA1A1A',
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
} satisfies Meta<typeof TodayCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Danger: Story = {};
export const Brand: Story = {
  args: { color: '#3B5BFD', title: 'Team standup', time: '9:00 AM' },
};
export const Success: Story = {
  args: { color: '#1E9E5A', title: 'Workout', time: '6:00 PM' },
};
export const Neutral: Story = {
  args: { color: '#6B6F80', title: 'Read book', time: '8:30 PM' },
};
