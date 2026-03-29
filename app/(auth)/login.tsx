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
      className="flex-1 bg-surface"
    >
      <View className="items-center mb-12">
        <Image
          source={require("@/assets/mr-logo.jpeg")}
          className="w-32 h-32 rounded-full mb-4"
          resizeMode="cover"
        />
        <Text className="text-5xl text-white font-bebas tracking-wider">
          MR MERCH
        </Text>
      </View>

      <View className="gap-4 mb-6">
        <TextInput
          className="h-14 rounded-xl bg-surface-input px-4 font-montserrat text-base text-white border border-neutral-800"
          placeholder="Email"
          placeholderTextColor="#525252"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <View className="relative">
          <TextInput
            className="h-14 rounded-xl bg-surface-input px-4 pr-14 font-montserrat text-base text-white border border-neutral-800"
            placeholder="Password"
            placeholderTextColor="#525252"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-0 bottom-0 justify-center"
          >
            <Text className="text-lg text-neutral-500">
              {showPassword ? "\u{1F441}" : "\u{1F441}\u{200D}\u{1F5E8}"}
            </Text>
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={handleLogin}
        disabled={loading}
        className="h-14 rounded-xl bg-accent items-center justify-center active:bg-accent-light"
      >
        <Text className="text-white text-base font-montserrat-semibold">
          {loading ? "Signing in..." : "Sign In"}
        </Text>
      </Pressable>

      <View className="flex-row justify-center mt-6 gap-1">
        <Text className="text-neutral-500 font-montserrat">
          Don't have an account?
        </Text>
        <Link href="/(auth)/signup" asChild>
          <Pressable>
            <Text className="text-accent font-montserrat-semibold">
              Sign Up
            </Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}
