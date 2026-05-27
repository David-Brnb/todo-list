import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { Badge, Chip } from './badge';

const meta = {
  title: 'Project/Badge',
  component: Badge,
  args: { text: 'Completed', color: '#DBEAFE' },
  argTypes: {
    color: { control: { type: 'color' } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, gap: 12, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = {};
export const Success: Story = { args: { text: 'In progress', color: '#DCFCE7' } };
export const Danger: Story = { args: { text: 'Overdue', color: '#FEE2E2' } };
export const Neutral: Story = { args: { text: 'Draft', color: '#F3F4F6' } };
export const Featured: Story = { args: { text: 'Featured', color: '#FEF3C7' } };

export const ChipDefault: Story = {
  render: () => <Chip label="Computer Science" />,
};

export const ChipSelected: Story = {
  render: () => <Chip label="Computer Science" selected />,
};
