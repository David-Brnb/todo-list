import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';

import { ColorSwatch } from './color-swatch';

const Check = () => <Text style={{ color: 'white', fontSize: 16, fontWeight: '800' }}>✓</Text>;

const meta = {
  title: 'Project/ColorSwatch',
  component: ColorSwatch,
  args: { color: '#005BBF', selected: false, selectedIcon: <Check /> },
  argTypes: {
    selected: { control: { type: 'boolean' } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#F9F9FF', flexDirection: 'row', gap: 12 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {};
export const Selected: Story = { args: { selected: true } };
