import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import { signIn } from "@/lib/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center px-8">
        <Text className="text-4xl font-bold text-center mb-2 text-gray-900">
          Mr Merch
        </Text>
        <Text className="text-base text-center text-gray-500 mb-12">
          Welcome back
        </Text>

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
          <TextInput
            className="h-14 rounded-xl bg-gray-100 px-4 text-base text-gray-900"
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
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
      </View>
    </KeyboardAvoidingView>
  );
}
