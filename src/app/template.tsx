import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BLACK, GRAY_DARK, GRAY_MID, WHITE } from "../context/theme";

const TEMPLATES = [
  { id: "retail", label: "Retail", sub: "Shops, Kiosks", icon: "storefront" },
  {
    id: "restaurant",
    label: "Restaurant",
    sub: "Cafes, Bars",
    icon: "restaurant",
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    sub: "Clinics, Labs",
    icon: "local-pharmacy",
  },
  {
    id: "agriculture",
    label: "Agriculture",
    sub: "Farming, Livestock",
    icon: "agriculture",
  },
  { id: "salon", label: "Salon", sub: "Beauty, Barber", icon: "content-cut" },
  { id: "school", label: "School", sub: "Tutoring, Daycare", icon: "school" },
  {
    id: "cooperative",
    label: "Cooperative",
    sub: "Savings, SACCOs",
    icon: "groups",
  },
  {
    id: "services",
    label: "Services",
    sub: "Freelance, Consulting",
    icon: "work",
  },
];

export default function TemplateScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState("retail");

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      <View
        style={{ paddingTop: 60, paddingHorizontal: 24, paddingBottom: 20 }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginBottom: 20 }}
        >
          <Text style={{ color: BLACK, fontSize: 18 }}>←</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 28, fontWeight: "900", color: BLACK }}>
          Setup your ledger
        </Text>
        <Text style={{ color: GRAY_DARK, marginTop: 6 }}>
          Choose a template that best fits your business operations.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 140 }}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
          {TEMPLATES.map((t) => {
            const isSel = selected === t.id;
            return (
              <TouchableOpacity
                key={t.id}
                onPress={() => setSelected(t.id)}
                style={{
                  width: "47%",
                  backgroundColor: isSel ? BLACK : WHITE,
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: isSel ? BLACK : GRAY_MID,
                  padding: 18,
                  alignItems: "flex-start",
                }}
              >
                <MaterialIcons
                  name={t.icon as any}
                  size={28}
                  color={isSel ? WHITE : BLACK}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: isSel ? WHITE : BLACK,
                    marginTop: 10,
                  }}
                >
                  {t.label}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: isSel ? "rgba(255,255,255,0.6)" : GRAY_DARK,
                    marginTop: 2,
                  }}
                >
                  {t.sub}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 32,
          left: 24,
          right: 24,
          gap: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/dashboard")}
          style={{
            backgroundColor: BLACK,
            borderRadius: 10,
            paddingVertical: 16,
            alignItems: "center",
          }}
        >
          <Text style={{ color: WHITE, fontWeight: "700", fontSize: 15 }}>
            Apply Template
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: GRAY_MID,
            borderRadius: 10,
            paddingVertical: 14,
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontWeight: "600", color: BLACK, fontSize: 13 }}>
              Need a custom setup?
            </Text>
            <Text style={{ color: GRAY_DARK, fontSize: 11 }}>
              Start with a blank ledger instead.
            </Text>
          </View>
          <Text style={{ color: BLACK, fontSize: 18 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
