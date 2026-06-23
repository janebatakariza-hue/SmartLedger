import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BLACK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MID,
  TAB_HEIGHT,
  WHITE,
} from "../../context/theme";

type ReportTab = "analytics" | "aicoach";

export default function ReportsScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<ReportTab>("analytics");
  const [period, setPeriod] = useState("last30");

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 14,
          paddingHorizontal: 20,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: GRAY_MID,
        }}
      >
        <Text
          style={{
            fontSize: 11,
            color: GRAY_DARK,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Business Intelligence
        </Text>
        <Text style={{ fontSize: 26, fontWeight: "900", color: BLACK }}>
          Performance{"\n"}Analytics
        </Text>
        {/* Period toggles */}
        <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
          {[
            ["last30", "Last 30 Days"],
            ["quarterly", "Quarterly"],
            ["ytd", "Year-to-Date"],
          ].map(([id, label]) => (
            <TouchableOpacity
              key={id}
              onPress={() => setPeriod(id)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                backgroundColor: period === id ? BLACK : GRAY_LIGHT,
                borderWidth: 1,
                borderColor: period === id ? BLACK : GRAY_MID,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "700",
                  color: period === id ? WHITE : GRAY_DARK,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: TAB_HEIGHT + insets.bottom + 20,
        }}
      >
        {/* Total Revenue */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 13, color: GRAY_DARK }}>Total Revenue</Text>
          <Text style={{ fontSize: 40, fontWeight: "900", color: BLACK }}>
            RWF 4.2M
          </Text>
          {/* Line chart placeholder */}
          <View
            style={{
              height: 120,
              backgroundColor: GRAY_LIGHT,
              borderRadius: 12,
              marginTop: 12,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: GRAY_MID,
            }}
          >
            <Text style={{ color: GRAY_DARK, fontSize: 12 }}>
              Revenue line chart
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            {["Week 1", "Week 2", "Week 3", "Week 4"].map((w) => (
              <Text key={w} style={{ fontSize: 10, color: GRAY_DARK }}>
                {w}
              </Text>
            ))}
          </View>
        </View>

        {/* Expenses */}
        <Text style={{ fontSize: 13, color: GRAY_DARK }}>Expenses</Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "900",
            color: BLACK,
            marginBottom: 12,
          }}
        >
          RWF 1.8M
        </Text>
        <View
          style={{
            height: 90,
            backgroundColor: GRAY_LIGHT,
            borderRadius: 12,
            marginBottom: 16,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: GRAY_MID,
          }}
        >
          <Text style={{ color: GRAY_DARK, fontSize: 12 }}>
            Expense bar chart
          </Text>
        </View>

        {/* Growth card */}
        <View
          style={{
            backgroundColor: BLACK,
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 36, fontWeight: "900", color: WHITE }}>
            +24%
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            Compared to last month
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
              Projection
            </Text>
            <Text style={{ color: WHITE, fontWeight: "700" }}>RWF 2.4M</Text>
          </View>
        </View>

        {/* Inventory Analytics */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "900",
            color: BLACK,
            marginBottom: 14,
          }}
        >
          Inventory Analytics
        </Text>
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: GRAY_LIGHT,
              borderRadius: 12,
              padding: 14,
              borderWidth: 1,
              borderColor: GRAY_MID,
            }}
          >
            <Text style={{ fontSize: 11, color: GRAY_DARK }}>
              Turnover Rate
            </Text>
            <Text style={{ fontSize: 22, fontWeight: "900", color: BLACK }}>
              4.8x
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: GRAY_LIGHT,
              borderRadius: 12,
              padding: 14,
              borderWidth: 1,
              borderColor: GRAY_MID,
            }}
          >
            <Text style={{ fontSize: 11, color: GRAY_DARK }}>Days to Sell</Text>
            <Text style={{ fontSize: 22, fontWeight: "900", color: BLACK }}>
              12d
            </Text>
          </View>
        </View>

        {/* Growth Forecast */}
        <View
          style={{
            borderWidth: 1,
            borderColor: GRAY_MID,
            borderRadius: 12,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: BLACK,
              marginBottom: 4,
            }}
          >
            Growth Forecast
          </Text>
          <Text style={{ fontSize: 11, color: GRAY_DARK, marginBottom: 12 }}>
            Year-end revenue estimation
          </Text>
          <View
            style={{
              height: 6,
              backgroundColor: GRAY_MID,
              borderRadius: 3,
              overflow: "hidden",
              marginBottom: 8,
            }}
          >
            <View
              style={{
                width: "84%",
                height: "100%",
                backgroundColor: BLACK,
                borderRadius: 3,
              }}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 12, color: BLACK, fontWeight: "700" }}>
              RWF 10.8M Goal
            </Text>
            <Text style={{ fontSize: 12, color: GRAY_DARK }}>84% Progress</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
