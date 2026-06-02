import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { SingleLineInput } from './single-line-input';

const meta = {
  title: 'Project/SingleLineInput',
  component: SingleLineInput,
  args: { label: 'List Title', placeholder: 'e.g. Computer Science Finals' },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SingleLineInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoLabel: Story = { args: { label: undefined, placeholder: 'Type something...' } };
