import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';

import { Add } from './add';

const PlusIcon = () => (
  <Text style={{ color: 'white', fontSize: 24, fontWeight: '600' }}>+</Text>
);

const meta = {
  title: 'Project/Add',
  component: Add,
  args: { icon: <PlusIcon /> },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Add>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
