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
import { useApp } from "../../context/AppContext";
import {
  BLACK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MID,
  WHITE,
} from "../../context/theme";

export default function AddProductScreen() {
  const router = useRouter();
  const app = useApp();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [threshold, setThreshold] = useState("10");

  const handleSave = () => {
    if (!name || !price) return;
    const newItem = {
      id: `inv-${Date.now()}`,
      name,
      sku: `SKU-${Date.now()}`,
      category,
      quantity_on_hand: parseInt(stock) || 0,
      unit_price: parseFloat(price) || 0,
      low_stock_threshold: parseInt(threshold) || 10,
      is_low_stock: (parseInt(stock) || 0) <= (parseInt(threshold) || 10),
    };
    app.setInventory((prev) => [...prev, newItem]);
    app.showToast("Product added successfully!");
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
          paddingTop: 56,
          borderBottomWidth: 1,
          borderBottomColor: GRAY_MID,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: 16 }}
        >
          <Text style={{ fontSize: 20, color: BLACK }}>✕</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "900", color: BLACK }}>
            SmartLedger
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "900", color: BLACK }}>
            Add Product
          </Text>
          <Text style={{ fontSize: 13, color: GRAY_DARK }}>
            Enter the details for the new inventory item.
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {/* Image upload placeholder */}
        <TouchableOpacity
          style={{
            height: 140,
            backgroundColor: GRAY_LIGHT,
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: GRAY_MID,
            borderStyle: "dashed",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <MaterialIcons name="add-a-photo" size={32} color={GRAY_DARK} />
          <Text style={{ color: GRAY_DARK, fontSize: 12, marginTop: 8 }}>
            Upload Product Image
          </Text>
        </TouchableOpacity>

        {[
          {
            label: "Product Name",
            value: name,
            set: setName,
            placeholder: "e.g. Arabica Dark Roast",
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
              style={{
                borderWidth: 1.5,
                borderColor: GRAY_MID,
                borderRadius: 10,
                padding: 14,
                fontSize: 15,
                color: BLACK,
                backgroundColor: GRAY_LIGHT,
              }}
            />
          </View>
        ))}

        {/* Category */}
        <View style={{ marginBottom: 16 }}>
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
            Category
          </Text>
          <View
            style={{
              borderWidth: 1.5,
              borderColor: GRAY_MID,
              borderRadius: 10,
              padding: 14,
              backgroundColor: GRAY_LIGHT,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: category ? BLACK : GRAY_DARK }}>
              {category || "Select a category"}
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={20}
              color={GRAY_DARK}
            />
          </View>
        </View>

        {/* Stock + Price row */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
          <View style={{ flex: 1 }}>
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
              Stock Quantity
            </Text>
            <TextInput
              value={stock}
              onChangeText={setStock}
              placeholder="0"
              keyboardType="numeric"
              style={{
                borderWidth: 1.5,
                borderColor: GRAY_MID,
                borderRadius: 10,
                padding: 14,
                fontSize: 15,
                color: BLACK,
                backgroundColor: GRAY_LIGHT,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
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
              Unit Price (RWF)
            </Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="0.00"
              keyboardType="decimal-pad"
              style={{
                borderWidth: 1.5,
                borderColor: GRAY_MID,
                borderRadius: 10,
                padding: 14,
                fontSize: 15,
                color: BLACK,
                backgroundColor: GRAY_LIGHT,
              }}
            />
          </View>
        </View>

        {/* Reorder threshold */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: "600",
              color: GRAY_DARK,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 2,
            }}
          >
            Reorder Threshold
          </Text>
          <Text style={{ fontSize: 11, color: GRAY_DARK, marginBottom: 6 }}>
            Alert when stock falls below this
          </Text>
          <TextInput
            value={threshold}
            onChangeText={setThreshold}
            keyboardType="numeric"
            style={{
              borderWidth: 1.5,
              borderColor: GRAY_MID,
              borderRadius: 10,
              padding: 14,
              fontSize: 15,
              color: BLACK,
              backgroundColor: GRAY_LIGHT,
            }}
          />
        </View>
      </ScrollView>

      {/* Footer buttons */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          padding: 20,
          gap: 12,
          backgroundColor: WHITE,
          borderTopWidth: 1,
          borderTopColor: GRAY_MID,
        }}
      >
        <TouchableOpacity
          onPress={handleSave}
          style={{
            flex: 1,
            backgroundColor: BLACK,
            borderRadius: 10,
            paddingVertical: 16,
            alignItems: "center",
          }}
        >
          <Text style={{ color: WHITE, fontWeight: "700", fontSize: 15 }}>
            Save Product
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 52,
            borderWidth: 1.5,
            borderColor: GRAY_MID,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons name="delete-outline" size={22} color={GRAY_DARK} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
