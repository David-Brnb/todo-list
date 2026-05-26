import {
  useCssElement,
  useNativeVariable as useFunctionalVariable,
} from "react-native-css";

import { Link as RouterLink } from "expo-router";
import Animated from "react-native-reanimated";
import React from "react";
import {
  View as RNView,
  Text as RNText,
  Pressable as RNPressable,
  ScrollView as RNScrollView,
  TouchableHighlight as RNTouchableHighlight,
  TextInput as RNTextInput,
  StyleSheet,
  ViewStyle,
} from "react-native";

export const Link = (
  props: React.ComponentProps<typeof RouterLink> & { className?: string }
): React.ReactElement => {
  // @ts-ignore — useCssElement return type is too complex for tsc
  return useCssElement(RouterLink, props, { className: "style" });
};

Link.Trigger = RouterLink.Trigger;
Link.Menu = RouterLink.Menu;
Link.MenuAction = RouterLink.MenuAction;
Link.Preview = RouterLink.Preview;

export const useCSSVariable =
  process.env.EXPO_OS !== "web"
    ? useFunctionalVariable
    : (variable: string) => `var(${variable})`;

export type ViewProps = React.ComponentProps<typeof RNView> & {
  className?: string;
};

export const View = (props: ViewProps): React.ReactElement => {
  // @ts-ignore — useCssElement return type is too complex for tsc
  return useCssElement(RNView, props, { className: "style" });
};
View.displayName = "CSS(View)";

export const Text = (
  props: React.ComponentProps<typeof RNText> & { className?: string }
): React.ReactElement => {
  return useCssElement(RNText, props, { className: "style" }) as React.ReactElement;
};
Text.displayName = "CSS(Text)";

export const ScrollView = (
  props: React.ComponentProps<typeof RNScrollView> & {
    className?: string;
    contentContainerClassName?: string;
  }
): React.ReactElement => {
  // @ts-ignore — useCssElement return type is too complex for tsc
  return useCssElement(RNScrollView, props, {
    className: "style",
    contentContainerClassName: "contentContainerStyle",
  });
};
ScrollView.displayName = "CSS(ScrollView)";

export const Pressable = (
  props: React.ComponentProps<typeof RNPressable> & { className?: string }
): React.ReactElement => {
  return useCssElement(RNPressable, props, { className: "style" }) as React.ReactElement;
};
Pressable.displayName = "CSS(Pressable)";

export const TextInput = (
  props: React.ComponentProps<typeof RNTextInput> & { className?: string }
): React.ReactElement => {
  return useCssElement(RNTextInput, props, { className: "style" }) as React.ReactElement;
};
TextInput.displayName = "CSS(TextInput)";

export const AnimatedScrollView = (
  props: React.ComponentProps<typeof Animated.ScrollView> & {
    className?: string;
    contentClassName?: string;
    contentContainerClassName?: string;
  }
): React.ReactElement => {
  // @ts-ignore — useCssElement return type is too complex for tsc
  return useCssElement(Animated.ScrollView, props, {
    className: "style",
    contentClassName: "contentContainerStyle",
    contentContainerClassName: "contentContainerStyle",
  });
};

function XXTouchableHighlight(
  props: React.ComponentProps<typeof RNTouchableHighlight>
) {
  const flatStyle = StyleSheet.flatten(props.style) as (ViewStyle & { underlayColor?: string }) | undefined;
  const { underlayColor, ...style } = flatStyle || {};
  return (
    <RNTouchableHighlight
      underlayColor={underlayColor}
      {...props}
      style={style}
    />
  );
}

export const TouchableHighlight = (
  props: React.ComponentProps<typeof RNTouchableHighlight>
): React.ReactElement => {
  return useCssElement(XXTouchableHighlight, props, { className: "style" }) as React.ReactElement;
};
TouchableHighlight.displayName = "CSS(TouchableHighlight)";
