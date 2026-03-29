import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Chapter, getChapters, getLogoUrl } from "@/lib/chapters";

export default function ChapterSelectScreen() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getChapters()
      .then(setChapters)
      .catch((err) => Alert.alert("Error", err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (chapter: Chapter) => {
    router.push({
      pathname: "/chapter/[id]",
      params: { id: chapter.id, name: chapter.name },
    });
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-surface">
        <ActivityIndicator size="large" color="#e91e8c" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface px-8 pt-20">
      <Text className="text-4xl text-white font-bebas tracking-wider mb-1">
        SELECT YOUR CHAPTER
      </Text>
      <Text className="text-base text-neutral-500 font-montserrat mb-8">
        Choose an MR chapter to continue
      </Text>

      <View className="flex-row flex-wrap gap-4">
        {chapters.map((chapter) => (
          <Pressable
            key={chapter.id}
            onPress={() => handleSelect(chapter)}
            className="w-40 rounded-2xl bg-surface-card overflow-hidden active:opacity-80 border border-neutral-800"
          >
            {chapter.logo_path && (
              <Image
                source={{ uri: getLogoUrl(chapter.logo_path) }}
                className="w-full aspect-square"
                resizeMode="cover"
              />
            )}
            <Text className="text-sm text-white font-montserrat-semibold px-3 py-3 text-center">
              {chapter.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
