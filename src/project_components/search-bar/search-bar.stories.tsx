import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { SearchBar } from './search-bar';

const meta = {
  title: 'Project/SearchBar',
  component: SearchBar,
  args: {
    placeholder: 'Search tasks, lists, or notes...',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#F9F9FF', width: 342 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const CustomPlaceholder: Story = {
  args: { placeholder: 'Find a project...' },
};

export const Controlled: Story = {
  render: (args) => {
    const [text, setText] = useState('');
    return <SearchBar {...args} value={text} onChangeText={setText} />;
  },
};
