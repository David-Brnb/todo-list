import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';

import { ListCard } from './list-card';

const Glyph = ({ color }: { color?: string }) => (
  <Text style={{ color, fontSize: 18, fontWeight: '700' }}>★</Text>
);

const meta = {
  title: 'Project/ListCard',
  component: ListCard,
  args: {
    title: 'Computer Science',
    taskCount: 12,
    icon: <Glyph />,
    color: '#B2C9FE',
  },
  argTypes: {
    color: { control: { type: 'color' } },
    taskCount: { control: { type: 'number' } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#F9F9FF', width: 200 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = {};
export const Success: Story = {
  args: {
    color: '#89FA9B',
    title: 'History Project',
    taskCount: 5,
  },
};
export const Danger: Story = {
  args: { color: '#FFDAD6', title: 'Overdue items', taskCount: 3 },
};
export const Neutral: Story = {
  args: { color: '#ECEDF7', title: 'Archived', taskCount: 1 },
};
