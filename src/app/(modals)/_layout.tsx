import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "modal",
        animation: "slide_from_bottom",
      }}
    >
      <Stack.Screen name="add-product" />
      <Stack.Screen name="suppliers" />
      <Stack.Screen name="customers" />
      <Stack.Screen name="debt-tracker" />
      <Stack.Screen name="vault" />
    </Stack>
  );
}
