import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BLACK, GRAY_DARK, GRAY_MID, WHITE } from "./context/AppContext";

const TEMPLATES = [
  {
   
    id: "retail",
    label: "Retail Shop",
    icon: "storefront",
    desc: "General merchandise, groceries",
  },
  {
    id: "restaurant",
    label: "Restaurant",
    icon: "restaurant",
    desc: "Food service & eateries",
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    icon: "local-pharmacy",
    desc: "Medicine & health products",
  },
  {
    id: "salon",
    label: "Salon",
    icon: "content-cut",
    desc: "Beauty & hair services",
  },
];

export default function TemplateScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState("retail");

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />
      <View
        style={{
          backgroundColor: WHITE,
          paddingTop: insets.top + 16,
          paddingBottom: 16,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: GRAY_MID,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "900",
            color: BLACK,
            letterSpacing: -0.5,
          }}
        >
          {"What kind of business\ndo you run?"}
        </Text>
        <Text style={{ fontSize: 13, color: GRAY_DARK, marginTop: 6 }}>
          Select your business type to load demo data
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
          {TEMPLATES.map((tmpl) => {
            const isSelected = selected === tmpl.id;
            return (
              <TouchableOpacity
                key={tmpl.id}
                onPress={() => setSelected(tmpl.id)}
                style={{
                  width: "47%",
                  backgroundColor: isSelected ? BLACK : WHITE,
                  borderRadius: 12,
                  borderWidth: isSelected ? 2 : 1.5,
                  borderColor: isSelected ? BLACK : GRAY_MID,
                  padding: 20,
                  alignItems: "center",
                  marginBottom: 4,
                  shadowColor: BLACK,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isSelected ? 0.15 : 0.05,
                  shadowRadius: 6,
                  elevation: isSelected ? 4 : 1,
                }}
              >
                <MaterialIcons
                  name={tmpl.icon as any}
                  size={36}
                  color={isSelected ? WHITE : BLACK}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: isSelected ? WHITE : BLACK,
                    marginTop: 10,
                    textAlign: "center",
                  }}
                >
                  {tmpl.label}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: isSelected ? "rgba(255,255,255,0.7)" : GRAY_DARK,
                    marginTop: 4,
                    textAlign: "center",
                  }}
                >
                  {tmpl.desc}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 16,
          left: 20,
          right: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/dashboard")}
          style={{
            backgroundColor: BLACK,
            borderRadius: 10,
            paddingVertical: 16,
            alignItems: "center",
            shadowColor: BLACK,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Text
            style={{
              color: WHITE,
              fontSize: 15,
              fontWeight: "700",
              letterSpacing: 0.5,
            }}
          >
            Load {TEMPLATES.find((t) => t.id === selected)?.label} Demo →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
