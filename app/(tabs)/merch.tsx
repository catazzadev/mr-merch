import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useChapter } from "@/lib/ChapterContext";
import { ActiveMerch, getActiveMerch } from "@/lib/merch";
import { getImageUrl } from "@/lib/chapters";

export default function MerchScreen() {
  const { selectedChapter } = useChapter();
  const router = useRouter();
  const [merch, setMerch] = useState<ActiveMerch[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedChapter) return;
    setLoading(true);
    getActiveMerch(selectedChapter.id)
      .then(setMerch)
      .catch((err) => Alert.alert("Error", err.message))
      .finally(() => setLoading(false));
  }, [selectedChapter]);

  if (!selectedChapter) {
    return (
      <View className="flex-1 items-center justify-center bg-surface px-8">
        <MaterialIcons name="shopping-bag" size={48} color="#333" />
        <Text className="text-4xl text-white font-bebas tracking-tight text-center mt-4 mb-2">
          NO CHAPTER SELECTED
        </Text>
        <Text className="text-sm text-neutral-500 font-montserrat text-center">
          Go to Chapters and select your city first
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-surface" showsVerticalScrollIndicator={false}>
      {/* Hero header */}
      <View className="px-6 pt-16 pb-8">
        <Text className="text-6xl text-white font-bebas tracking-tight leading-none">
          ACTIVE MERCH
        </Text>
        <Text className="text-6xl font-bebas tracking-tight leading-none" style={{ color: "#FF007F" }}>
          {selectedChapter.name.replace("MR ", "").toUpperCase()}
        </Text>
      </View>

      {loading ? (
        <View className="items-center justify-center py-20">
          <ActivityIndicator size="large" color="#FF007F" />
        </View>
      ) : merch.length === 0 ? (
        <View className="items-center justify-center py-20 px-8">
          <MaterialIcons name="storefront" size={48} color="#333" />
          <Text className="text-neutral-500 font-montserrat-medium text-base text-center mt-4">
            No active merch for this chapter yet
          </Text>
        </View>
      ) : (
        <View className="px-6 pb-8 gap-6">
          {merch.map((item) => (
            <View
              key={item.id}
              className="overflow-hidden"
              style={{ backgroundColor: "#131313" }}
            >
              {/* Image — 4:5 aspect ratio */}
              <View style={{ aspectRatio: 5 / 4, backgroundColor: "#1a1a1a" }}>
                {item.logo_path && (
                  <Image
                    source={getImageUrl(item.logo_path)}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                    cachePolicy="disk"
                    recyclingKey={item.id}
                  />
                )}
              </View>

              {/* Info */}
              <View className="p-6">
                <Text className="text-3xl font-bebas tracking-wide text-white mb-2">
                  {item.name}
                </Text>
                {item.description && (
                  <Text className="text-sm font-montserrat text-neutral-500 leading-relaxed mb-6">
                    {item.description}
                  </Text>
                )}
                <View className="flex-row justify-between items-center">
                  {item.price != null ? (
                    <Text className="text-xl font-montserrat-bold text-white">
                      &euro;{item.price.toFixed(2)}
                    </Text>
                  ) : (
                    <View />
                  )}
                  <Pressable
                    onPress={() => router.push(`/merch/${item.id}`)}
                    className="px-6 py-3 active:scale-95"
                    style={{ backgroundColor: "#262626" }}
                  >
                    <Text
                      className="font-bebas text-lg tracking-widest"
                      style={{ color: "#FF007F" }}
                    >
                      GET IT
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
