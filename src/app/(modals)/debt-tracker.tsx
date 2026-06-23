import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BLACK, WHITE, GRAY_LIGHT, GRAY_MID, GRAY_DARK } from "../../context/theme";

export default function DebtTrackerScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      <View style={{ paddingTop: 56, paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: GRAY_MID }}>
        <Text style={{ fontSize: 11, color: GRAY_DARK, textTransform: "uppercase", letterSpacing: 1 }}>Liability Overview</Text>
        <Text style={{ fontSize: 28, fontWeight: "900", color: BLACK }}>Debt Tracker</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Summary row */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
          <View style={{ flex: 1, backgroundColor: GRAY_LIGHT, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: GRAY_MID }}>
            <Text style={{ fontSize: 11, color: GRAY_DARK }}>Owed to You</Text>
            <Text style={{ fontSize: 26, fontWeight: "900", color: BLACK }}>2.4M</Text>
            <Text style={{ fontSize: 11, color: GRAY_DARK }}>RWF • 12 Clients</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: BLACK, borderRadius: 12, padding: 16 }}>
            <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>You Owe</Text>
            <Text style={{ fontSize: 26, fontWeight: "900", color: WHITE }}>5.8M</Text>
            <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>RWF • 3 Banks</Text>
          </View>
        </View>

        {/* Upcoming due */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Text style={{ fontWeight: "700", color: BLACK }}>Upcoming Due</Text>
          <Text style={{ fontSize: 12, color: BLACK, fontWeight: "600" }}>View Calendar</Text>
        </View>
        {[
          { label: "DUE TOMORROW", name: "BK Business Loan", amount: "450k" },
          { label: "DUE IN 9 DAYS", name: "Musa K. (Owed to You)", amount: "120k" },
        ].map((d) => (
          <View key={d.name} style={{ flexDirection: "row", alignItems: "center", padding: 14, borderWidth: 1, borderColor: GRAY_MID, borderRadius: 12, marginBottom: 8 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontWeight: "700", color: GRAY_DARK }}>{d.label}</Text>
              <Text style={{ fontWeight: "700", color: BLACK, marginTop: 2 }}>{d.name}</Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: "900", color: BLACK }}>{d.amount}</Text>
          </View>
        ))}

        {/* Your loans */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16, marginBottom: 12 }}>
          <Text style={{ fontWeight: "700", color: BLACK, fontSize: 16 }}>Your Loans</Text>
          <TouchableOpacity style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: BLACK, alignItems: "center", justifyContent: "center" }}>
            <MaterialIcons name="add" size={18} color={WHITE} />
          </TouchableOpacity>
        </View>
        {[
          { source: "Bank of Kigali", balance: "4.2M", sub: "Term 48 Months" },
          { source: "Urwego Finance", balance: "800k", sub: "Micro-loan" },
        ].map((l) => (
          <View key={l.source} style={{ flexDirection: "row", alignItems: "center", padding: 16, borderWidth: 1, borderColor: GRAY_MID, borderRadius: 12, marginBottom: 8 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700", color: BLACK }}>{l.source}</Text>
              <Text style={{ fontSize: 11, color: GRAY_DARK }}>{l.sub}</Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: "900", color: BLACK }}>{l.balance}</Text>
            <MaterialIcons name="chevron-right" size={20} color={GRAY_DARK} style={{ marginLeft: 8 }} />
          </View>
        ))}

        {/* Customer debts */}
        <Text style={{ fontWeight: "700", color: BLACK, fontSize: 16, marginTop: 16, marginBottom: 12 }}>Customer Debts</Text>
        {[
          { initials: "NK", name: "Ntwari K.", amount: "85,000", sub: "Overdue by 3 days" },
          { initials: "MM", name: "Mutesi M.", amount: "240,000", sub: "Due in 10 days" },
          { initials: "GI", name: "Gisa Investments", amount: "1,200,000", sub: "Partial paid (50%)" },
        ].map((d) => (
          <View key={d.name} style={{ flexDirection: "row", alignItems: "center", padding: 14, borderWidth: 1, borderColor: GRAY_MID, borderRadius: 12, marginBottom: 8 }}>
            <View style={{ width: 36, height: 36, backgroundColor: BLACK, borderRadius: 18, alignItems: "center", justifyContent: "center", marginRight: 12 }}>
              <Text style={{ color: WHITE, fontWeight: "700", fontSize: 12 }}>{d.initials}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700", color: BLACK }}>{d.name}</Text>
              <Text style={{ fontSize: 11, color: GRAY_DARK }}>{d.sub}</Text>
            </View>
            <Text style={{ fontWeight: "700", color: BLACK }}>{d.amount}</Text>
          </View>
        ))}
        <TouchableOpacity style={{ borderWidth: 1, borderColor: GRAY_MID, borderRadius: 10, paddingVertical: 12, alignItems: "center", marginTop: 4 }}>
          <Text style={{ color: BLACK, fontWeight: "600" }}>+ ADD CLIENT DEBT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}