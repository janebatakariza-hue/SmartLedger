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
import {
  BLACK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MID,
  WHITE,
} from "../../context/theme";

type Doc = {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  category: string;
};

const INITIAL_DOCS: Doc[] = [
  {
    id: "d1",
    name: "Office Rent Receipt #4421",
    type: "PDF",
    size: "1.2MB",
    date: "Updated Oct 18",
    category: "Receipts",
  },
  {
    id: "d2",
    name: "Supplier Invoice - Global Log",
    type: "PDF",
    size: "2.5MB",
    date: "Updated Oct 16",
    category: "Invoices",
  },
  {
    id: "d3",
    name: "Employee Contract - Uwaso J.",
    type: "DOCX",
    size: "900KB",
    date: "Updated Oct 10",
    category: "Contracts",
  },
  {
    id: "d4",
    name: "Tax Compliance Cert 2023",
    type: "PDF",
    size: "2.1MB",
    date: "Updated Oct 01",
    category: "Receipts",
  },
];

const FILTER_TABS = ["All Files", "Receipts", "Invoices", "Contracts"];

export default function VaultScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [docs, setDocs] = useState<Doc[]>(INITIAL_DOCS);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Files");
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Receipts");

  const filtered = docs.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === "All Files" || d.category === activeFilter;
    return matchSearch && matchFilter;
  });

  const handleAdd = () => {
    if (!newName.trim()) return;
    setDocs((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newName.trim(),
        type: "PDF",
        size: "—",
        date: "Added today",
        category: newCategory,
      },
    ]);
    setNewName("");
    setNewCategory("Receipts");
    setShowModal(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
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
            alignItems: "center",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={BLACK} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
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
              onPress={() => setShowModal(true)}
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
        </View>

        {/* Search */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: GRAY_LIGHT,
            borderRadius: 10,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: GRAY_MID,
          }}
        >
          <MaterialIcons name="search" size={18} color={GRAY_DARK} />
          <TextInput
            placeholder="Search invoices, receipts..."
            value={search}
            onChangeText={setSearch}
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingLeft: 8,
              color: BLACK,
              fontSize: 14,
            }}
            placeholderTextColor={GRAY_DARK}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <MaterialIcons name="close" size={18} color={GRAY_DARK} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 12 }}
        >
          {FILTER_TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveFilter(tab)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 7,
                borderRadius: 20,
                backgroundColor: activeFilter === tab ? BLACK : GRAY_LIGHT,
                borderWidth: 1,
                borderColor: activeFilter === tab ? BLACK : GRAY_MID,
                marginRight: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: activeFilter === tab ? WHITE : GRAY_DARK,
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {/* Featured */}
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

        {/* Quick grid */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
          {["VAT Returns Q3", "Lease Agreement"].map((name) => (
            <TouchableOpacity
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
            </TouchableOpacity>
          ))}
        </View>

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
          {activeFilter === "All Files" ? "All Documents" : activeFilter} (
          {filtered.length})
        </Text>

        {filtered.length === 0 ? (
          <View style={{ alignItems: "center", paddingTop: 20 }}>
            <MaterialIcons name="folder-open" size={48} color={GRAY_MID} />
            <Text style={{ color: GRAY_DARK, marginTop: 12 }}>
              No documents found
            </Text>
          </View>
        ) : (
          filtered.map((doc) => (
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
              <View
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: GRAY_LIGHT,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <MaterialIcons name="description" size={20} color={BLACK} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontWeight: "600", color: BLACK, fontSize: 14 }}
                  numberOfLines={1}
                >
                  {doc.name}
                </Text>
                <Text style={{ fontSize: 11, color: GRAY_DARK }}>
                  {doc.type} • {doc.size} — {doc.date}
                </Text>
              </View>
              <TouchableOpacity style={{ padding: 4 }}>
                <MaterialIcons name="download" size={20} color={GRAY_DARK} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={{
          position: "absolute",
          bottom: insets.bottom + 20,
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

      {/* Add Doc Modal */}
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
              Add Document
            </Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <MaterialIcons name="close" size={24} color={BLACK} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <TouchableOpacity
              style={{
                height: 120,
                backgroundColor: GRAY_LIGHT,
                borderRadius: 12,
                borderWidth: 1.5,
                borderColor: GRAY_MID,
                borderStyle: "dashed",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <MaterialIcons name="upload-file" size={32} color={GRAY_DARK} />
              <Text style={{ color: GRAY_DARK, fontSize: 12, marginTop: 8 }}>
                Tap to upload file
              </Text>
            </TouchableOpacity>
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
              Document Name
            </Text>
            <TextInput
              value={newName}
              onChangeText={setNewName}
              placeholder="e.g. Office Rent Receipt"
              style={{
                borderWidth: 1.5,
                borderColor: GRAY_MID,
                borderRadius: 10,
                padding: 14,
                fontSize: 15,
                color: BLACK,
                backgroundColor: GRAY_LIGHT,
                marginBottom: 16,
              }}
              placeholderTextColor={GRAY_DARK}
            />
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
              Category
            </Text>
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
              {["Receipts", "Invoices", "Contracts"].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setNewCategory(cat)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor: newCategory === cat ? BLACK : GRAY_LIGHT,
                    borderWidth: 1,
                    borderColor: newCategory === cat ? BLACK : GRAY_MID,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: newCategory === cat ? WHITE : GRAY_DARK,
                    }}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              onPress={handleAdd}
              style={{
                backgroundColor: BLACK,
                borderRadius: 10,
                paddingVertical: 16,
                alignItems: "center",
              }}
            >
              <Text style={{ color: WHITE, fontWeight: "700", fontSize: 15 }}>
                Save Document
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
