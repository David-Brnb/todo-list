import { Pressable } from "@/tw";
import { cn } from "../cn";
import { IconBadge } from "../icon-badge";
import { Caption, HeadingM } from "../typography/typography";

type Props = React.ComponentProps<typeof Pressable> & {
  title: string;
  taskCount: number;
  icon: React.ReactElement<{ color?: string }>;
  color: string;
};

export function ListCard({
  title,
  taskCount,
  icon,
  color,
  className,
  ...p
}: Props) {
  return (
    <Pressable
      className={cn("rounded-xl bg-surface p-5 shadow-sm", className)}
      {...p}
    >
      <IconBadge icon={icon} color={color} />
      <HeadingM className="mt-4 text-base">{title}</HeadingM>
      <Caption className="mt-1">
        {taskCount} {taskCount === 1 ? "tarea" : "tareas"}
      </Caption>
    </Pressable>
  );
}
