import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  BLACK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MID,
  WHITE,
} from "../context/theme";

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: WHITE,
        paddingHorizontal: 28,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "900",
          color: BLACK,
          marginBottom: 8,
        }}
      >
        SmartLedger
      </Text>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          color: BLACK,
          marginBottom: 4,
        }}
      >
        Welcome
      </Text>
      <Text style={{ color: GRAY_DARK, marginBottom: 32 }}>
        Enter your phone number to continue.
      </Text>

      <Text
        style={{
          fontSize: 11,
          fontWeight: "600",
          color: GRAY_DARK,
          marginBottom: 8,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        Mobile Number
      </Text>
      <View
        style={{
          flexDirection: "row",
          borderWidth: 1.5,
          borderColor: GRAY_MID,
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            paddingHorizontal: 14,
            paddingVertical: 14,
            backgroundColor: GRAY_LIGHT,
            borderRightWidth: 1,
            borderRightColor: GRAY_MID,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "700", color: BLACK }}>+250</Text>
        </View>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="000 000 000"
          keyboardType="phone-pad"
          style={{ flex: 1, paddingHorizontal: 14, fontSize: 16, color: BLACK }}
        />
      </View>

      <TouchableOpacity
        onPress={() => router.replace("/template")}
        style={{
          backgroundColor: BLACK,
          borderRadius: 10,
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: WHITE, fontWeight: "700", fontSize: 15 }}>
          Continue →
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          textAlign: "center",
          color: GRAY_DARK,
          fontSize: 11,
          marginTop: 20,
        }}
      >
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: GRAY_DARK,
          fontSize: 10,
          marginTop: 40,
          letterSpacing: 2,
        }}
      >
        — RADICAL CLARITY —
      </Text>
    </View>
  );
}
