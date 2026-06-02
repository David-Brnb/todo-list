import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { AddTaskList } from './add-task-list';

const meta = {
  title: 'Project/AddTaskList',
  component: AddTaskList,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#F9F9FF' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof AddTaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
