import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SEED_SUPPLIERS } from "../../context/seed";
import {
  BLACK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MID,
  WHITE,
} from "../../context/theme";

const FILTER_TABS = ["All Suppliers", "Outstanding", "Top Rated", "Archive"];

export default function SuppliersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState("All Suppliers");
  const [search, setSearch] = useState("");

  const filtered = SEED_SUPPLIERS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

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
        {/* Summary */}
        <Text
          style={{
            fontSize: 11,
            color: GRAY_DARK,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Total Accounts Payable
        </Text>
        <Text style={{ fontSize: 32, fontWeight: "900", color: BLACK }}>
          RWF 1,240,000
        </Text>
        <Text style={{ fontSize: 12, color: GRAY_DARK, marginTop: 2 }}>
          ↑ 4 suppliers with overdue balances
        </Text>

        {/* Stats */}
        <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: GRAY_LIGHT,
              borderRadius: 10,
              padding: 12,
              borderWidth: 1,
              borderColor: GRAY_MID,
            }}
          >
            <Text style={{ fontSize: 11, color: GRAY_DARK }}>
              Total Suppliers
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "900", color: BLACK }}>
              42
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: GRAY_LIGHT,
              borderRadius: 10,
              padding: 12,
              borderWidth: 1,
              borderColor: GRAY_MID,
            }}
          >
            <Text style={{ fontSize: 11, color: GRAY_DARK }}>
              Purchases (MO)
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "900", color: BLACK }}>
              RWF 8.2M
            </Text>
          </View>
        </View>

        {/* Filter tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 14 }}
        >
          {FILTER_TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveFilter(tab)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 7,
                borderRadius: 20,
                backgroundColor: activeFilter === tab ? BLACK : GRAY_LIGHT,
                borderWidth: 1,
                borderColor: activeFilter === tab ? BLACK : GRAY_MID,
                marginRight: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: activeFilter === tab ? WHITE : GRAY_DARK,
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        {filtered.map((supplier) => (
          <View
            key={supplier.id}
            style={{
              backgroundColor: WHITE,
              borderRadius: 14,
              padding: 16,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: GRAY_MID,
              shadowColor: BLACK,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: GRAY_LIGHT,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                    borderWidth: 1,
                    borderColor: GRAY_MID,
                  }}
                >
                  <MaterialIcons name="store" size={20} color={BLACK} />
                </View>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Text
                      style={{ fontSize: 15, fontWeight: "700", color: BLACK }}
                    >
                      {supplier.name}
                    </Text>
                    {supplier.is_top_vendor && (
                      <View
                        style={{
                          backgroundColor: BLACK,
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          borderRadius: 4,
                        }}
                      >
                        <Text
                          style={{
                            color: WHITE,
                            fontSize: 9,
                            fontWeight: "700",
                          }}
                        >
                          TOP VENDOR
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={{ fontSize: 12, color: GRAY_DARK, marginTop: 2 }}
                  >
                    {supplier.type}
                  </Text>
                </View>
              </View>
              <MaterialIcons name="more-vert" size={20} color={GRAY_DARK} />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <View>
                <Text style={{ fontSize: 11, color: GRAY_DARK }}>
                  Payment Owed
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "900", color: BLACK }}>
                  {supplier.payment_owed > 0
                    ? `RWF ${supplier.payment_owed.toLocaleString()}`
                    : "RWF 0"}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 11, color: GRAY_DARK }}>
                  Last Purchase
                </Text>
                <Text style={{ fontSize: 13, fontWeight: "600", color: BLACK }}>
                  {supplier.last_purchase}
                </Text>
              </View>
            </View>

            {supplier.payment_owed > 0 && (
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: BLACK,
                    borderRadius: 8,
                    paddingVertical: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: WHITE, fontWeight: "700", fontSize: 13 }}
                  >
                    Record Payment
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: GRAY_MID,
                    borderRadius: 8,
                    paddingVertical: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: BLACK, fontWeight: "600", fontSize: 13 }}
                  >
                    View Invoice
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 24,
          right: 20,
          width: 52,
          height: 52,
          backgroundColor: BLACK,
          borderRadius: 26,
          alignItems: "center",
          justifyContent: "center",
          elevation: 6,
        }}
      >
        <MaterialIcons name="add" size={28} color={WHITE} />
      </TouchableOpacity>
    </View>
  );
}
