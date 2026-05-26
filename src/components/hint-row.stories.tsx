import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { HintRow } from './hint-row';

const meta = {
  title: 'Components/HintRow',
  component: HintRow,
  args: {
    title: 'Try editing',
    hint: 'app/index.tsx',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof HintRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongHint: Story = {
  args: {
    title: 'Open file',
    hint: 'src/components/themed-text.tsx',
  },
};
