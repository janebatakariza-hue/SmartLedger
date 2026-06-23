import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../../context/AppContext";
import {
  BLACK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MID,
  TAB_HEIGHT,
  WHITE,
} from "../../context/theme";

export default function DashboardScreen() {
  const app = useApp();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 12,
          paddingHorizontal: 20,
          paddingBottom: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MaterialIcons name="menu" size={24} color={BLACK} />
        <Text style={{ fontSize: 18, fontWeight: "900", color: BLACK }}>
          SmartLedger
        </Text>
        <TouchableOpacity onPress={() => router.push("../settings")}>
          <MaterialIcons name="account-circle" size={28} color={BLACK} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: TAB_HEIGHT + insets.bottom + 20,
        }}
      >
        {/* Date + greeting */}
        <Text
          style={{
            fontSize: 11,
            color: GRAY_DARK,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Monday, 24 May 2024
        </Text>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "900",
            color: BLACK,
            marginTop: 2,
          }}
        >
          Good morning,{"\n"}
          {app.userName}
        </Text>

        {/* Revenue card */}
        <View
          style={{
            backgroundColor: GRAY_LIGHT,
            borderRadius: 16,
            padding: 20,
            marginTop: 20,
            borderWidth: 1,
            borderColor: GRAY_MID,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              color: GRAY_DARK,
              textTransform: "uppercase",
              letterSpacing: 0.8,
            }}
          >
            Today's Revenue
          </Text>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "900",
              color: BLACK,
              marginTop: 4,
            }}
          >
            RWF 458,200
          </Text>
          <Text style={{ color: GRAY_DARK, fontSize: 12, marginTop: 4 }}>
            vs RWF 350,000 yesterday
          </Text>
          <View
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              backgroundColor: BLACK,
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
          >
            <Text style={{ color: WHITE, fontSize: 12, fontWeight: "700" }}>
              72%
            </Text>
          </View>
        </View>

        {/* Stats row */}
        <View style={{ flexDirection: "row", marginTop: 12, gap: 8 }}>
          {[
            { label: "Sales", value: "42", sub: "Orders" },
            { label: "Debts", value: "12", sub: "Pending" },
            { label: "Low Stock", value: "08", sub: "", alert: true },
          ].map((s) => (
            <View
              key={s.label}
              style={{
                flex: 1,
                backgroundColor: GRAY_LIGHT,
                borderRadius: 12,
                padding: 14,
                borderWidth: 1,
                borderColor: GRAY_MID,
              }}
            >
              <Text style={{ fontSize: 11, color: GRAY_DARK }}>{s.label}</Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "900",
                  color: BLACK,
                  marginTop: 4,
                }}
              >
                {s.value}
              </Text>
              <Text style={{ fontSize: 10, color: GRAY_DARK }}>{s.sub}</Text>
            </View>
          ))}
        </View>

        {/* 7-Day Trend chart placeholder */}
        <View
          style={{
            backgroundColor: WHITE,
            borderRadius: 12,
            padding: 16,
            marginTop: 12,
            borderWidth: 1,
            borderColor: GRAY_MID,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "700", color: BLACK }}>7-Day Trend</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: BLACK,
                }}
              />
              <Text style={{ fontSize: 11, color: GRAY_DARK }}>Revenue</Text>
            </View>
          </View>
          {/* Replace with a real LineChart from victory-native or react-native-svg-charts */}
          <View
            style={{
              height: 100,
              backgroundColor: GRAY_LIGHT,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: GRAY_DARK, fontSize: 12 }}>
              Line chart goes here
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <Text key={d} style={{ fontSize: 10, color: GRAY_DARK }}>
                {d}
              </Text>
            ))}
          </View>
        </View>

        {/* Quick action buttons */}
        <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/record")}
            style={{
              flex: 1,
              backgroundColor: BLACK,
              borderRadius: 10,
              paddingVertical: 14,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <MaterialIcons name="add-circle-outline" size={18} color={WHITE} />
            <Text style={{ color: WHITE, fontWeight: "700" }}>New Sale</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/inventory")}
            style={{
              flex: 1,
              backgroundColor: WHITE,
              borderRadius: 10,
              paddingVertical: 14,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              borderWidth: 1.5,
              borderColor: BLACK,
            }}
          >
            <MaterialIcons name="inventory" size={18} color={BLACK} />
            <Text style={{ color: BLACK, fontWeight: "700" }}>Stock Count</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
