import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { useApp } from "./context/AppContext";
import {
  BLACK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MID,
  WHITE,
} from "./context/theme";

export default function SettingsScreen() {
  const router = useRouter();
  const app = useApp();

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      <View
        style={{
          paddingTop: 56,
          paddingHorizontal: 20,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: GRAY_MID,
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={BLACK} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "900", color: BLACK }}>
          Passport
        </Text>
        <View style={{ flex: 1 }} />
        <MaterialIcons name="account-circle" size={28} color={BLACK} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Profile */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: GRAY_MID,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              backgroundColor: GRAY_LIGHT,
              borderRadius: 32,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
            }}
          >
            <MaterialIcons name="person" size={36} color={GRAY_DARK} />
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "900", color: BLACK }}>
              Jean-Claude Kwizera
            </Text>
            <Text style={{ fontSize: 13, color: GRAY_DARK }}>
              Amahoro General Trading Ltd.
            </Text>
            <View
              style={{
                backgroundColor: BLACK,
                borderRadius: 4,
                paddingHorizontal: 8,
                paddingVertical: 3,
                alignSelf: "flex-start",
                marginTop: 4,
              }}
            >
              <Text style={{ color: WHITE, fontSize: 10, fontWeight: "700" }}>
                VERIFIED MERCHANT
              </Text>
            </View>
          </View>
        </View>

        {/* Business Information */}
        <Text
          style={{
            fontSize: 11,
            fontWeight: "600",
            color: GRAY_DARK,
            textTransform: "uppercase",
            letterSpacing: 1,
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 8,
          }}
        >
          Business Information
        </Text>
        {[
          {
            icon: "store",
            label: "Store Details",
            sub: "Kigali, Nyarugenge District",
          },
          {
            icon: "receipt-long",
            label: "Tax & Payouts",
            sub: "RRA PIN: 102938475",
          },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: GRAY_MID,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                backgroundColor: GRAY_LIGHT,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 14,
              }}
            >
              <MaterialIcons name={item.icon as any} size={18} color={BLACK} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "600", color: BLACK }}>
                {item.label}
              </Text>
              <Text style={{ fontSize: 12, color: GRAY_DARK }}>{item.sub}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={GRAY_DARK} />
          </TouchableOpacity>
        ))}

        {/* Preferences */}
        <Text
          style={{
            fontSize: 11,
            fontWeight: "600",
            color: GRAY_DARK,
            textTransform: "uppercase",
            letterSpacing: 1,
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 8,
          }}
        >
          Preferences
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: GRAY_MID,
          }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              backgroundColor: GRAY_LIGHT,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 14,
            }}
          >
            <MaterialIcons name="language" size={18} color={BLACK} />
          </View>
          <Text style={{ flex: 1, fontWeight: "600", color: BLACK }}>
            Language
          </Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {["English", "Kinyarwanda"].map((l) => (
              <TouchableOpacity
                key={l}
                onPress={() => app.setLang(l === "English" ? "en" : "kin")}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 20,
                  backgroundColor:
                    (app.lang === "en" ? "English" : "Kinyarwanda") === l
                      ? BLACK
                      : GRAY_LIGHT,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color:
                      (app.lang === "en" ? "English" : "Kinyarwanda") === l
                        ? WHITE
                        : GRAY_DARK,
                  }}
                >
                  {l}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: GRAY_MID,
          }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              backgroundColor: GRAY_LIGHT,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 14,
            }}
          >
            <MaterialIcons name="notifications" size={18} color={BLACK} />
          </View>
          <Text style={{ flex: 1, fontWeight: "600", color: BLACK }}>
            Smart Alerts
          </Text>
          <Switch value={true} trackColor={{ true: BLACK }} />
        </View>

        {/* Data & Security */}
        <Text
          style={{
            fontSize: 11,
            fontWeight: "600",
            color: GRAY_DARK,
            textTransform: "uppercase",
            letterSpacing: 1,
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 8,
          }}
        >
          Data & Security
        </Text>
        {[
          { icon: "download", label: "Export Ledger Data" },
          { icon: "security", label: "Security Audit" },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: GRAY_MID,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                backgroundColor: GRAY_LIGHT,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 14,
              }}
            >
              <MaterialIcons name={item.icon as any} size={18} color={BLACK} />
            </View>
            <Text style={{ flex: 1, fontWeight: "600", color: BLACK }}>
              {item.label}
            </Text>
            <MaterialIcons name="chevron-right" size={20} color={GRAY_DARK} />
          </TouchableOpacity>
        ))}

        {/* Sign out */}
        <TouchableOpacity
          style={{
            margin: 20,
            borderWidth: 1.5,
            borderColor: GRAY_MID,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <MaterialIcons name="logout" size={18} color={BLACK} />
          <Text style={{ fontWeight: "700", color: BLACK }}>
            Sign Out of SmartLedger
          </Text>
        </TouchableOpacity>

        <Text style={{ textAlign: "center", color: GRAY_DARK, fontSize: 12 }}>
          Version 2.4.0 (Stable)
        </Text>
      </ScrollView>
    </View>
  );
}
