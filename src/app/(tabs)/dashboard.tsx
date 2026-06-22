import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BLACK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MID,
  SCROLL_EXTRA_PADDING,
  SEED_BASE_EXPENSES,
  SEED_BASE_REVENUE,
  SEED_WEEKLY_REVENUE,
  SEED_WEEK_LABELS,
  TAB_MENU_HEIGHT,
  WEB_TAB_MENU_PADDING,
  WHITE,
  useApp,
} from "../context/AppContext";
import { BarChart, Toast } from "../context/components";

export default function DashboardScreen() {
  const app = useApp();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const todayRevenue = useMemo(
    () => SEED_BASE_REVENUE + app.extraRevenue,
    [app.extraRevenue],
  );
  const todayExpenses = useMemo(
    () => SEED_BASE_EXPENSES + app.extraExpenses,
    [app.extraExpenses],
  );
  const todayProfit = todayRevenue - todayExpenses;
  const weeklyRevenue = useMemo(() => {
    const arr = [...SEED_WEEKLY_REVENUE];
    arr[arr.length - 1] += app.extraRevenue;
    return arr;
  }, [app.extraRevenue]);
  const weeklyTotal = weeklyRevenue.reduce((s, v) => s + v, 0);
  const lowStockCount = app.inventory.filter((i) => i.is_low_stock).length;
  const scrollBottomPadding =
    Platform.OS === "web"
      ? WEB_TAB_MENU_PADDING
      : TAB_MENU_HEIGHT + insets.bottom + SCROLL_EXTRA_PADDING;
  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const fmt = (n: number) => n.toLocaleString() + " RWF";

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: WHITE,
          paddingTop: insets.top + 12,
          paddingBottom: 14,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: GRAY_MID,
        }}
      >
        <View>
          <Text style={{ fontSize: 17, fontWeight: "800", color: BLACK }}>
            {app.t.welcome}
          </Text>
          <Text style={{ fontSize: 11, color: GRAY_DARK, marginTop: 2 }}>
            {dateStr}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => app.setLang(app.lang === "en" ? "kin" : "en")}
          style={{
            flexDirection: "row",
            backgroundColor: GRAY_LIGHT,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: GRAY_MID,
            overflow: "hidden",
          }}
        >
          {["en", "kin"].map((l) => (
            <View
              key={l}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 5,
                backgroundColor: app.lang === l ? BLACK : "transparent",
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "700",
                  color: app.lang === l ? WHITE : GRAY_DARK,
                }}
              >
                {l.toUpperCase()}
              </Text>
            </View>
          ))}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: scrollBottomPadding,
          paddingHorizontal: 16,
        }}
      >
        {/* Revenue Card */}
        <View
          style={{
            backgroundColor: BLACK,
            borderRadius: 16,
            padding: 24,
            marginBottom: 14,
            shadowColor: BLACK,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.18,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.65)",
              fontWeight: "500",
              letterSpacing: 0.8,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            {app.t.revenue}
          </Text>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "900",
              color: WHITE,
              letterSpacing: -1,
            }}
          >
            {fmt(todayRevenue)}
          </Text>
          <View
            style={{
              height: 1,
              backgroundColor: "rgba(255,255,255,0.15)",
              marginVertical: 14,
            }}
          />
          <Text
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.65)",
              fontWeight: "500",
              letterSpacing: 0.8,
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            {app.t.profit}
          </Text>
          <Text style={{ fontSize: 22, fontWeight: "800", color: WHITE }}>
            {fmt(todayProfit)}
          </Text>
        </View>

        {/* Stats Row */}
        <View style={{ flexDirection: "row", marginBottom: 14, gap: 8 }}>
          {[
            {
              icon: "trending-up",
              value: fmt(weeklyTotal),
              label: app.t.weekly_sales,
            },
            {
              icon: "account-balance-wallet",
              value: "8,500 RWF",
              label: app.t.outstanding,
            },
            {
              icon: "inventory",
              value: String(lowStockCount),
              label: app.t.low_stock,
            },
          ].map((stat, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                backgroundColor: GRAY_LIGHT,
                borderRadius: 12,
                padding: 14,
                borderWidth: 1,
                borderColor: GRAY_MID,
              }}
            >
              <MaterialIcons name={stat.icon as any} size={18} color={BLACK} />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "800",
                  color: BLACK,
                  marginTop: 6,
                }}
              >
                {stat.value}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: GRAY_DARK,
                  marginTop: 2,
                  fontWeight: "500",
                }}
              >
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Chart */}
        <View
          style={{
            backgroundColor: WHITE,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: GRAY_MID,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: "700", color: BLACK }}>
              7-Day Revenue Trend
            </Text>
            <Text style={{ fontSize: 11, color: GRAY_DARK }}>Last 7 days</Text>
          </View>
          <BarChart data={weeklyRevenue} labels={SEED_WEEK_LABELS} />
        </View>

        {/* Quick Record Button */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/record")}
          style={{
            backgroundColor: BLACK,
            borderRadius: 10,
            paddingVertical: 14,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <MaterialIcons name="add-circle-outline" size={20} color={WHITE} />
          <Text style={{ color: WHITE, fontSize: 14, fontWeight: "700" }}>
            {app.t.record} Transaction
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Toast
        msg={app.toastMsg}
        bottomOffset={TAB_MENU_HEIGHT + insets.bottom + 16}
      />
    </View>
  );
}
