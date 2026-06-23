import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { BLACK, WHITE, GRAY_LIGHT, GRAY_MID, GRAY_DARK } from "../../context/theme";

const SEED_CUSTOMERS = [
  { id: "c1", name: "Jean Bosco N.", phone: "+250 788 000 000", tier: "Tier 1 Merchant", total_credit: 450000, current_debt: 24500, overdue: true, last: "2h ago" },
  { id: "c2", name: "Marie Claire U.", phone: "", tier: "", total_credit: 0, current_debt: 0, overdue: false, last: "Yesterday" },
  { id: "c3", name: "Emmanuel K.", phone: "", tier: "", total_credit: 0, current_debt: 112000, overdue: false, last: "3 days ago" },
  { id: "c4", name: "Divine R.", phone: "", tier: "", total_credit: 0, current_debt: 5200, overdue: false, last: "Oct 12" },
];

export default function CustomersScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState(SEED_CUSTOMERS[0]);
  const [search, setSearch] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      <View style={{ paddingTop: 56, paddingHorizontal: 20, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: GRAY_MID }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "900", color: BLACK }}>Customers</Text>
          <Text style={{ fontSize: 12, color: GRAY_DARK }}>32 TOTAL</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: GRAY_LIGHT, borderRadius: 10, paddingHorizontal: 12, marginTop: 12, borderWidth: 1, borderColor: GRAY_MID }}>
          <MaterialIcons name="search" size={18} color={GRAY_DARK} />
          <TextInput placeholder="Search by name..." value={search} onChangeText={setSearch} style={{ flex: 1, paddingVertical: 10, paddingLeft: 8 }} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {SEED_CUSTOMERS.map((c) => (
          <TouchableOpacity key={c.id} onPress={() => setSelected(c)} style={{ flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 12, marginBottom: 2, backgroundColor: selected.id === c.id ? BLACK : WHITE, borderWidth: selected.id === c.id ? 0 : 1, borderColor: GRAY_MID }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700", color: selected.id === c.id ? WHITE : BLACK }}>{c.name}</Text>
              <Text style={{ fontSize: 11, color: selected.id === c.id ? "rgba(255,255,255,0.6)" : GRAY_DARK }}>Last transaction: {c.last}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontWeight: "700", color: selected.id === c.id ? WHITE : BLACK }}>{c.current_debt > 0 ? `${c.current_debt.toLocaleString()} RWF` : "0 RWF"}</Text>
              {c.overdue && <View style={{ backgroundColor: selected.id === c.id ? WHITE : BLACK, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, marginTop: 2 }}>
                <Text style={{ fontSize: 9, fontWeight: "700", color: selected.id === c.id ? BLACK : WHITE }}>OVERDUE</Text>
              </View>}
            </View>
          </TouchableOpacity>
        ))}

        {/* Selected customer detail */}
        {selected && (
          <View style={{ marginTop: 16, borderWidth: 1.5, borderColor: BLACK, borderRadius: 14, padding: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: "900", color: BLACK }}>{selected.name}</Text>
                <Text style={{ color: GRAY_DARK, fontSize: 12 }}>{selected.phone}</Text>
                <Text style={{ color: GRAY_DARK, fontSize: 12 }}>{selected.tier}</Text>
              </View>
              <MaterialIcons name="edit" size={20} color={BLACK} />
            </View>
            <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
              <View style={{ flex: 1, backgroundColor: GRAY_LIGHT, borderRadius: 10, padding: 14, borderWidth: 1, borderColor: GRAY_MID }}>
                <Text style={{ fontSize: 11, color: GRAY_DARK }}>Total Credit</Text>
                <Text style={{ fontSize: 18, fontWeight: "900", color: BLACK }}>{selected.total_credit.toLocaleString()}{"\n"}RWF</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: GRAY_LIGHT, borderRadius: 10, padding: 14, borderWidth: 1, borderColor: GRAY_MID }}>
                <Text style={{ fontSize: 11, color: GRAY_DARK }}>Current Debt</Text>
                <Text style={{ fontSize: 18, fontWeight: "900", color: BLACK }}>{selected.current_debt.toLocaleString()}{"\n"}RWF</Text>
              </View>
            </View>
            <TouchableOpacity style={{ backgroundColor: BLACK, borderRadius: 10, paddingVertical: 14, alignItems: "center" }}>
              <Text style={{ color: WHITE, fontWeight: "700" }}>Record Payment</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}