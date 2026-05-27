import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';

import { IconBadge } from './icon-badge';

const Glyph = ({ color }: { color?: string }) => (
  <Text style={{ fontSize: 16, fontWeight: '700', color }}>×</Text>
);

const meta = {
  title: 'Project/IconBadge',
  component: IconBadge,
  args: { icon: <Glyph />, color: '#E6E8F2', size: 40 },
  argTypes: {
    color: { control: { type: 'color' } },
    size: { control: { type: 'range', min: 16, max: 96, step: 4 } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, flexDirection: 'row', gap: 12 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof IconBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Brand: Story = { args: { color: '#DBEAFE' } };
export const Success: Story = { args: { color: '#DCFCE7' } };
export const Danger: Story = { args: { color: '#FEE2E2' } };
export const Small: Story = { args: { size: 24 } };
export const Large: Story = { args: { size: 64 } };
