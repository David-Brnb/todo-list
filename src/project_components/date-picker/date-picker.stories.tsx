import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { DatePicker } from './date-picker';

const meta = {
  title: 'Project/DatePicker',
  component: DatePicker,
  args: {
    label: 'Due Date',
    value: new Date(),
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#F9F9FF', width: 200 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FromString: Story = {
  args: { value: '2026-08-15T14:30:00' },
};

export const Controlled: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date>(new Date());
    return <DatePicker {...args} value={date} onChange={setDate} />;
  },
};
