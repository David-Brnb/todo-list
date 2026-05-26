import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { ThemedText } from './themed-text';

const meta = {
  title: 'Components/ThemedText',
  component: ThemedText,
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    type: 'default',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['default', 'title', 'subtitle', 'small', 'smallBold', 'link', 'linkPrimary', 'code'],
    },
    themeColor: {
      control: { type: 'select' },
      options: [undefined, 'text', 'textSecondary', 'background', 'backgroundElement', 'backgroundSelected'],
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ThemedText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Title: Story = {
  args: { type: 'title', children: 'Page title' },
};

export const Subtitle: Story = {
  args: { type: 'subtitle', children: 'Section subtitle' },
};

export const Small: Story = {
  args: { type: 'small', children: 'Small body copy' },
};

export const Link: Story = {
  args: { type: 'link', children: 'Open documentation' },
};

export const Code: Story = {
  args: { type: 'code', children: 'src/app/index.tsx' },
};

export const Secondary: Story = {
  args: { themeColor: 'textSecondary', children: 'Secondary text color' },
};
