import { MaterialIcons } from "@expo/vector-icons";
import { Platform, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BLACK,
  GRAY_DARK,
  GRAY_DEEP,
  GRAY_LIGHT,
  GRAY_MID,
  SCROLL_EXTRA_PADDING,
  TAB_MENU_HEIGHT,
  useApp,
  WEB_TAB_MENU_PADDING,
  WHITE,
} from "../context/AppContext";
import { ProgressRing } from "../context/components";

export default function PassportScreen() {
  const app = useApp();
  const insets = useSafeAreaInsets();
  const scrollBottomPadding =
    Platform.OS === "web"
      ? WEB_TAB_MENU_PADDING
      : TAB_MENU_HEIGHT + insets.bottom + SCROLL_EXTRA_PADDING;

  const lowStockItems = app.inventory.filter((i) => i.is_low_stock);
  const lowStockNames = lowStockItems.map((i) => i.name).join(", ");
  const aiTip =
    lowStockItems.length > 0
      ? `Your ${lowStockNames} ${lowStockItems.length === 1 ? "stock is" : "stocks are"} running low — consider restocking this week to avoid lost sales and keep your revenue steady.`
      : "Great job maintaining healthy stock levels! Focus on recording every sale to keep your Business Health Score growing.";

  const factors = [
    {
      icon: "trending-up",
      label: "Revenue Consistency",
      value: "Strong",
      pct: 85,
    },
    {
      icon: "account-balance-wallet",
      label: "Debt Discipline",
      value: "Good",
      pct: 72,
    },
    {
      icon: "inventory",
      label: "Inventory Turnover",
      value: lowStockItems.length > 0 ? "Improving" : "Strong",
      pct: lowStockItems.length > 0 ? 60 : 80,
    },
  ];
  const healthScore = Math.round(
    factors.reduce((s, f) => s + f.pct, 0) / factors.length,
  );

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      <View
        style={{
          backgroundColor: WHITE,
          paddingTop: insets.top + 14,
          paddingBottom: 14,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: GRAY_MID,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "900", color: BLACK }}>
          {app.t.passport_label}
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: scrollBottomPadding,
          paddingHorizontal: 16,
          paddingTop: 20,
        }}
      >
        {/* Health Score Ring */}
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: "600",
              color: GRAY_DARK,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {app.t.health_score}
          </Text>
          <ProgressRing score={healthScore} size={190} strokeWidth={18} />
          <Text
            style={{
              fontSize: 13,
              color: GRAY_DARK,
              marginTop: 12,
              textAlign: "center",
              maxWidth: 240,
            }}
          >
            Your score grows with every sale and consistent bookkeeping habit
          </Text>
        </View>

        {/* Score Breakdown */}
        <View
          style={{
            backgroundColor: GRAY_LIGHT,
            borderRadius: 14,
            padding: 20,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: GRAY_MID,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "700",
              color: BLACK,
              marginBottom: 14,
              letterSpacing: 0.3,
            }}
          >
            Score Breakdown
          </Text>
          {factors.map((f, i) => (
            <View
              key={f.label}
              style={{ marginBottom: i < factors.length - 1 ? 14 : 0 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: BLACK,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <MaterialIcons name={f.icon as any} size={16} color={WHITE} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 13, fontWeight: "600", color: BLACK }}
                  >
                    {f.label}
                  </Text>
                  <Text style={{ fontSize: 11, color: GRAY_DARK }}>
                    {f.value}
                  </Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: "800", color: BLACK }}>
                  {f.pct}%
                </Text>
              </View>
              <View
                style={{
                  height: 5,
                  backgroundColor: GRAY_MID,
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    width: `${f.pct}%`,
                    height: "100%",
                    backgroundColor: BLACK,
                    borderRadius: 3,
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* AI Coach */}
        <View
          style={{
            backgroundColor: WHITE,
            borderRadius: 14,
            padding: 20,
            marginBottom: 16,
            borderWidth: 1.5,
            borderColor: BLACK,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                backgroundColor: BLACK,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              <MaterialIcons name="chat" size={18} color={WHITE} />
            </View>
            <Text style={{ fontSize: 14, fontWeight: "800", color: BLACK }}>
              {app.t.ai_coach}
            </Text>
          </View>
          <View
            style={{ height: 1, backgroundColor: GRAY_MID, marginBottom: 12 }}
          />
          <Text
            style={{
              fontSize: 14,
              color: GRAY_DEEP,
              lineHeight: 22,
              fontStyle: "italic",
            }}
          >
            "{aiTip}"
          </Text>
        </View>

        {/* Passport Badge */}
        <View
          style={{
            borderWidth: 1.5,
            borderColor: BLACK,
            borderRadius: 12,
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              backgroundColor: BLACK,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 14,
            }}
          >
            <MaterialIcons name="verified" size={28} color={WHITE} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "800",
                color: BLACK,
                marginBottom: 2,
              }}
            >
              Digital Business Passport
            </Text>
            <Text style={{ fontSize: 11, color: GRAY_DARK, lineHeight: 16 }}>
              Growing with every sale you record.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
