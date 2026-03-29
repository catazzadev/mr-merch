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
import { signUp } from "@/lib/auth";

function EyeIcon({ open }: { open: boolean }) {
  return (
    <Text className="text-lg text-neutral-500">
      {open ? "\u{1F441}" : "\u{1F441}\u{200D}\u{1F5E8}"}
    </Text>
  );
}

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert(
        "Check your email",
        "We sent you a verification link. Please verify your email before signing in.",
        [{ text: "OK" }]
      );
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
        <Text className="text-base text-neutral-500 font-montserrat mt-2">
          Create your account
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
            <EyeIcon open={showPassword} />
          </Pressable>
        </View>
        <View className="relative">
          <TextInput
            className="h-14 rounded-xl bg-surface-input px-4 pr-14 font-montserrat text-base text-white border border-neutral-800"
            placeholder="Confirm password"
            placeholderTextColor="#525252"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <Pressable
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-0 bottom-0 justify-center"
          >
            <EyeIcon open={showConfirmPassword} />
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={handleSignup}
        disabled={loading}
        className="h-14 rounded-xl bg-accent items-center justify-center active:bg-accent-light"
      >
        <Text className="text-white text-base font-montserrat-semibold">
          {loading ? "Creating account..." : "Sign Up"}
        </Text>
      </Pressable>

      <View className="flex-row justify-center mt-6 gap-1">
        <Text className="text-neutral-500 font-montserrat">
          Already have an account?
        </Text>
        <Link href="/(auth)/login" asChild>
          <Pressable>
            <Text className="text-accent font-montserrat-semibold">
              Sign In
            </Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}
