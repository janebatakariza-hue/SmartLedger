import { useRouter } from "expo-router";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BLACK, WHITE } from "./context/AppContext";

export default function LandingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: BLACK }}>
      <StatusBar barStyle="light-content" backgroundColor={BLACK} />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.62)",
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: insets.top + 60,
          paddingBottom: insets.bottom + 40,
          paddingHorizontal: 32,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 38,
              fontWeight: "900",
              color: WHITE,
              letterSpacing: 4,
              textAlign: "center",
              lineHeight: 46,
              textTransform: "uppercase",
            }}
          >
            {"SMART\nLEDGER\nCLOUD"}
          </Text>
          <View
            style={{
              width: 120,
              height: 1,
              backgroundColor: WHITE,
              marginVertical: 20,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              color: WHITE,
              fontStyle: "italic",
              textAlign: "center",
              letterSpacing: 0.5,
            }}
          >
            "Your Business, Always Visible."
          </Text>
        </View>
        <View style={{ alignItems: "center", width: "100%" }}>
          <TouchableOpacity
            onPress={() => router.replace("/template")}
            style={{
              borderWidth: 1.5,
              borderColor: WHITE,
              paddingVertical: 15,
              paddingHorizontal: 48,
              borderRadius: 4,
              width: "100%",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: WHITE,
                fontSize: 15,
                fontWeight: "600",
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Continue as Demo User
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 10,
              letterSpacing: 0.8,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            AI-Powered Financial Operating System for MSMEs
          </Text>
        </View>
      </View>
    </View>
  );
}
