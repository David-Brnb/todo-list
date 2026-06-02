import { Pressable, Text } from "@/tw";
import { SymbolView } from "expo-symbols";
import { cn } from "../cn";

type Props = React.ComponentProps<typeof Pressable>;

export function AddTaskList({ className, ...p }: Props) {
  return (
    <Pressable
      className={cn(
        "h-9 flex-row items-center gap-2 self-start rounded-full bg-surface-sunken px-4 py-2",
        className,
      )}
      {...p}
    >
      <SymbolView
        name={{ ios: "plus", android: "add", web: "add" }}
        size={10}
        weight="bold"
        tintColor="#414754"
      />
      <Text className="font-inter text-sm font-medium leading-5 text-ink-secondary">
        Add task list
      </Text>
    </Pressable>
  );
}
