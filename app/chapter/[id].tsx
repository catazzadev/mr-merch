import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSession } from "@/lib/useSession";
import { signOut } from "@/lib/auth";
import { ActiveMerch, getActiveMerch } from "@/lib/merch";
import { getLogoUrl } from "@/lib/chapters";

export default function ChapterScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const { session } = useSession();
  const router = useRouter();
  const [merch, setMerch] = useState<ActiveMerch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActiveMerch(id)
      .then(setMerch)
      .catch((err) => Alert.alert("Error", err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <View className="flex-1 bg-white px-8 pt-20">
      <Text className="text-3xl font-bold text-gray-900 mb-2">{name}</Text>
      <Text className="text-base text-gray-500 mb-8">Active Merch</Text>

      <View className="flex-1">
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : merch.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-400 text-base">No active merch yet</Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap gap-4">
            {merch.map((item) => (
              <Pressable
                key={item.id}
                className="w-40 rounded-2xl bg-gray-100 overflow-hidden active:opacity-80"
              >
                {item.logo_path && (
                  <Image
                    source={{ uri: getLogoUrl(item.logo_path) }}
                    className="w-full aspect-square"
                    resizeMode="cover"
                  />
                )}
                <Text className="text-base font-semibold text-gray-900 px-3 py-3 text-center">
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

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
