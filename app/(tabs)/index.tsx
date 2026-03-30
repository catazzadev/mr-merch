import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Chapter, getChapters, getLogoUrl } from "@/lib/chapters";
import { useChapter } from "@/lib/ChapterContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ChaptersScreen() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedChapter } = useChapter();
  const router = useRouter();

  useEffect(() => {
    getChapters()
      .then(setChapters)
      .catch((err) => Alert.alert("Error", err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    router.navigate("/(tabs)/merch");
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-surface">
        <ActivityIndicator size="large" color="#FF007F" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-surface" showsVerticalScrollIndicator={false}>
      <View className="px-6 pt-16 pb-6">
        <Text className="text-6xl text-white font-bebas tracking-tight leading-none">
          SELECT YOUR
        </Text>
        <Text className="text-6xl font-bebas tracking-tight leading-none" style={{ color: "#FF007F" }}>
          CHAPTER
        </Text>
        <Text className="text-sm text-neutral-500 font-montserrat-medium mt-4 max-w-[280px]">
          Join the world's largest urban running crew. Select your city below.
        </Text>
      </View>

      <View className="px-6 pb-8 gap-4">
        {chapters.map((chapter, index) => (
          <Pressable
            key={chapter.id}
            onPress={() => handleSelect(chapter)}
            className="active:scale-[0.98]"
            style={{ transform: [{ scale: 1 }] }}
          >
            <View
              className="overflow-hidden rounded-2xl"
              style={{ height: index === 0 ? 320 : 200 }}
            >
              {chapter.logo_path ? (
                <Image
                  source={{ uri: getLogoUrl(chapter.logo_path) }}
                  className="absolute inset-0 w-full h-full opacity-60"
                  resizeMode="cover"
                />
              ) : (
                <View className="absolute inset-0 bg-surface-card" />
              )}
              <LinearGradient
                colors={["transparent", "rgba(14,14,14,0.9)", "rgba(14,14,14,1)"]}
                locations={[0, 0.7, 1]}
                className="absolute inset-0"
              />
              <View className="absolute bottom-0 left-0 p-6 w-full">
                {index === 0 && (
                  <View className="self-start px-3 py-1 rounded-full mb-3" style={{ backgroundColor: "#FF007F" }}>
                    <Text className="text-white text-[10px] font-montserrat-bold uppercase tracking-widest">
                      Active
                    </Text>
                  </View>
                )}
                <Text
                  className="font-bebas uppercase tracking-tight text-white"
                  style={{ fontSize: index === 0 ? 52 : 36 }}
                >
                  {chapter.name.replace("MR ", "")}
                </Text>
                {chapter.email && (
                  <Text className="text-xs font-montserrat text-neutral-500 uppercase tracking-widest mt-1">
                    {chapter.email}
                  </Text>
                )}
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
