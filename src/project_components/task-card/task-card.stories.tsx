import type { Meta, StoryObj } from '@storybook/react-native';
import { useArgs } from 'storybook/preview-api';
import { View } from 'react-native';

import { TaskCard } from './task-card';

const meta = {
  title: 'Project/TaskCard',
  component: TaskCard,
  args: {
    title: 'Setup React Native Environment',
    description: 'Install Node.js, Watchman, and Java SDK.',
    color: '#005BBF',
    isCompleted: false,
  },
  argTypes: {
    color: { control: { type: 'color' } },
    isCompleted: { control: { type: 'boolean' } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#F9F9FF', gap: 12 }}>
        <Story />
      </View>
    ),
  ],
  render: (args) => {
    const [{ isCompleted }, updateArgs] = useArgs();
    return (
      <TaskCard
        {...args}
        isCompleted={isCompleted}
        onToggle={() => updateArgs({ isCompleted: !isCompleted })}
        onUpdate={() => console.log('update')}
        onDelete={() => console.log('delete')}
        onPress={() => console.log('detail')}
      />
    );
  },
} satisfies Meta<typeof TaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};

export const Completed: Story = {
  args: {
    title: 'Binary Search Tree Implementation',
    description: 'Complete the recursive insertion method.',
    isCompleted: true,
  },
};

export const Danger: Story = {
  args: {
    title: 'Overdue assignment',
    description: 'Submit before midnight.',
    color: '#BA1A1A',
  },
};
