import { Stack } from "expo-router";
import { AppProvider } from "../context/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="template" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
        <Stack.Screen name="settings" options={{ presentation: "card" }} />
      </Stack>
    </AppProvider>
  );
}
