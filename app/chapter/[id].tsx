import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSession } from "@/lib/useSession";
import { signOut } from "@/lib/auth";

export default function ChapterScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const { session } = useSession();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-8 pt-20">
      <Text className="text-3xl font-bold text-gray-900 mb-1">{name}</Text>
      <Text className="text-base text-gray-500 mb-8">
        {session?.user.email}
      </Text>

      <View className="flex-1" />

      <View className="gap-3 pb-12">
        <Pressable
          onPress={() => router.back()}
          className="h-14 rounded-xl border-2 border-gray-200 items-center justify-center active:opacity-80"
        >
          <Text className="text-gray-900 text-base font-semibold">
            Change Chapter
          </Text>
        </Pressable>
        <Pressable
          onPress={signOut}
          className="h-14 rounded-xl border-2 border-gray-200 items-center justify-center active:opacity-80"
        >
          <Text className="text-gray-900 text-base font-semibold">
            Sign Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
