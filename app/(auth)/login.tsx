import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { signIn } from "@/lib/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView
      contentContainerClassName="flex-grow justify-center px-8 py-12"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white"
    >
        <View className="items-center mb-12">
          <Image
            source={require("@/assets/mr-logo.jpeg")}
            className="w-32 h-32 rounded-full mb-4"
            resizeMode="cover"
          />
          <Text className="text-4xl font-bold text-gray-900">MR Merch</Text>
        </View>

        <View className="gap-4 mb-6">
          <TextInput
            className="h-14 rounded-xl bg-gray-100 px-4 text-base text-gray-900"
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <View className="relative">
            <TextInput
              className="h-14 rounded-xl bg-gray-100 px-4 pr-14 text-base text-gray-900"
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-0 bottom-0 justify-center"
            >
              <Text className="text-lg text-gray-500">
                {showPassword ? "\u{1F441}" : "\u{1F441}\u{200D}\u{1F5E8}"}
              </Text>
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={handleLogin}
          disabled={loading}
          className="h-14 rounded-xl bg-gray-900 items-center justify-center active:opacity-80"
        >
          <Text className="text-white text-base font-semibold">
            {loading ? "Signing in..." : "Sign In"}
          </Text>
        </Pressable>

        <View className="flex-row justify-center mt-6 gap-1">
          <Text className="text-gray-500">Don't have an account?</Text>
          <Link href="/(auth)/signup" asChild>
            <Pressable>
              <Text className="text-gray-900 font-semibold">Sign Up</Text>
            </Pressable>
          </Link>
        </View>
    </ScrollView>
  );
}
