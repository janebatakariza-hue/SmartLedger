import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../../context/AppContext";
import { RevenueLineChart, Toast } from "../../context/components";
import {
  SEED_BASE_REVENUE,
  SEED_WEEKLY_REVENUE,
  SEED_WEEK_LABELS,
} from "../../context/seed";
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
  const todayRevenue = SEED_BASE_REVENUE + app.extraRevenue;
  const lowStockCount = app.inventory.filter((i) => i.is_low_stock).length;

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
          borderBottomWidth: 1,
          borderBottomColor: GRAY_MID,
        }}
      >
        <MaterialIcons name="menu" size={24} color={BLACK} />
        <Text style={{ fontSize: 18, fontWeight: "900", color: BLACK }}>
          SmartLedger
        </Text>
        <TouchableOpacity onPress={() => router.push("../../settings")}>
          <MaterialIcons name="account-circle" size={28} color={BLACK} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: TAB_HEIGHT + insets.bottom + 20,
        }}
      >
        {/* Greeting */}
        <Text
          style={{
            fontSize: 11,
            color: GRAY_DARK,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginTop: 16,
          }}
        >
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "900",
            color: BLACK,
            marginTop: 2,
          }}
        >
          {app.t.welcome}
          {"\n"}
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
            {app.t.revenue}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <Text style={{ fontSize: 32, fontWeight: "900", color: BLACK }}>
              RWF {todayRevenue.toLocaleString()}
            </Text>
            <View
              style={{
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
          <Text style={{ color: GRAY_DARK, fontSize: 12, marginTop: 4 }}>
            vs RWF 350,000 yesterday
          </Text>
        </View>

        {/* Stats row */}
        <View style={{ flexDirection: "row", marginTop: 12, gap: 8 }}>
          {[
            { label: "SALES", value: "42", sub: "Orders" },
            { label: "DEBTS", value: "12", sub: "Pending" },
            {
              label: "LOW STOCK",
              value: String(lowStockCount).padStart(2, "0"),
              sub: "",
            },
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
              <Text
                style={{ fontSize: 10, color: GRAY_DARK, fontWeight: "600" }}
              >
                {s.label}
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "900",
                  color: BLACK,
                  marginTop: 4,
                }}
              >
                {s.value}
              </Text>
              {s.sub ? (
                <Text style={{ fontSize: 10, color: GRAY_DARK }}>{s.sub}</Text>
              ) : null}
            </View>
          ))}
        </View>

        {/* 7-Day Trend with real chart */}
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
              marginBottom: 4,
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
          <RevenueLineChart
            data={SEED_WEEKLY_REVENUE}
            labels={SEED_WEEK_LABELS}
            height={100}
          />
        </View>

        {/* Quick actions */}
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

        {/* Quick nav links */}
        <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
          {[
            {
              label: "Suppliers",
              icon: "local-shipping",
              route: "/(modals)/suppliers",
            },
            {
              label: "Customers",
              icon: "people",
              route: "/(modals)/customers",
            },
            {
              label: "Debts",
              icon: "account-balance-wallet",
              route: "/(modals)/debt-tracker",
            },
            { label: "Vault", icon: "folder", route: "/(modals)/vault" },
          ].map((link) => (
            <TouchableOpacity
              key={link.label}
              onPress={() => router.push(link.route as any)}
              style={{
                flex: 1,
                backgroundColor: GRAY_LIGHT,
                borderRadius: 10,
                padding: 12,
                alignItems: "center",
                borderWidth: 1,
                borderColor: GRAY_MID,
              }}
            >
              <MaterialIcons name={link.icon as any} size={20} color={BLACK} />
              <Text
                style={{
                  fontSize: 10,
                  color: BLACK,
                  fontWeight: "600",
                  marginTop: 4,
                }}
              >
                {link.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Toast
        msg={app.toastMsg}
        bottomOffset={TAB_HEIGHT + insets.bottom + 16}
      />
    </View>
  );
}
