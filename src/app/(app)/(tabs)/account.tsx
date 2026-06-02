import { Avatar } from "@/project_components";
import { Pressable, ScrollView, Text, View } from "@/tw";
import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { SafeAreaView } from "react-native-safe-area-context";

import { logout } from "@/services/firebase/authService";
import { useAuthStore } from "@/stores/auth";
import { useState } from "react";

const PROJECT_TAGS = ["React Native", "Expo Router", "Zustand"];

function SectionTitle({ title }: { title: string }) {
  return (
    <View className="flex-row items-center gap-2">
      <View className="h-6 w-1.5 rounded-full bg-[#005BBF]" />
      <Text
        style={{ fontFamily: "Manrope_700Bold", letterSpacing: -0.5 }}
        className="text-xl text-[#414754]"
      >
        {title}
      </Text>
    </View>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <View className="rounded-full bg-[#B2C9FE] px-3 py-1">
      <Text
        style={{ fontFamily: "Inter_400Regular", letterSpacing: 0.55 }}
        className="text-[11px] font-bold uppercase text-[#3D5481]"
      >
        {text}
      </Text>
    </View>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: SymbolViewProps["name"];
  label: string;
  value: string;
}) {
  return (
    <View className="flex-1 gap-2 rounded-xl bg-[#E0E2EC] p-5">
      <SymbolView name={icon} size={20} tintColor="#005BBF" />
      <Text className="font-inter text-xs uppercase text-[#414754]">{label}</Text>
      <Text style={{ fontFamily: "Manrope_700Bold" }} className="text-sm text-[#191C23]">
        {value}
      </Text>
    </View>
  );
}

export default function AccountScreen() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await logout();
      await signOut();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]} className="bg-[#F9F9FF]">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* About the Project */}
        <View className="gap-4">
          <SectionTitle title="About the Project" />

          <View className="gap-4 rounded-xl bg-white p-6 shadow-sm">
            <Text
              style={{ fontFamily: "Inter_400Regular" }}
              className="font-inter text-base font-bold leading-[26px] text-[#005BBF]"
            >
              Scholarly Atelier is a curated educational task management experience designed
              specifically for the React Native ecosystem.
            </Text>
            <Text className="font-inter text-sm leading-[23px] text-[#414754]">
              Unlike traditional productivity tools, this project serves as a foundational
              blueprint for developers to master state management, gesture handling, and the
              &quot;Academic Scholar&quot; design philosophy in mobile interfaces.
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {PROJECT_TAGS.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </View>
          </View>
        </View>

        {/* About Me */}
        <View className="gap-4 mt-10">
          <SectionTitle title="About Me" />

          {/* Name card */}
          <View className="flex-row items-center gap-4 rounded-xl bg-[#F2F3FD] p-5">
            <Avatar source={user?.firebaseImage} size={64} ring />
            <View>
              {user?.role ? (
                <Text
                  style={{ fontFamily: "Inter_400Regular", letterSpacing: 1.2 }}
                  className="text-xs font-bold uppercase text-[#005BBF]"
                >
                  {user.role}
                </Text>
              ) : null}
              <Text
                style={{ fontFamily: "Manrope_700Bold" }}
                className="text-lg text-[#191C23]"
              >
                {user?.fullName || "Unknown User"}
              </Text>
            </View>
          </View>

          {/* Bento row */}
          <View className="flex-row gap-4">
            <InfoCard
              icon={{ ios: "lightbulb.fill", android: "lightbulb", web: "lightbulb" }}
              label="CS Interest"
              value={user?.interest || "—"}
            />
            <InfoCard
              icon={{ ios: "camera.fill", android: "photo_camera", web: "photo_camera" }}
              label="Hobbies"
              value="Photography & Jazz"
            />
          </View>

          {/* Mission statement */}
          <View className="rounded-xl bg-white p-5 shadow-sm">
            <Text className="font-inter text-sm leading-[23px] text-[#414754]">
              {user?.description
                ? `“${user.description}”`
                : "“Dedicated to bridging the gap between high-fidelity design systems and functional code architecture.”"}
            </Text>
          </View>
        </View>

        {/* Logout */}
        <Pressable
          onPress={handleSignOut}
          disabled={signingOut}
          className="self-center mt-8 flex-row items-center gap-2 rounded-full bg-surface-sunken px-5 py-2.5 active:opacity-70"
        >
          <SymbolView
            name={{ ios: "rectangle.portrait.and.arrow.right", android: "logout", web: "logout" }}
            size={16}
            tintColor="#BA1A1A"
          />
          <Text className="font-inter text-sm font-semibold text-danger">
            {signingOut ? "Logging out..." : "Log Out"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
