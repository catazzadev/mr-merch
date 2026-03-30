import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(14, 14, 14, 0.9)",
          borderTopWidth: 0,
          height: 80,
          paddingTop: 8,
          paddingBottom: 24,
        },
        tabBarActiveTintColor: "#FF007F",
        tabBarInactiveTintColor: "rgba(255,255,255,0.4)",
        tabBarLabelStyle: {
          fontFamily: "Montserrat_700Bold",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chapters",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="location-city" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="merch"
        options={{
          title: "Merch",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-bag" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
