import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import { ActiveMerch } from "@/lib/merch";
import { getImageUrl } from "@/lib/chapters";

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function MerchOrderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<ActiveMerch | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    supabase
      .from("active_merch")
      .select("id, name, logo_path, chapter_id, price, description")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error) Alert.alert("Error", error.message);
        else setItem(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-surface">
        <ActivityIndicator size="large" color="#FF007F" />
      </View>
    );
  }

  if (!item) {
    return (
      <View className="flex-1 items-center justify-center bg-surface px-8">
        <Text className="text-2xl text-white font-bebas">Item not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Back button */}
        <View className="px-6 pt-14 pb-4">
          <Pressable onPress={() => router.back()} className="flex-row items-center gap-1">
            <MaterialIcons name="arrow-back" size={20} color="#FF007F" />
            <Text className="text-sm font-montserrat-semibold" style={{ color: "#FF007F" }}>
              Back
            </Text>
          </Pressable>
        </View>

        {/* Title */}
        <View className="px-6 mb-8">
          <Text className="text-5xl text-white font-bebas tracking-tight leading-none mb-2">
            ORDER YOUR GEAR
          </Text>
          <LinearGradient
            colors={["#FF70B8", "#FF007F"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ height: 4, width: 96, borderRadius: 2 }}
          />
        </View>

        {/* Product summary — asymmetric layout */}
        <View className="px-6 mb-8">
          <View className="flex-row">
            {/* Info left */}
            <View className="flex-1 pr-4 justify-end" style={{ backgroundColor: "#201f1f", padding: 20 }}>
              <Text className="text-3xl font-bebas uppercase leading-tight mb-2" style={{ color: "#FF007F" }}>
                {item.name}
              </Text>
              {item.description && (
                <Text className="text-xs font-montserrat text-neutral-500 leading-relaxed">
                  {item.description}
                </Text>
              )}
            </View>
            {/* Image right */}
            <View style={{ width: "42%", aspectRatio: 4 / 5, backgroundColor: "#1a1a1a" }}>
              {item.logo_path && (
                <Image
                  source={getImageUrl(item.logo_path)}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                  cachePolicy="disk"
                />
              )}
            </View>
          </View>
          {/* Price — horizontal under image, right aligned */}
          {item.price != null && (
            <View className="flex-row justify-end mt-3">
              <LinearGradient
                colors={["#FF70B8", "#FF007F"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingHorizontal: 16, paddingVertical: 8 }}
              >
                <Text className="text-xl text-white font-bebas tracking-wider">
                  &euro;{item.price.toFixed(2)}
                </Text>
              </LinearGradient>
            </View>
          )}
        </View>

        {/* Divider */}
        <View className="mx-6 h-[1px] bg-neutral-800 mb-8" />

        {/* Size + Gender selection */}
        <View className="px-6 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bebas tracking-wide uppercase text-white">
              Select Size
            </Text>
            {/* Gender toggle */}
            <View className="flex-row" style={{ borderWidth: 1, borderColor: "#484847" }}>
              <Pressable
                onPress={() => setGender("male")}
                className="px-4 py-2 items-center justify-center"
                style={{
                  backgroundColor: gender === "male" ? "#262626" : "transparent",
                  borderRightWidth: 1,
                  borderRightColor: "#484847",
                }}
              >
                <Text
                  className="text-sm font-bebas tracking-wider"
                  style={{ color: gender === "male" ? "#FF007F" : "#767575" }}
                >
                  MALE
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setGender("female")}
                className="px-4 py-2 items-center justify-center"
                style={{
                  backgroundColor: gender === "female" ? "#262626" : "transparent",
                }}
              >
                <Text
                  className="text-sm font-bebas tracking-wider"
                  style={{ color: gender === "female" ? "#FF007F" : "#767575" }}
                >
                  FEMALE
                </Text>
              </Pressable>
            </View>
          </View>
          <View className="flex-row gap-3">
            {SIZES.map((size) => (
              <Pressable
                key={size}
                onPress={() => setSelectedSize(size)}
                className="flex-1 py-4 items-center justify-center"
                style={{
                  borderWidth: selectedSize === size ? 2 : 1,
                  borderColor: selectedSize === size ? "#FF007F" : "#484847",
                  backgroundColor: selectedSize === size ? "#262626" : "transparent",
                }}
              >
                <Text
                  className="text-xl font-bebas"
                  style={{ color: selectedSize === size ? "#FF007F" : "#ffffff" }}
                >
                  {size}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Divider */}
        <View className="mx-6 h-[1px] bg-neutral-800 mb-8" />

        {/* Confirmation checkbox */}
        <View className="px-6 mb-8">
          <Pressable
            onPress={() => setConfirmed(!confirmed)}
            className="flex-row items-start gap-4"
          >
            <View
              className="w-6 h-6 rounded items-center justify-center"
              style={{
                borderWidth: 1,
                borderColor: confirmed ? "#FF007F" : "#484847",
                backgroundColor: confirmed ? "#FF007F" : "#131313",
              }}
            >
              {confirmed && (
                <MaterialIcons name="check" size={16} color="#fff" />
              )}
            </View>
            <Text className="flex-1 text-sm font-montserrat text-neutral-500 leading-relaxed">
              I have checked my Heylo checkins and I confirm I have the checkins required to get the merch. The crew will check that the requirements are met.
            </Text>
          </Pressable>
        </View>

        {/* Submit button */}
        <View className="px-6 pb-12">
          <Pressable
            onPress={() => {
              if (!selectedSize) {
                Alert.alert("Select a size", "Please choose a size before submitting.");
                return;
              }
              if (!confirmed) {
                Alert.alert("Confirm", "Please confirm the community requirements.");
                return;
              }
              Alert.alert("Request Submitted", "Your gear request has been sent!");
            }}
            className="w-full py-5 rounded-lg items-center active:scale-95"
            style={{ opacity: selectedSize && confirmed ? 1 : 0.5 }}
          >
            <LinearGradient
              colors={["#FF70B8", "#FF007F"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 8,
              }}
            />
            <Text className="text-2xl text-white font-bebas tracking-widest">
              SUBMIT REQUEST
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
