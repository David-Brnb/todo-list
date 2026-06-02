import { BrandLogo } from '@/icons';
import {
  Button,
  ErrorModal,
  Label,
  MultilineInput,
  SingleLineInput,
} from '@/project_components';
import { useSignupStore } from '@/stores/signup';
import { Pressable, Text, View } from '@/tw';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ROLE_OPTIONS = [
  "Developer",
  "Designer",
  "Product Manager",
  "Student",
  "Teacher",
  "Other"
];

export default function GeneralInfoStep() {
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const setField = useSignupStore((s) => s.setField);

  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [interest, setInterest] = useState("");
  const [description, setDescription] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownAnimation] = useState(() => new Animated.Value(0));

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (dropdownOpen) {
      Animated.timing(dropdownAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setDropdownOpen(false);
      });
    } else {
      setDropdownOpen(true);
      dropdownAnimation.setValue(0);
      Animated.timing(dropdownAnimation, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  function handleContinue() {
    const selectedRole = role === "Other" ? customRole.trim() : role.trim();
    const trimmedDescription = description.trim();

    if (!selectedRole) {
      setErrorMessage("Por favor, selecciona o ingresa un rol.");
      setErrorModalVisible(true);
      return;
    }

    if (!trimmedDescription) {
      setErrorMessage("Por favor, ingresa una descripción sobre ti.");
      setErrorModalVisible(true);
      return;
    }
    
    setField("rol", selectedRole);
    setField("interests", interest.trim());
    setField("description", trimmedDescription);

    router.push('/(auth)/signup/confirm');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <BrandLogo />
      </View>
      <View className="flex-1 items-center justify-center px-5">
        <View className="w-full py-2">
          <Text className="text-4xl text-blue-600 font-semibold">
            General Info
          </Text>
        </View>
        <View className="w-full gap-5">
          {/* Role Selector */}
          <View className="w-full">
            <Label className="mb-1 px-1">Role</Label>
            <Pressable
              onPress={toggleDropdown}
              className="h-14 w-full rounded-xl border border-border bg-surface px-5 justify-between flex-row items-center active:opacity-90"
            >
              <Text className="font-inter text-base text-ink">
                {role || "Select a role..."}
              </Text>
              <Text className="text-gray-400 font-semibold">{dropdownOpen ? "▲" : "▼"}</Text>
            </Pressable>

            {dropdownOpen && (
              <Animated.View
                style={{
                  opacity: dropdownAnimation,
                  transform: [
                    {
                      translateY: dropdownAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-15, 0],
                      }),
                    },
                  ],
                }}
                className="mt-2 bg-surface border border-border rounded-xl p-2 gap-1 z-50"
              >
                {ROLE_OPTIONS.map((option) => (
                  <Pressable
                    key={option}
                    onPress={() => {
                      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                      setRole(option);
                      Animated.timing(dropdownAnimation, {
                        toValue: 0,
                        duration: 150,
                        useNativeDriver: true,
                      }).start(() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setDropdownOpen(false);
                      });
                    }}
                    className={`px-4 py-3 rounded-lg ${role === option ? 'bg-blue-500/10' : 'active:bg-gray-100'}`}
                  >
                    <Text className={`font-inter text-base ${role === option ? 'text-blue-600 font-semibold' : 'text-ink'}`}>
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </Animated.View>
            )}

            {role === "Other" && (
              <SingleLineInput
                placeholder="Write your role here"
                value={customRole}
                onChangeText={setCustomRole}
                containerClassName="mt-3"
              />
            )}
          </View>

          {/* Interest Input (Optional) */}
          <SingleLineInput
            label="Interest (Optional)"
            placeholder="e.g. Coding, Photography, Cooking..."
            value={interest}
            onChangeText={setInterest}
          />

          {/* Description Input */}
          <MultilineInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Tell us a bit about yourself..."
            maxLength={200}
          />

          <Button
            text="Continue"
            bgColor="#005BBF"
            textColor="#FFFFFF"
            onClick={handleContinue}
          />
        </View>
      </View>

      {/* Modal de Error de Validación */}
      <ErrorModal
        visible={errorModalVisible}
        message={errorMessage}
        onClose={() => setErrorModalVisible(false)}
      />
    </SafeAreaView>
  );
}
