import { MaterialIcons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BLACK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MID,
  WHITE,
} from "../../context/theme";

const DOCS = [
  {
    id: "d1",
    name: "Office Rent Receipt #4421",
    type: "PDF",
    size: "1.2MB",
    date: "Updated Oct 18",
  },
  {
    id: "d2",
    name: "Supplier Invoice - Global Log",
    type: "PDF",
    size: "2.5MB",
    date: "Updated Oct 16",
  },
  {
    id: "d3",
    name: "Employee Contract - Uwaso J.",
    type: "PDF",
    size: "900KB",
    date: "Updated Oct 10",
  },
  {
    id: "d4",
    name: "Tax Compliance Cert 2023",
    type: "PDF",
    size: "2.1MB",
    date: "Updated Oct 01",
  },
];

const FILTER_TABS = ["All Files", "Receipts", "Invoices", "Contracts"];

export default function VaultScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      {/* Header */}
      <View
        style={{
          paddingTop: 56,
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
            alignItems: "flex-start",
          }}
        >
          <View>
            <Text style={{ fontSize: 20, fontWeight: "900", color: BLACK }}>
              Document Vault
            </Text>
            <Text style={{ fontSize: 12, color: GRAY_DARK }}>
              Secured financial records
            </Text>
          </View>
          <TouchableOpacity
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
            <MaterialIcons name="upload" size={16} color={WHITE} />
            <Text style={{ color: WHITE, fontWeight: "700", fontSize: 13 }}>
              Upload
            </Text>
          </TouchableOpacity>
        </View>
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
            placeholder="Search invoices, receipts..."
            style={{ flex: 1, paddingVertical: 10, paddingLeft: 8 }}
          />
        </View>
        {/* Filter tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 12 }}
        >
          {FILTER_TABS.map((t, i) => (
            <TouchableOpacity
              key={t}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 20,
                backgroundColor: i === 0 ? BLACK : GRAY_LIGHT,
                borderWidth: 1,
                borderColor: i === 0 ? BLACK : GRAY_MID,
                marginRight: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: i === 0 ? WHITE : GRAY_DARK,
                }}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        {/* Featured doc */}
        <View
          style={{
            borderWidth: 1.5,
            borderColor: BLACK,
            borderRadius: 14,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              backgroundColor: BLACK,
              alignSelf: "flex-start",
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 4,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: WHITE, fontSize: 10, fontWeight: "700" }}>
              FEATURED
            </Text>
          </View>
          <Text style={{ fontSize: 18, fontWeight: "900", color: BLACK }}>
            Business Operations License 2024
          </Text>
          <Text style={{ fontSize: 12, color: GRAY_DARK, marginTop: 4 }}>
            Exp. Dec 31, 2024
          </Text>
        </View>

        {/* Quick access grid */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
          {["VAT Returns Q3", "Lease Agreement"].map((name) => (
            <View
              key={name}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: GRAY_MID,
                borderRadius: 12,
                padding: 14,
                alignItems: "center",
              }}
            >
              <MaterialIcons name="description" size={28} color={BLACK} />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: BLACK,
                  marginTop: 8,
                  textAlign: "center",
                }}
              >
                {name}
              </Text>
            </View>
          ))}
        </View>

        {/* All documents list */}
        <Text
          style={{
            fontSize: 11,
            fontWeight: "600",
            color: GRAY_DARK,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 12,
          }}
        >
          All Documents
        </Text>
        {DOCS.map((doc) => (
          <View
            key={doc.id}
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
            <MaterialIcons
              name="description"
              size={24}
              color={BLACK}
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "600", color: BLACK, fontSize: 14 }}>
                {doc.name}
              </Text>
              <Text style={{ fontSize: 11, color: GRAY_DARK }}>
                {doc.type} • {doc.size} — {doc.date}
              </Text>
            </View>
            <MaterialIcons name="download" size={20} color={GRAY_DARK} />
          </View>
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 24,
          right: 20,
          width: 52,
          height: 52,
          backgroundColor: BLACK,
          borderRadius: 26,
          alignItems: "center",
          justifyContent: "center",
          elevation: 6,
        }}
      >
        <MaterialIcons name="add" size={28} color={WHITE} />
      </TouchableOpacity>
    </View>
  );
}
