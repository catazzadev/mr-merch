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
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-8 pt-20">
      <Text className="text-3xl font-bold text-gray-900 mb-2">
        Select your chapter
      </Text>
      <Text className="text-base text-gray-500 mb-8">
        Choose an MR chapter to continue
      </Text>

      <View className="flex-row flex-wrap gap-4">
        {chapters.map((chapter) => (
          <Pressable
            key={chapter.id}
            onPress={() => handleSelect(chapter)}
            className="w-40 rounded-2xl bg-gray-100 overflow-hidden active:opacity-80"
          >
            {chapter.logo_path && (
              <Image
                source={{ uri: getLogoUrl(chapter.logo_path) }}
                className="w-full aspect-square"
                resizeMode="cover"
              />
            )}
            <Text className="text-base font-semibold text-gray-900 px-3 py-3 text-center">
              {chapter.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
