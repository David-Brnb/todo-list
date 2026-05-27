import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { PasswordInput } from './password-input';

const meta = {
  title: 'Project/PasswordInput',
  component: PasswordInput,
  args: { label: 'Password', placeholder: 'Enter your password', showToggle: true },
  argTypes: {
    showToggle: { control: { type: 'boolean' } },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutToggle: Story = { args: { showToggle: false } };
export const NoLabel: Story = { args: { label: undefined, placeholder: 'Password' } };
