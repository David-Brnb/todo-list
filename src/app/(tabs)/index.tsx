import { Text, View } from "@/tw";

export default function HomeScreen() {
  return (
    // flex-1: ocupa toda la pantalla
    // justify-center: centra verticalmente
    // items-center: centra horizontalmente
    // bg-white: le da un fondo blanco por si acaso tu app está en modo oscuro y no lo ves
    <View className="flex-1 justify-center items-center bg-white">
      {/* text-red-500: color rojo */}
      {/* text-4xl: tamaño de texto grande */}
      {/* font-bold: negritas */}
      <Text className="text-red-500 text-4xl font-bold">Hi</Text>
    </View>
  );
}
