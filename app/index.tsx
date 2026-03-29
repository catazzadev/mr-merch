import { View, Text, Pressable } from "react-native";
import { useSession } from "@/lib/useSession";
import { signOut } from "@/lib/auth";

export default function HomeScreen() {
  const { session } = useSession();

  return (
    <View className="flex-1 items-center justify-center bg-white px-8">
      <Text className="text-3xl font-bold text-gray-900 mb-2">Mr Merch</Text>
      <Text className="text-base text-gray-500 mb-8">
        {session?.user.email}
      </Text>

      <Pressable
        onPress={signOut}
        className="h-14 w-full rounded-xl border-2 border-gray-200 items-center justify-center active:opacity-80"
      >
        <Text className="text-gray-900 text-base font-semibold">Sign Out</Text>
      </Pressable>
    </View>
  );
}
