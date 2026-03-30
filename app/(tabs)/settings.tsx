import { View, Text, Pressable } from "react-native";
import { useSession } from "@/lib/useSession";
import { signOut } from "@/lib/auth";
import { useChapter } from "@/lib/ChapterContext";

export default function SettingsScreen() {
  const { session } = useSession();
  const { selectedChapter, setSelectedChapter } = useChapter();

  return (
    <View className="flex-1 bg-surface px-6 pt-16">
      <Text className="text-6xl text-white font-bebas tracking-tight leading-none mb-8">
        SETTINGS
      </Text>

      <View className="rounded-2xl bg-surface-card border border-neutral-800 p-5 mb-4">
        <Text className="text-xs text-neutral-500 font-montserrat-semibold uppercase tracking-widest mb-1">
          Account
        </Text>
        <Text className="text-base text-white font-montserrat-medium">
          {session?.user.email}
        </Text>
      </View>

      {selectedChapter && (
        <View className="rounded-2xl bg-surface-card border border-neutral-800 p-5 mb-8">
          <Text className="text-xs text-neutral-500 font-montserrat-semibold uppercase tracking-widest mb-1">
            Active Chapter
          </Text>
          <Text className="text-base text-white font-montserrat-medium">
            {selectedChapter.name}
          </Text>
        </View>
      )}

      <View className="gap-3 mt-auto pb-12">
        {selectedChapter && (
          <Pressable
            onPress={() => setSelectedChapter(null)}
            className="h-14 rounded-xl border border-neutral-700 items-center justify-center active:bg-surface-card"
          >
            <Text className="text-white text-sm font-montserrat-semibold uppercase tracking-wider">
              Change Chapter
            </Text>
          </Pressable>
        )}
        <Pressable
          onPress={signOut}
          className="h-14 rounded-xl items-center justify-center active:opacity-80"
          style={{ backgroundColor: "#FF007F" }}
        >
          <Text className="text-white text-sm font-montserrat-semibold uppercase tracking-wider">
            Sign Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
