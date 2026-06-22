import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BLACK,
  EXPENSE_CATEGORIES,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MID,
  SCROLL_EXTRA_PADDING,
  TAB_MENU_HEIGHT,
  useApp,
  WEB_TAB_MENU_PADDING,
  WHITE,
} from "../context/AppContext";

export default function RecordScreen() {
  const app = useApp();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"sale" | "expense">("sale");
  const [selectedProductId, setSelectedProductId] = useState(
    app.inventory[0]?.id || "",
  );
  const [qty, setQty] = useState(1);
  const [selectedCat, setSelectedCat] = useState(EXPENSE_CATEGORIES[0]);
  const [amt, setAmt] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollBottomPadding =
    Platform.OS === "web"
      ? WEB_TAB_MENU_PADDING
      : TAB_MENU_HEIGHT + insets.bottom + SCROLL_EXTRA_PADDING;
  const selectedProduct =
    app.inventory.find((i) => i.id === selectedProductId) || app.inventory[0];
  const calcTotal = selectedProduct ? selectedProduct.unit_price * qty : 0;

  const saveSale = () => {
    if (!selectedProduct || qty < 1) return;
    if (selectedProduct.quantity_on_hand < qty) {
      Platform.OS === "web"
        ? window.alert("Not enough stock")
        : Alert.alert("Error", "Not enough stock");
      return;
    }
    setLoading(true);
    const newQty = selectedProduct.quantity_on_hand - qty;
    app.setInventory((prev) =>
      prev.map((item) =>
        item.id === selectedProduct.id
          ? {
              ...item,
              quantity_on_hand: newQty,
              is_low_stock: newQty <= item.low_stock_threshold,
            }
          : item,
      ),
    );
    app.setExtraRevenue((prev) => prev + calcTotal);
    setTimeout(() => {
      setLoading(false);
      setQty(1);
      app.showToast("Sale recorded! Inventory updated.");
      router.push("/(tabs)/dashboard");
    }, 500);
  };

  const saveExpense = () => {
    const parsed = parseInt(amt, 10);
    if (!amt || isNaN(parsed) || parsed <= 0) {
      Platform.OS === "web"
        ? window.alert("Enter a valid amount")
        : Alert.alert("Error", "Enter a valid amount");
      return;
    }
    setLoading(true);
    app.setExtraExpenses((prev) => prev + parsed);
    setTimeout(() => {
      setLoading(false);
      setAmt("");
      app.showToast("Expense saved successfully!");
      router.push("/(tabs)/dashboard");
    }, 500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      {/* Header & Tabs */}
      <View
        style={{
          backgroundColor: WHITE,
          paddingTop: insets.top + 14,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: GRAY_MID,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "900",
            color: BLACK,
            marginBottom: 16,
          }}
        >
          Record Transaction
        </Text>
        <View style={{ flexDirection: "row", marginBottom: -1 }}>
          {(["sale", "expense"] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                flex: 1,
                paddingVertical: 12,
                alignItems: "center",
                backgroundColor: activeTab === tab ? BLACK : WHITE,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderWidth: 1,
                borderBottomWidth: activeTab === tab ? 0 : 1,
                borderColor: activeTab === tab ? BLACK : GRAY_MID,
                marginRight: tab === "sale" ? 4 : 0,
                marginLeft: tab === "expense" ? 4 : 0,
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  color: activeTab === tab ? WHITE : BLACK,
                  fontSize: 13,
                }}
              >
                {tab === "sale" ? app.t.record_sale : app.t.record_expense}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: scrollBottomPadding,
        }}
      >
        {activeTab === "sale" ? (
          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: GRAY_DARK,
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {app.t.product}
            </Text>
            <View
              style={{
                borderWidth: 1.5,
                borderColor: GRAY_MID,
                borderRadius: 10,
                marginBottom: 16,
                backgroundColor: GRAY_LIGHT,
              }}
            >
              {app.inventory.map((item) => {
                const isSel = item.id === selectedProductId;
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => setSelectedProductId(item.id)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 14,
                      backgroundColor: isSel ? BLACK : "transparent",
                      borderRadius: 8,
                      margin: 4,
                    }}
                  >
                    <View
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 9,
                        borderWidth: 2,
                        borderColor: isSel ? WHITE : GRAY_DARK,
                        backgroundColor: isSel ? WHITE : "transparent",
                        marginRight: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isSel && (
                        <View
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: BLACK,
                          }}
                        />
                      )}
                    </View>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 14,
                        fontWeight: "600",
                        color: isSel ? WHITE : BLACK,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: isSel ? "rgba(255,255,255,0.7)" : GRAY_DARK,
                      }}
                    >
                      {item.unit_price.toLocaleString()} RWF
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: GRAY_DARK,
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {app.t.quantity}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => qty > 1 && setQty(qty - 1)}
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: GRAY_LIGHT,
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: GRAY_MID,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons name="remove" size={20} color={BLACK} />
              </TouchableOpacity>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ fontSize: 24, fontWeight: "900", color: BLACK }}>
                  {qty}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setQty(qty + 1)}
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: BLACK,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons name="add" size={20} color={WHITE} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: GRAY_LIGHT,
                borderRadius: 10,
                padding: 16,
                marginBottom: 24,
                borderWidth: 1,
                borderColor: GRAY_MID,
              }}
            >
              <Text
                style={{ fontSize: 12, color: GRAY_DARK, fontWeight: "500" }}
              >
                {app.t.total}
              </Text>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "900",
                  color: BLACK,
                  marginTop: 4,
                }}
              >
                {calcTotal.toLocaleString()} RWF
              </Text>
            </View>

            <TouchableOpacity
              onPress={saveSale}
              disabled={loading}
              style={{
                backgroundColor: loading ? GRAY_MID : BLACK,
                borderRadius: 10,
                paddingVertical: 16,
                alignItems: "center",
              }}
            >
              <Text style={{ color: WHITE, fontSize: 15, fontWeight: "700" }}>
                {loading ? "Saving..." : app.t.save_sale}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: GRAY_DARK,
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {app.t.category}
            </Text>
            <View
              style={{
                borderWidth: 1.5,
                borderColor: GRAY_MID,
                borderRadius: 10,
                marginBottom: 16,
                backgroundColor: GRAY_LIGHT,
              }}
            >
              {EXPENSE_CATEGORIES.map((cat) => {
                const isSel = selectedCat === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setSelectedCat(cat)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 14,
                      backgroundColor: isSel ? BLACK : "transparent",
                      borderRadius: 8,
                      margin: 4,
                    }}
                  >
                    <View
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 9,
                        borderWidth: 2,
                        borderColor: isSel ? WHITE : GRAY_DARK,
                        backgroundColor: isSel ? WHITE : "transparent",
                        marginRight: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isSel && (
                        <View
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: BLACK,
                          }}
                        />
                      )}
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: isSel ? WHITE : BLACK,
                      }}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: GRAY_DARK,
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {app.t.amount}
            </Text>
            <TextInput
              value={amt}
              onChangeText={(t) => setAmt(t.replace(/[^0-9]/g, ""))}
              placeholder="0"
              keyboardType="numeric"
              style={{
                borderWidth: 1.5,
                borderColor: GRAY_MID,
                borderRadius: 10,
                padding: 14,
                fontSize: 20,
                fontWeight: "700",
                color: BLACK,
                backgroundColor: GRAY_LIGHT,
                marginBottom: 24,
              }}
            />

            <TouchableOpacity
              onPress={saveExpense}
              disabled={loading}
              style={{
                backgroundColor: loading ? GRAY_MID : BLACK,
                borderRadius: 10,
                paddingVertical: 16,
                alignItems: "center",
              }}
            >
              <Text style={{ color: WHITE, fontSize: 15, fontWeight: "700" }}>
                {loading ? "Saving..." : app.t.save_expense}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
