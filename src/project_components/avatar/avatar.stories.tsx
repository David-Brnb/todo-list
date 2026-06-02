import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { Avatar } from './avatar';

const SAMPLE = 'https://i.pravatar.cc/200?img=12';

const meta = {
  title: 'Project/Avatar',
  component: Avatar,
  args: { source: SAMPLE, size: 40 },
  argTypes: {
    size: { control: { type: 'select' }, options: [32, 40, 64] },
    ring: { control: { type: 'boolean' } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = { args: { size: 32 } };
export const Medium: Story = { args: { size: 40 } };
export const Large: Story = { args: { size: 64 } };
export const WithRing: Story = { args: { size: 40, ring: true } };
export const Empty: Story = { args: { source: undefined } };
