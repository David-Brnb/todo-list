import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { Checkbox } from './checkbox';

const meta = {
  title: 'Project/Checkbox',
  component: Checkbox,
  args: { checked: false },
  argTypes: {
    checked: { control: { type: 'boolean' } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, flexDirection: 'row', gap: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { checked: true } };
