import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { BodyText, HeadingM } from "../typography/typography";
import { Card } from "./card";

const meta = {
  title: "Project/Card",
  component: Card,
  args: { accent: "none" },
  argTypes: {
    accent: {
      control: { type: "select" },
      options: ["none", "brand", "success", "danger"],
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#F9F9FF" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const Inner = () => (
  <>
    <HeadingM>Advanced React Native Layouts</HeadingM>
    <BodyText className="mt-1 text-sm">Chapter 4: Flexbox Deep Dive</BodyText>
  </>
);

export const Plain: Story = {
  render: () => (
    <Card>
      <Inner />
    </Card>
  ),
};
export const Brand: Story = {
  render: () => (
    <Card accent="brand">
      <Inner />
    </Card>
  ),
};
export const Success: Story = {
  render: () => (
    <Card accent="success">
      <Inner />
    </Card>
  ),
};
export const Danger: Story = {
  render: () => (
    <Card accent="danger">
      <Inner />
    </Card>
  ),
};
