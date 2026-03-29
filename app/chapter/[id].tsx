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
import { signOut } from "@/lib/auth";
import { ActiveMerch, getActiveMerch } from "@/lib/merch";
import { getLogoUrl } from "@/lib/chapters";

export default function ChapterScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
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
    <View className="flex-1 bg-surface px-8 pt-20">
      <Text className="text-4xl text-white font-bebas tracking-wider mb-1">
        {name}
      </Text>
      <Text className="text-base text-neutral-500 font-montserrat mb-8">
        Active Merch
      </Text>

      <View className="flex-1">
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#e91e8c" />
          </View>
        ) : merch.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-neutral-600 font-montserrat text-base">
              No active merch yet
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap gap-4">
            {merch.map((item) => (
              <Pressable
                key={item.id}
                className="w-40 rounded-2xl bg-surface-card overflow-hidden active:opacity-80 border border-neutral-800"
              >
                {item.logo_path && (
                  <Image
                    source={{ uri: getLogoUrl(item.logo_path) }}
                    className="w-full aspect-square"
                    resizeMode="cover"
                  />
                )}
                <Text className="text-sm text-white font-montserrat-semibold px-3 py-3 text-center">
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
          className="h-14 rounded-xl border border-neutral-700 items-center justify-center active:bg-surface-card"
        >
          <Text className="text-white text-base font-montserrat-semibold">
            Change Chapter
          </Text>
        </Pressable>
        <Pressable
          onPress={signOut}
          className="h-14 rounded-xl border border-neutral-700 items-center justify-center active:bg-surface-card"
        >
          <Text className="text-neutral-400 text-base font-montserrat-semibold">
            Sign Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
