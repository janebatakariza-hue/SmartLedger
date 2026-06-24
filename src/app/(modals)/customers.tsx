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
import type { Customer } from "../../context/AppContext";
import { SEED_CUSTOMERS } from "../../context/seed";
import {
  BLACK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MID,
  WHITE,
} from "../../context/theme";

export default function CustomersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = useMemo(
    () =>
      SEED_CUSTOMERS.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

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
            marginBottom: 14,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={BLACK} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "900", color: BLACK }}>
              Customers
            </Text>
            <Text style={{ fontSize: 12, color: GRAY_DARK }}>
              {SEED_CUSTOMERS.length} TOTAL
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: GRAY_LIGHT,
            borderRadius: 10,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: GRAY_MID,
          }}
        >
          <MaterialIcons name="search" size={18} color={GRAY_DARK} />
          <TextInput
            placeholder="Search by name..."
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
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        {filtered.length === 0 ? (
          <View style={{ alignItems: "center", paddingTop: 40 }}>
            <MaterialIcons name="person-search" size={48} color={GRAY_MID} />
            <Text style={{ color: GRAY_DARK, marginTop: 12 }}>
              No customers found
            </Text>
          </View>
        ) : (
          filtered.map((c) => (
            <TouchableOpacity
              key={c.id}
              onPress={() => setSelected(c)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 14,
                borderRadius: 12,
                marginBottom: 4,
                backgroundColor: WHITE,
                borderWidth: 1,
                borderColor: GRAY_MID,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: GRAY_LIGHT,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Text style={{ fontWeight: "700", color: BLACK, fontSize: 14 }}>
                  {c.name.charAt(0)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "700", color: BLACK }}>
                  {c.name}
                </Text>
                <Text style={{ fontSize: 11, color: GRAY_DARK }}>
                  Last transaction: {c.last_transaction}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontWeight: "700", color: BLACK }}>
                  {c.current_debt > 0
                    ? `${c.current_debt.toLocaleString()} RWF`
                    : "0 RWF"}
                </Text>
                {c.overdue && (
                  <View
                    style={{
                      backgroundColor: BLACK,
                      borderRadius: 4,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      marginTop: 2,
                    }}
                  >
                    <Text
                      style={{ fontSize: 9, fontWeight: "700", color: WHITE }}
                    >
                      OVERDUE
                    </Text>
                  </View>
                )}
              </View>
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
                Customer Detail
              </Text>
              <View style={{ flex: 1 }} />
              <MaterialIcons name="edit" size={20} color={BLACK} />
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
                    borderRadius: 28,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 14,
                  }}
                >
                  <Text
                    style={{ fontWeight: "900", color: BLACK, fontSize: 22 }}
                  >
                    {selected.name.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ fontSize: 20, fontWeight: "900", color: BLACK }}
                  >
                    {selected.name}
                  </Text>
                  <Text style={{ fontSize: 13, color: GRAY_DARK }}>
                    {selected.phone}
                  </Text>
                  {selected.tier ? (
                    <Text style={{ fontSize: 12, color: GRAY_DARK }}>
                      {selected.tier}
                    </Text>
                  ) : null}
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
                    Total Credit
                  </Text>
                  <Text
                    style={{ fontSize: 20, fontWeight: "900", color: BLACK }}
                  >
                    {selected.total_credit.toLocaleString()}
                    {"\n"}RWF
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
                    Current Debt
                  </Text>
                  <Text
                    style={{ fontSize: 20, fontWeight: "900", color: BLACK }}
                  >
                    {selected.current_debt.toLocaleString()}
                    {"\n"}RWF
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
                  <Text style={{ fontWeight: "700", color: BLACK }}>
                    {h.amount}
                  </Text>
                </View>
              ))}
              <TouchableOpacity
                style={{
                  backgroundColor: BLACK,
                  borderRadius: 10,
                  paddingVertical: 16,
                  alignItems: "center",
                  marginTop: 24,
                }}
              >
                <Text style={{ color: WHITE, fontWeight: "700", fontSize: 15 }}>
                  Record Payment
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
}
