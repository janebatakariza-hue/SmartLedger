import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MiniBarChart } from "../../context/components";
import {
  BLACK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MID,
  WHITE,
} from "../../context/theme";

type Debt = {
  id: string;
  initials: string;
  name: string;
  amount: number;
  sub: string;
};

const INITIAL_DEBTS: Debt[] = [
  {
    id: "d1",
    initials: "NK",
    name: "Ntwari K.",
    amount: 85000,
    sub: "Overdue by 3 days",
  },
  {
    id: "d2",
    initials: "MM",
    name: "Mutesi M.",
    amount: 240000,
    sub: "Due in 10 days",
  },
  {
    id: "d3",
    initials: "GI",
    name: "Gisa Investments",
    amount: 1200000,
    sub: "Partial paid (50%)",
  },
];

export default function DebtTrackerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [clientDebts, setClientDebts] = useState<Debt[]>(INITIAL_DEBTS);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newNote, setNewNote] = useState("");

  const handleAdd = () => {
    if (!newName.trim() || !newAmount.trim()) return;
    const initials = newName
      .trim()
      .split(" ")
      .map((w: string) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    setClientDebts((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        initials,
        name: newName.trim(),
        amount: parseInt(newAmount.replace(/\D/g, "")) || 0,
        sub: newNote.trim() || "Added today",
      },
    ]);
    setNewName("");
    setNewAmount("");
    setNewNote("");
    setShowModal(false);
  };

  const SCORE_DATA = [40, 48, 45, 55, 60, 58, 65];

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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
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
          Liability Overview
        </Text>
        <Text style={{ fontSize: 28, fontWeight: "900", color: BLACK }}>
          Debt Tracker
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Summary */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: GRAY_LIGHT,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: GRAY_MID,
            }}
          >
            <Text style={{ fontSize: 11, color: GRAY_DARK }}>Owed to You</Text>
            <Text style={{ fontSize: 26, fontWeight: "900", color: BLACK }}>
              2.4M
            </Text>
            <Text style={{ fontSize: 11, color: GRAY_DARK }}>
              RWF • 12 Clients
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: BLACK,
              borderRadius: 12,
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
              You Owe
            </Text>
            <Text style={{ fontSize: 26, fontWeight: "900", color: WHITE }}>
              5.8M
            </Text>
            <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
              RWF • 3 Banks
            </Text>
          </View>
        </View>

        {/* Upcoming due */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Text style={{ fontWeight: "700", color: BLACK, fontSize: 16 }}>
            Upcoming Due
          </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 12, color: BLACK, fontWeight: "600" }}>
              View Calendar
            </Text>
          </TouchableOpacity>
        </View>
        {[
          { label: "DUE TOMORROW", name: "BK Business Loan", amount: "450k" },
          {
            label: "DUE IN 9 DAYS",
            name: "Musa K. (Owed to You)",
            amount: "120k",
          },
        ].map((d) => (
          <View
            key={d.name}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 14,
              borderWidth: 1,
              borderColor: GRAY_MID,
              borderRadius: 12,
              marginBottom: 8,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 10, fontWeight: "700", color: GRAY_DARK }}
              >
                {d.label}
              </Text>
              <Text style={{ fontWeight: "700", color: BLACK, marginTop: 2 }}>
                {d.name}
              </Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: "900", color: BLACK }}>
              {d.amount}
            </Text>
          </View>
        ))}

        {/* Loans */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontWeight: "700", color: BLACK, fontSize: 16 }}>
            Your Loans
          </Text>
          <TouchableOpacity
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: BLACK,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="add" size={18} color={WHITE} />
          </TouchableOpacity>
        </View>
        {[
          { source: "Bank of Kigali", balance: "4.2M", sub: "Term 48 Months" },
          { source: "Urwego Finance", balance: "800k", sub: "Micro-loan" },
        ].map((l) => (
          <View
            key={l.source}
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
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700", color: BLACK }}>
                {l.source}
              </Text>
              <Text style={{ fontSize: 11, color: GRAY_DARK }}>{l.sub}</Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "900",
                color: BLACK,
                marginRight: 8,
              }}
            >
              {l.balance}
            </Text>
            <MaterialIcons name="chevron-right" size={20} color={GRAY_DARK} />
          </View>
        ))}

        {/* Customer debts */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 12,
          }}
        >
          <View>
            <Text style={{ fontWeight: "700", color: BLACK, fontSize: 16 }}>
              Customer Debts
            </Text>
            <Text style={{ fontSize: 11, color: GRAY_DARK }}>
              Pending payments from clients
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: BLACK,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="add" size={18} color={WHITE} />
          </TouchableOpacity>
        </View>
        {clientDebts.map((d) => (
          <View
            key={d.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 14,
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
                backgroundColor: BLACK,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Text style={{ color: WHITE, fontWeight: "700", fontSize: 12 }}>
                {d.initials}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700", color: BLACK }}>{d.name}</Text>
              <Text style={{ fontSize: 11, color: GRAY_DARK }}>{d.sub}</Text>
            </View>
            <Text style={{ fontWeight: "700", color: BLACK }}>
              {d.amount.toLocaleString()}
            </Text>
          </View>
        ))}
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            borderWidth: 1,
            borderColor: GRAY_MID,
            borderRadius: 10,
            paddingVertical: 12,
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <Text style={{ color: BLACK, fontWeight: "600" }}>
            + ADD CLIENT DEBT
          </Text>
        </TouchableOpacity>

        {/* Health score chart */}
        <View
          style={{
            marginTop: 20,
            borderWidth: 1,
            borderColor: GRAY_MID,
            borderRadius: 12,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              color: BLACK,
              fontSize: 15,
              marginBottom: 4,
            }}
          >
            Health Score
          </Text>
          <Text style={{ fontSize: 11, color: GRAY_DARK, marginBottom: 12 }}>
            Your debt-to-income ratio is currently 24% lower than last quarter.
          </Text>
          <MiniBarChart data={SCORE_DATA} activeIndex={4} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            {["Oct", "Nov", "Dec", "Jan", "CURRENT", "Mar", "Apr"].map(
              (l, i) => (
                <Text
                  key={l}
                  style={{
                    fontSize: 9,
                    color: i === 4 ? BLACK : GRAY_DARK,
                    fontWeight: i === 4 ? "700" : "400",
                  }}
                >
                  {l}
                </Text>
              ),
            )}
          </View>
        </View>
      </ScrollView>

      {/* Add Debt Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowModal(false)}
      >
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
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "900", color: BLACK }}>
              Add Client Debt
            </Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <MaterialIcons name="close" size={24} color={BLACK} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            {[
              {
                label: "Client Name",
                value: newName,
                set: setNewName,
                placeholder: "e.g. Jean Bosco N.",
                keyboard: "default" as const,
              },
              {
                label: "Amount (RWF)",
                value: newAmount,
                set: setNewAmount,
                placeholder: "0",
                keyboard: "numeric" as const,
              },
              {
                label: "Note (optional)",
                value: newNote,
                set: setNewNote,
                placeholder: "e.g. Due in 10 days",
                keyboard: "default" as const,
              },
            ].map((f) => (
              <View key={f.label} style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "600",
                    color: GRAY_DARK,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    marginBottom: 6,
                  }}
                >
                  {f.label}
                </Text>
                <TextInput
                  value={f.value}
                  onChangeText={f.set}
                  placeholder={f.placeholder}
                  keyboardType={f.keyboard}
                  style={{
                    borderWidth: 1.5,
                    borderColor: GRAY_MID,
                    borderRadius: 10,
                    padding: 14,
                    fontSize: 15,
                    color: BLACK,
                    backgroundColor: GRAY_LIGHT,
                  }}
                  placeholderTextColor={GRAY_DARK}
                />
              </View>
            ))}
            <TouchableOpacity
              onPress={handleAdd}
              style={{
                backgroundColor: BLACK,
                borderRadius: 10,
                paddingVertical: 16,
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Text style={{ color: WHITE, fontWeight: "700", fontSize: 15 }}>
                Add Debt
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
