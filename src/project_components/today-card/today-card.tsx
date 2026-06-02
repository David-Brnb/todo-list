import { Text, View } from "@/tw";
import { cn } from "../cn";

type Props = React.ComponentProps<typeof View> & {
  title: string;
  time: string;
  color: string;
};

function formatTime(timeString: string): string {
  if (!timeString) return "";

  // Si ya es un formato simple de hora (ej: "19:00" o "19:00:00"), devolver "19:00"
  if (/^\d{2}:\d{2}(:\d{2})?$/.test(timeString)) {
    return timeString.substring(0, 5);
  }

  try {
    const date = new Date(timeString);
    if (!isNaN(date.getTime())) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }
  } catch (e) {
    // Ignorar fallos de parseo
  }

  // Si no se pudo parsear como fecha, buscar patrón "T19:00"
  const match = timeString.match(/T(\d{2}):(\d{2})/);
  if (match) {
    return `${match[1]}:${match[2]}`;
  }

  return timeString;
}

export function TodayCard({ title, time, color, className, ...p }: Props) {
  return (
    <View
      className={cn(
        "h-13.5 flex-row items-center justify-between self-stretch rounded-xl border border-surface-sunken bg-white p-4",
        className,
      )}
      {...p}
    >
      <View className="flex-row items-center gap-3">
        <View
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <Text className="font-inter text-sm font-semibold leading-5 text-ink">
          {title}
        </Text>
      </View>

      <Text
        className="font-inter text-xs font-bold leading-4"
        style={{ color }}
      >
        {formatTime(time)}
      </Text>
    </View>
  );
}
