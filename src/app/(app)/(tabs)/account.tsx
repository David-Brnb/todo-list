import { Button, Avatar } from '@/project_components';
import { Text, View } from '@/tw';

import { logout } from '@/services/firebase/authService';
import { useAuthStore } from '@/stores/auth';
import { useState } from 'react';

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
    <View className="flex-1 justify-center items-center bg-[#F9F9FF] px-6 gap-6">
      <Text
        style={{ fontFamily: "Manrope_800ExtraBold", letterSpacing: -0.9 }}
        className="text-[36px] leading-[45px] text-[#191C23]"
      >
        Account
      </Text>

      <View className="items-center gap-2 my-4">
        <Avatar source={user?.firebaseImage} size={64} ring />
        {user?.fullName ? (
          <Text
            style={{ fontFamily: "Manrope_700Bold" }}
            className="text-xl font-bold text-[#191C23] mt-2"
          >
            {user.fullName}
          </Text>
        ) : null}
        {user?.email ? (
          <Text
            style={{ fontFamily: "Inter_400Regular" }}
            className="text-sm text-[#60646C]"
          >
            {user.email}
          </Text>
        ) : null}
      </View>

      <Button
        text="Logout"
        bgColor="#005BBF"
        textColor="white"
        onClick={handleSignOut}
      />
    </View>
  );
}
