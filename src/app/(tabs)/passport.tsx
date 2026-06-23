import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../../context/AppContext";
import { ProgressRing } from "../../context/components";
import {
  BLACK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MID,
  TAB_HEIGHT,
  WHITE,
} from "../../context/theme";

export default function PassportScreen() {
  const app = useApp();
  const insets = useSafeAreaInsets();
  const HEALTH_SCORE = 72;

  const factors = [
    {
      icon: "trending-up",
      label: "Revenue Consistency",
      sub: "75% Month-over-Month",
    },
    {
      icon: "account-balance",
      label: "Debt Discipline",
      sub: "Low exposure (<10%)",
    },
    {
      icon: "inventory-2",
      label: "Inventory Turnover",
      sub: "1.2x Industry Average",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      <View
        style={{
          paddingTop: insets.top + 14,
          paddingHorizontal: 20,
          paddingBottom: 14,
          borderBottomWidth: 1,
          borderBottomColor: GRAY_MID,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "900", color: BLACK }}>
          SmartLedger
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: TAB_HEIGHT + insets.bottom + 20,
        }}
      >
        {/* Health score */}
        <View style={{ alignItems: "center", paddingVertical: 32 }}>
          <ProgressRing score={HEALTH_SCORE} size={180} strokeWidth={18} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "900",
              color: BLACK,
              marginTop: 16,
            }}
          >
            Business Passport
          </Text>
          <Text style={{ fontSize: 12, color: GRAY_DARK, marginTop: 4 }}>
            Verified status: Tier 1 Reliability
          </Text>
        </View>

        {/* Key growth factors */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: "600",
              color: GRAY_DARK,
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 12,
            }}
          >
            Key Growth Factors
          </Text>
          {factors.map((f) => (
            <View
              key={f.label}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                borderWidth: 1,
                borderColor: GRAY_MID,
                borderRadius: 12,
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: GRAY_LIGHT,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <MaterialIcons name={f.icon as any} size={18} color={BLACK} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "700", color: BLACK, fontSize: 14 }}>
                  {f.label}
                </Text>
                <Text style={{ fontSize: 11, color: GRAY_DARK }}>{f.sub}</Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 4,
                  backgroundColor: BLACK,
                  borderRadius: 2,
                }}
              />
            </View>
          ))}
        </View>

        {/* Score Evolution chart placeholder */}
        <View
          style={{
            margin: 20,
            height: 80,
            backgroundColor: GRAY_LIGHT,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: GRAY_MID,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: GRAY_DARK, fontSize: 12 }}>
            Score evolution chart
          </Text>
        </View>

        {/* SmartLedger Elite banner */}
        <View
          style={{
            margin: 20,
            backgroundColor: GRAY_DARK,
            borderRadius: 14,
            padding: 20,
          }}
        >
          <Text style={{ color: WHITE, fontWeight: "900", fontSize: 16 }}>
            SmartLedger Elite
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            Exclusive for scores above 70
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
