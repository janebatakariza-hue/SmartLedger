import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BLACK,
  GRAY_DARK,
  GRAY_MID,
  TAB_HEIGHT,
  WHITE,
} from "../../context/theme";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: TAB_HEIGHT + insets.bottom,
          borderTopWidth: 1,
          borderTopColor: GRAY_MID,
          backgroundColor: WHITE,
        },
        tabBarActiveTintColor: BLACK,
        tabBarInactiveTintColor: GRAY_DARK,
        tabBarLabelStyle: { fontSize: 10, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={22} color={color} />
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
        name="reports"
        options={{
          tabBarLabel: "Reports",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bar-chart" size={22} color={color} />
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
