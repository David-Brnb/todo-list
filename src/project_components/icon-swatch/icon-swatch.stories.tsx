import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';

import { IconSwatch } from './icon-swatch';

const Glyph = ({ color = '#414754' }: { color?: string }) => (
  <Text style={{ color, fontSize: 18, fontWeight: '700' }}>★</Text>
);

const meta = {
  title: 'Project/IconSwatch',
  component: IconSwatch,
  args: { icon: <Glyph />, selected: false },
  argTypes: {
    selected: { control: { type: 'boolean' } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, flexDirection: 'row', gap: 12 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof IconSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {};
export const Selected: Story = { args: { selected: true, icon: <Glyph color="#005BBF" /> } };
