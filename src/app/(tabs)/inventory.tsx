import { Platform, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BLACK,
  GRAY_DARK,
  GRAY_DEEP,
  GRAY_MID,
  SCROLL_EXTRA_PADDING,
  TAB_MENU_HEIGHT,
  useApp,
  WEB_TAB_MENU_PADDING,
  WHITE,
} from "../context/AppContext";

export default function InventoryScreen() {
  const app = useApp();
  const insets = useSafeAreaInsets();
  const scrollBottomPadding =
    Platform.OS === "web"
      ? WEB_TAB_MENU_PADDING
      : TAB_MENU_HEIGHT + insets.bottom + SCROLL_EXTRA_PADDING;
  const maxQty = 50;

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      <View
        style={{
          backgroundColor: WHITE,
          paddingTop: insets.top + 14,
          paddingBottom: 14,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: GRAY_MID,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "900", color: BLACK }}>
          {app.t.inventory}
        </Text>
        <Text style={{ fontSize: 12, color: GRAY_DARK, marginTop: 3 }}>
          {app.inventory.length} products tracked
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: scrollBottomPadding,
        }}
      >
        {app.inventory.map((item) => {
          const pct = Math.min(item.quantity_on_hand / maxQty, 1);
          return (
            <View
              key={item.id}
              style={{
                backgroundColor: WHITE,
                borderRadius: 12,
                padding: 16,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: item.is_low_stock ? GRAY_DEEP : GRAY_MID,
                shadowColor: BLACK,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    color: BLACK,
                    flex: 1,
                  }}
                >
                  {item.name}
                </Text>
                {item.is_low_stock && (
                  <View
                    style={{
                      backgroundColor: BLACK,
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: WHITE,
                        fontSize: 10,
                        fontWeight: "700",
                        letterSpacing: 0.5,
                      }}
                    >
                      LOW STOCK
                    </Text>
                  </View>
                )}
              </View>
              <Text style={{ fontSize: 12, color: GRAY_DARK, marginBottom: 8 }}>
                {item.unit_price.toLocaleString()} RWF / unit
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "600",
                    color: item.is_low_stock ? BLACK : GRAY_DARK,
                  }}
                >
                  Stock:{" "}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "900", color: BLACK }}>
                  {item.quantity_on_hand}
                </Text>
                <Text style={{ fontSize: 13, color: GRAY_DARK }}> units</Text>
              </View>
              <View
                style={{
                  height: 6,
                  backgroundColor: GRAY_MID,
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    width: `${Math.round(pct * 100)}%`,
                    height: "100%",
                    backgroundColor: item.is_low_stock ? GRAY_DEEP : BLACK,
                    borderRadius: 3,
                  }}
                />
              </View>
              <Text style={{ fontSize: 10, color: GRAY_DARK, marginTop: 4 }}>
                Threshold: {item.low_stock_threshold} units
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
