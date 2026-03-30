import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { useChapter } from "@/lib/ChapterContext";
import { ActiveMerch, getActiveMerch } from "@/lib/merch";
import { getLogoUrl } from "@/lib/chapters";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function MerchScreen() {
  const { selectedChapter } = useChapter();
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
        <Text className="text-4xl text-white font-bebas tracking-tight text-center mb-2">
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
      <View className="px-6 pt-16 pb-6">
        <Text className="text-6xl text-white font-bebas tracking-tight leading-none">
          {selectedChapter.name.replace("MR ", "")}
        </Text>
        <Text className="text-6xl font-bebas tracking-tight leading-none" style={{ color: "#FF007F" }}>
          MERCH
        </Text>
        <Text className="text-sm text-neutral-500 font-montserrat-medium mt-4">
          Available items for your chapter
        </Text>
      </View>

      {loading ? (
        <View className="items-center justify-center py-20">
          <ActivityIndicator size="large" color="#FF007F" />
        </View>
      ) : merch.length === 0 ? (
        <View className="items-center justify-center py-20 px-8">
          <Text className="text-neutral-600 font-montserrat text-base text-center">
            No active merch yet
          </Text>
        </View>
      ) : (
        <View className="px-6 pb-8 flex-row flex-wrap gap-4">
          {merch.map((item) => (
            <Pressable
              key={item.id}
              className="overflow-hidden rounded-2xl bg-surface-card border border-neutral-800 active:scale-[0.97]"
              style={{ width: (SCREEN_WIDTH - 60) / 2 }}
            >
              {item.logo_path && (
                <Image
                  source={{ uri: getLogoUrl(item.logo_path) }}
                  className="w-full aspect-square"
                  resizeMode="cover"
                />
              )}
              <Text className="text-sm text-white font-montserrat-semibold px-4 py-3 text-center">
                {item.name}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
