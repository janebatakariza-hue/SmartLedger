import { useRouter } from "expo-router";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { BLACK, GRAY_DARK, WHITE } from "../context/theme";

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: BLACK,
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 80,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={BLACK} />
      {/* Background overlay - use a dark image here */}
      <View
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 42,
            fontWeight: "900",
            color: WHITE,
            letterSpacing: 6,
            textAlign: "center",
            lineHeight: 52,
          }}
        >
          {"SMARTLEDGER\nCLOUD"}
        </Text>
        <Text
          style={{
            color: WHITE,
            fontStyle: "italic",
            marginTop: 16,
            fontSize: 14,
          }}
        >
          Your Business, Always Visible
        </Text>
        <Text style={{ color: GRAY_DARK, fontSize: 11, marginTop: 8 }}>
          EST. 2024 • KIGALI
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.replace("/login")}
        style={{
          borderWidth: 1.5,
          borderColor: WHITE,
          paddingVertical: 16,
          borderRadius: 4,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: WHITE,
            fontWeight: "700",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          GET STARTED →
        </Text>
      </TouchableOpacity>
    </View>
  );
}
