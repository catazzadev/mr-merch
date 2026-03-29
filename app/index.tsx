import { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Chapter, getChapters } from "@/lib/chapters";

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
    router.push({ pathname: "/chapter/[id]", params: { id: chapter.id, name: chapter.name } });
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

      <View className="gap-3">
        {chapters.map((chapter) => (
          <Pressable
            key={chapter.id}
            onPress={() => handleSelect(chapter)}
            className="h-16 rounded-xl bg-gray-100 px-5 flex-row items-center justify-between active:bg-gray-200"
          >
            <View>
              <Text className="text-lg font-semibold text-gray-900">
                {chapter.name}
              </Text>
              {chapter.email && (
                <Text className="text-sm text-gray-500">{chapter.email}</Text>
              )}
            </View>
            <Text className="text-gray-400 text-xl">&rsaquo;</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
