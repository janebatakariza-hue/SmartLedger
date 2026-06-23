import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

export default function InventoryScreen() {
  const app = useApp();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

  const filtered = app.inventory.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Empty state
  if (app.inventory.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: WHITE,
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
        }}
      >
        <MaterialIcons name="inventory-2" size={64} color={GRAY_MID} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "900",
            color: BLACK,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          No items in inventory
        </Text>
        <Text style={{ color: GRAY_DARK, textAlign: "center", marginTop: 8 }}>
          Start tracking your stock by adding your first product to the digital
          ledger.
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(modals)/add-product")}
          style={{
            backgroundColor: BLACK,
            borderRadius: 10,
            paddingVertical: 14,
            paddingHorizontal: 28,
            marginTop: 24,
          }}
        >
          <Text style={{ color: WHITE, fontWeight: "700" }}>
            Add First Product +
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 20, fontWeight: "900", color: BLACK }}>
              Inventory
            </Text>
            <Text style={{ fontSize: 12, color: GRAY_DARK }}>
              {app.inventory.length} Active Products
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/(modals)/add-product")}
            style={{
              backgroundColor: BLACK,
              borderRadius: 8,
              paddingHorizontal: 14,
              paddingVertical: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <MaterialIcons name="add" size={16} color={WHITE} />
            <Text style={{ color: WHITE, fontWeight: "700", fontSize: 13 }}>
              Add New
            </Text>
          </TouchableOpacity>
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
            placeholder="Search products..."
            value={search}
            onChangeText={setSearch}
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingLeft: 8,
              color: BLACK,
            }}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: TAB_HEIGHT + insets.bottom + 16,
        }}
      >
        {filtered.map((item) => (
          <View
            key={item.id}
            style={{
              backgroundColor: WHITE,
              borderRadius: 12,
              padding: 16,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: item.is_low_stock ? BLACK : GRAY_MID,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <View style={{ flex: 1 }}>
                {item.is_low_stock && (
                  <View
                    style={{
                      backgroundColor: BLACK,
                      alignSelf: "flex-start",
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 4,
                      marginBottom: 4,
                    }}
                  >
                    <Text
                      style={{ color: WHITE, fontSize: 9, fontWeight: "700" }}
                    >
                      LOW STOCK
                    </Text>
                  </View>
                )}
                <Text style={{ fontSize: 15, fontWeight: "700", color: BLACK }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 11, color: GRAY_DARK, marginTop: 2 }}>
                  SKU: {item.sku}
                </Text>
              </View>
              <Text style={{ fontSize: 14, fontWeight: "700", color: BLACK }}>
                RWF {item.unit_price.toLocaleString()}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "900",
                color: BLACK,
                marginTop: 8,
              }}
            >
              {item.quantity_on_hand}{" "}
              <Text
                style={{ fontSize: 12, fontWeight: "400", color: GRAY_DARK }}
              >
                units
              </Text>
            </Text>
            {/* Stock bar */}
            <View
              style={{
                height: 4,
                backgroundColor: GRAY_MID,
                borderRadius: 2,
                marginTop: 8,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  width: `${Math.min((item.quantity_on_hand / 50) * 100, 100)}%`,
                  height: "100%",
                  backgroundColor: item.is_low_stock ? BLACK : GRAY_DARK,
                  borderRadius: 2,
                }}
              />
            </View>
            {/* Actions */}
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              {item.is_low_stock ? (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    borderWidth: 1.5,
                    borderColor: BLACK,
                    borderRadius: 8,
                    paddingVertical: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontWeight: "700", color: BLACK, fontSize: 13 }}
                  >
                    Restock Now
                  </Text>
                </TouchableOpacity>
              ) : (
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
                    style={{ fontWeight: "600", color: BLACK, fontSize: 13 }}
                  >
                    Edit Details
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={{
                  width: 40,
                  borderWidth: 1,
                  borderColor: GRAY_MID,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons name="more-vert" size={18} color={GRAY_DARK} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {/* Footer summary */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: GRAY_MID,
            marginTop: 4,
          }}
        >
          <Text style={{ fontSize: 12, color: GRAY_DARK }}>
            Stock Value:{" "}
            <Text style={{ fontWeight: "700", color: BLACK }}>RWF 4.2M</Text>
          </Text>
          <Text style={{ fontSize: 12, color: GRAY_DARK }}>
            Low Stock Alert:{" "}
            <Text style={{ fontWeight: "700", color: BLACK }}>4 Items</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
