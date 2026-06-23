import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../../context/AppContext";
import {
  BLACK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MID,
  TAB_HEIGHT,
  WHITE,
} from "../../context/theme";

export default function RecordScreen() {
  const app = useApp();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"sale" | "expense">("sale");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [expenseAmt, setExpenseAmt] = useState("");
  const [expenseCat, setExpenseCat] = useState("Supplies");
  const [note, setNote] = useState("");

  const runningTotal = app.inventory.reduce((sum, item) => {
    return sum + (quantities[item.id] || 0) * item.unit_price;
  }, 0);
  const itemsSelected = Object.values(quantities).filter((q) => q > 0).length;

  const EXPENSE_CATS = [
    { id: "supplies", label: "Supplies", icon: "shopping-bag" },
    { id: "rent", label: "Rent", icon: "home" },
    { id: "wages", label: "Wages", icon: "people" },
    { id: "utilities", label: "Utilities", icon: "bolt" },
    { id: "others", label: "Others", icon: "more-horiz" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 14,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: GRAY_MID,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "900", color: BLACK }}>
            {activeTab === "sale" ? "Record Sale" : "Record"}
          </Text>
          <MaterialIcons name="account-circle" size={28} color={BLACK} />
        </View>
        {/* Tabs */}
        <View style={{ flexDirection: "row", marginBottom: -1 }}>
          {(["sale", "expense"] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                flex: 1,
                paddingVertical: 12,
                alignItems: "center",
                borderBottomWidth: 2,
                borderBottomColor: activeTab === tab ? BLACK : "transparent",
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  color: activeTab === tab ? BLACK : GRAY_DARK,
                  fontSize: 14,
                }}
              >
                {tab === "sale" ? "Sale" : "Expense"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {activeTab === "sale" ? (
        <>
          <ScrollView
            contentContainerStyle={{ padding: 16, paddingBottom: 160 }}
          >
            <Text style={{ fontSize: 13, color: GRAY_DARK, marginBottom: 12 }}>
              Select items and adjust quantities to track daily revenue.
            </Text>
            {/* Search */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: GRAY_LIGHT,
                borderRadius: 10,
                paddingHorizontal: 12,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: GRAY_MID,
              }}
            >
              <MaterialIcons name="search" size={18} color={GRAY_DARK} />
              <TextInput
                placeholder="Search products..."
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  paddingLeft: 8,
                  color: BLACK,
                }}
              />
            </View>
            {/* Product list with qty controls */}
            {app.inventory.map((item) => {
              const qty = quantities[item.id] || 0;
              return (
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 14,
                    borderWidth: 1,
                    borderColor: GRAY_MID,
                    borderRadius: 12,
                    marginBottom: 8,
                    backgroundColor: qty > 0 ? GRAY_LIGHT : WHITE,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "700", color: BLACK }}>
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 11, color: GRAY_DARK }}>
                      1{item.sku?.includes("kg") ? "kg" : "pc"} • RWF{" "}
                      {item.unit_price.toLocaleString()}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        setQuantities((prev) => ({
                          ...prev,
                          [item.id]: Math.max(0, (prev[item.id] || 0) - 1),
                        }))
                      }
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: qty > 0 ? BLACK : GRAY_MID,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: WHITE,
                          fontWeight: "900",
                          fontSize: 18,
                          lineHeight: 20,
                        }}
                      >
                        −
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "900",
                        color: BLACK,
                        minWidth: 20,
                        textAlign: "center",
                      }}
                    >
                      {qty}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        setQuantities((prev) => ({
                          ...prev,
                          [item.id]: (prev[item.id] || 0) + 1,
                        }))
                      }
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: BLACK,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: WHITE,
                          fontWeight: "900",
                          fontSize: 18,
                          lineHeight: 20,
                        }}
                      >
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="e.g. Bulk discount applied.."
              style={{
                borderWidth: 1,
                borderColor: GRAY_MID,
                borderRadius: 10,
                padding: 14,
                color: BLACK,
                marginTop: 8,
              }}
            />
          </ScrollView>
          {/* Sticky footer */}
          <View
            style={{
              position: "absolute",
              bottom: TAB_HEIGHT + insets.bottom,
              left: 0,
              right: 0,
              backgroundColor: WHITE,
              borderTopWidth: 1,
              borderTopColor: GRAY_MID,
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text style={{ color: GRAY_DARK }}>RUNNING TOTAL</Text>
              <Text style={{ color: GRAY_DARK }}>
                {itemsSelected} ITEMS SELECTED
              </Text>
            </View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "900",
                color: BLACK,
                marginBottom: 12,
              }}
            >
              RWF {runningTotal.toLocaleString()}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: BLACK,
                borderRadius: 10,
                paddingVertical: 16,
                alignItems: "center",
              }}
            >
              <Text style={{ color: WHITE, fontWeight: "700", fontSize: 15 }}>
                💾 Save Sale
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 160 }}>
          {/* Amount */}
          <Text
            style={{
              fontSize: 11,
              fontWeight: "600",
              color: GRAY_DARK,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 8,
            }}
          >
            Amount (RWF)
          </Text>
          <TextInput
            value={expenseAmt}
            onChangeText={setExpenseAmt}
            placeholder="0"
            keyboardType="numeric"
            style={{
              fontSize: 48,
              fontWeight: "900",
              color: expenseAmt ? BLACK : GRAY_MID,
              marginBottom: 24,
              textAlign: "center",
            }}
          />

          {/* Categories */}
          <Text
            style={{
              fontSize: 11,
              fontWeight: "600",
              color: GRAY_DARK,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 12,
            }}
          >
            Category
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 20,
            }}
          >
            {EXPENSE_CATS.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setExpenseCat(cat.id)}
                style={{ alignItems: "center", width: 64 }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: expenseCat === cat.id ? BLACK : GRAY_LIGHT,
                    borderRadius: 14,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: expenseCat === cat.id ? BLACK : GRAY_MID,
                  }}
                >
                  <MaterialIcons
                    name={cat.icon as any}
                    size={24}
                    color={expenseCat === cat.id ? WHITE : BLACK}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    color: BLACK,
                    marginTop: 4,
                    fontWeight: "600",
                  }}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Notes */}
          <Text
            style={{
              fontSize: 11,
              fontWeight: "600",
              color: GRAY_DARK,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 8,
            }}
          >
            Notes
          </Text>
          <TextInput
            placeholder="Add a short description..."
            style={{
              borderWidth: 1,
              borderColor: GRAY_MID,
              borderRadius: 10,
              padding: 14,
              color: BLACK,
              marginBottom: 20,
            }}
          />

          <TouchableOpacity
            style={{
              backgroundColor: BLACK,
              borderRadius: 10,
              paddingVertical: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ color: WHITE, fontWeight: "700", fontSize: 15 }}>
              💾 Save Expense
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: GRAY_DARK,
              fontSize: 11,
              textAlign: "center",
              marginTop: 12,
            }}
          >
            Records are automatically synced to Ledger Cloud.
          </Text>
        </ScrollView>
      )}
    </View>
  );
}
