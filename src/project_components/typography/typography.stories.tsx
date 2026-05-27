import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import {
  BodyText,
  Caption,
  HeadingL,
  HeadingM,
  HeadingXL,
  Label,
  SectionLabel,
} from './typography';

const meta = {
  title: 'Project/Typography',
  component: HeadingXL,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, gap: 8 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof HeadingXL>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  render: () => (
    <>
      <HeadingXL>Your Atelier</HeadingXL>
      <HeadingL>History Project</HeadingL>
      <HeadingM>Setup React Native Environment</HeadingM>
      <BodyText>Focus on what matters today.</BodyText>
      <Caption>Chapter 4: Flexbox Deep Dive</Caption>
      <Label>List title</Label>
      <SectionLabel>Due Today</SectionLabel>
    </>
  ),
};
