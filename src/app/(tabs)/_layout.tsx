import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BLACK,
  GRAY_DARK,
  GRAY_MID,
  TAB_MENU_HEIGHT,
  WHITE,
} from "../context/AppContext";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          height:
            Platform.OS === "web"
              ? TAB_MENU_HEIGHT
              : TAB_MENU_HEIGHT + insets.bottom,
          borderTopWidth: 1,
          borderTopColor: GRAY_MID,
          backgroundColor: WHITE,
        },
        tabBarActiveTintColor: BLACK,
        tabBarInactiveTintColor: GRAY_DARK,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="grid-view" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          tabBarLabel: "Record",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="add-circle-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          tabBarLabel: "Inventory",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="inventory-2" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="passport"
        options={{
          tabBarLabel: "Passport",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="badge" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
