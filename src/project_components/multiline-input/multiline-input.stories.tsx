import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { MultilineInput } from './multiline-input';

const meta = {
  title: 'Project/MultilineInput',
  component: MultilineInput,
  args: {
    label: 'Description (optional)',
    placeholder: 'Notes about this collection...',
    rows: 4,
  },
  argTypes: {
    rows: { control: { type: 'range', min: 2, max: 10, step: 1 } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof MultilineInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tall: Story = { args: { rows: 8 } };
