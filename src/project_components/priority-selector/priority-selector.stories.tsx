import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { PrioritySelector, type Priority } from './priority-selector';

const meta = {
  title: 'Project/PrioritySelector',
  component: PrioritySelector,
  args: {
    value: 'alta',
    label: 'Priority',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#F9F9FF', width: 200 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof PrioritySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const High: Story = {};
export const Medium: Story = { args: { value: 'media' } };
export const Low: Story = { args: { value: 'baja' } };

export const Controlled: Story = {
  render: (args) => {
    const [v, setV] = useState<Priority>('alta');
    return <PrioritySelector {...args} value={v} onChange={setV} />;
  },
};
