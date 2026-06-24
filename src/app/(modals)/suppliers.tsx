import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { Supplier } from "../../context/AppContext";
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
  const [selected, setSelected] = useState<Supplier | null>(null);

  const filtered = useMemo(() => {
    let list = SEED_SUPPLIERS.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()),
    );
    if (activeFilter === "Outstanding")
      list = list.filter((s) => s.payment_owed > 0);
    if (activeFilter === "Top Rated")
      list = list.filter((s) => s.is_top_vendor);
    return list;
  }, [search, activeFilter]);

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      <View
        style={{
          paddingTop: insets.top + 14,
          paddingHorizontal: 20,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: GRAY_MID,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={BLACK} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "900", color: BLACK }}>
            SmartLedger
          </Text>
        </View>

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
        <Text style={{ fontSize: 30, fontWeight: "900", color: BLACK }}>
          RWF 1,240,000
        </Text>
        <Text style={{ fontSize: 12, color: GRAY_DARK, marginTop: 2 }}>
          ↑ 4 suppliers with overdue balances
        </Text>

        <View style={{ flexDirection: "row", gap: 12, marginTop: 14 }}>
          {[
            ["Total Suppliers", "42"],
            ["Purchases (MO)", "RWF 8.2M"],
          ].map(([label, value]) => (
            <View
              key={label}
              style={{
                flex: 1,
                backgroundColor: GRAY_LIGHT,
                borderRadius: 10,
                padding: 12,
                borderWidth: 1,
                borderColor: GRAY_MID,
              }}
            >
              <Text style={{ fontSize: 11, color: GRAY_DARK }}>{label}</Text>
              <Text style={{ fontSize: 18, fontWeight: "900", color: BLACK }}>
                {value}
              </Text>
            </View>
          ))}
        </View>

        {/* Search */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: GRAY_LIGHT,
            borderRadius: 10,
            paddingHorizontal: 12,
            marginTop: 12,
            borderWidth: 1,
            borderColor: GRAY_MID,
          }}
        >
          <MaterialIcons name="search" size={18} color={GRAY_DARK} />
          <TextInput
            placeholder="Search suppliers..."
            value={search}
            onChangeText={setSearch}
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingLeft: 8,
              color: BLACK,
              fontSize: 14,
            }}
            placeholderTextColor={GRAY_DARK}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <MaterialIcons name="close" size={18} color={GRAY_DARK} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 12 }}
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
        {filtered.length === 0 ? (
          <View style={{ alignItems: "center", paddingTop: 40 }}>
            <MaterialIcons name="search-off" size={48} color={GRAY_MID} />
            <Text style={{ color: GRAY_DARK, marginTop: 12 }}>
              No suppliers found
            </Text>
          </View>
        ) : (
          filtered.map((supplier) => (
            <TouchableOpacity
              key={supplier.id}
              onPress={() => setSelected(supplier)}
              style={{
                backgroundColor: WHITE,
                borderRadius: 14,
                padding: 16,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: GRAY_MID,
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
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
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
                        style={{
                          fontSize: 15,
                          fontWeight: "700",
                          color: BLACK,
                        }}
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
                <MaterialIcons
                  name="chevron-right"
                  size={20}
                  color={GRAY_DARK}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: supplier.payment_owed > 0 ? 12 : 0,
                }}
              >
                <View>
                  <Text style={{ fontSize: 11, color: GRAY_DARK }}>
                    Payment Owed
                  </Text>
                  <Text
                    style={{ fontSize: 16, fontWeight: "900", color: BLACK }}
                  >
                    {supplier.payment_owed > 0
                      ? `RWF ${supplier.payment_owed.toLocaleString()}`
                      : "RWF 0"}
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontSize: 11, color: GRAY_DARK }}>
                    Last Purchase
                  </Text>
                  <Text
                    style={{ fontSize: 13, fontWeight: "600", color: BLACK }}
                  >
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
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: insets.bottom + 20,
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

      {/* Detail Modal */}
      <Modal
        visible={!!selected}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelected(null)}
      >
        {selected && (
          <View style={{ flex: 1, backgroundColor: WHITE }}>
            <View
              style={{
                paddingTop: 20,
                paddingHorizontal: 20,
                paddingBottom: 16,
                borderBottomWidth: 1,
                borderBottomColor: GRAY_MID,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
              }}
            >
              <TouchableOpacity onPress={() => setSelected(null)}>
                <MaterialIcons name="close" size={24} color={BLACK} />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: "900", color: BLACK }}>
                Supplier Detail
              </Text>
            </View>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: GRAY_LIGHT,
                    borderRadius: 14,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 14,
                    borderWidth: 1,
                    borderColor: GRAY_MID,
                  }}
                >
                  <MaterialIcons name="store" size={28} color={BLACK} />
                </View>
                <View>
                  <Text
                    style={{ fontSize: 18, fontWeight: "900", color: BLACK }}
                  >
                    {selected.name}
                  </Text>
                  <Text style={{ fontSize: 13, color: GRAY_DARK }}>
                    {selected.type}
                  </Text>
                  {selected.is_top_vendor && (
                    <View
                      style={{
                        backgroundColor: BLACK,
                        alignSelf: "flex-start",
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        borderRadius: 4,
                        marginTop: 4,
                      }}
                    >
                      <Text
                        style={{
                          color: WHITE,
                          fontSize: 10,
                          fontWeight: "700",
                        }}
                      >
                        TOP VENDOR
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
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
                    Payment Owed
                  </Text>
                  <Text
                    style={{ fontSize: 20, fontWeight: "900", color: BLACK }}
                  >
                    RWF {selected.payment_owed.toLocaleString()}
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
                  <Text style={{ fontSize: 11, color: GRAY_DARK }}>
                    Last Purchase
                  </Text>
                  <Text
                    style={{ fontSize: 16, fontWeight: "900", color: BLACK }}
                  >
                    {selected.last_purchase}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: BLACK,
                  marginBottom: 12,
                }}
              >
                Purchase History
              </Text>
              {[
                {
                  name: "Wholesale Maize (50kg)",
                  date: "Oct 24, 2023 • INV-0092",
                  amount: "18,000 RWF",
                },
                {
                  name: "Sugar Sacks (x2)",
                  date: "Oct 20, 2023 • INV-0081",
                  amount: "6,500 RWF",
                },
                {
                  name: "Partial Payment Received",
                  date: "Oct 15, 2023 • RCT-1022",
                  amount: "-10,000 RWF",
                },
              ].map((h) => (
                <View
                  key={h.name}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: GRAY_MID,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{ fontWeight: "600", color: BLACK, fontSize: 13 }}
                    >
                      {h.name}
                    </Text>
                    <Text style={{ fontSize: 11, color: GRAY_DARK }}>
                      {h.date}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontWeight: "700",
                      color: h.amount.startsWith("-") ? GRAY_DARK : BLACK,
                    }}
                  >
                    {h.amount}
                  </Text>
                </View>
              ))}
              {selected.payment_owed > 0 && (
                <TouchableOpacity
                  style={{
                    backgroundColor: BLACK,
                    borderRadius: 10,
                    paddingVertical: 16,
                    alignItems: "center",
                    marginTop: 24,
                  }}
                >
                  <Text
                    style={{ color: WHITE, fontWeight: "700", fontSize: 15 }}
                  >
                    Record Payment
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
}
