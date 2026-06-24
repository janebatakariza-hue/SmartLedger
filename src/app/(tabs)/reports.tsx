import { MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ExpenseBarChart,
  MiniBarChart,
  RevenueLineChart,
} from "../../context/components";
import { SEED_WEEKLY_REVENUE, SEED_WEEK_LABELS } from "../../context/seed";
import {
  BLACK,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MID,
  TAB_HEIGHT,
  WHITE,
} from "../../context/theme";

type TabType = "analytics" | "aicoach";
type Message = {
  id: string;
  role: "ai" | "user";
  text: string;
  chart?: boolean;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "ai",
    text: "Hello. I am your SmartLedger AI Coach. I've analyzed your inventory and reports for July. Would you like a summary of your top-selling items or a forecast for next month's cash flow?",
  },
];

const QUICK_PROMPTS = [
  "Analyze my expenses",
  "Best selling product?",
  "Cash flow forecast",
  "Restock advice",
];

const AI_RESPONSES: Record<string, { text: string; chart?: boolean }> = {
  default: {
    text: "Based on your 15% month-over-month growth in Kigali region sales, here is your projected stock requirement for Flour and Cooking Oil.\n\nYou should consider increasing your Flour orders by 22% by August 5th to avoid stockouts.",
    chart: true,
  },
  expenses: {
    text: "Your top expense categories this month are:\n\n1. Rent — RWF 450,000 (37%)\n2. Supplies — RWF 320,000 (26%)\n3. Transport — RWF 180,000 (15%)\n\nConsider negotiating rent or consolidating supply orders to reduce costs.",
    chart: false,
  },
  selling: {
    text: "Your best selling products this month are:\n\n1. Premium Arabica Beans — 142 units\n2. Organic Honey — 98 units\n3. Whole Milk — 87 units\n\nArabica Beans account for 34% of total revenue.",
    chart: false,
  },
};

export default function ReportsScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<TabType>("analytics");
  const [period, setPeriod] = useState("last30");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const lower = text.toLowerCase();
      const response = lower.includes("expense")
        ? AI_RESPONSES.expenses
        : lower.includes("sell") || lower.includes("product")
          ? AI_RESPONSES.selling
          : AI_RESPONSES.default;
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "ai", ...response },
      ]);
      setTyping(false);
      setTimeout(
        () => flatListRef.current?.scrollToEnd({ animated: true }),
        100,
      );
    }, 1200);
  };

  const EXPENSE_DATA = [180, 220, 195, 310, 280, 180, 200];
  const EXPENSE_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
  const SCORE_DATA = [55, 60, 58, 65, 68, 70, 72];

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
            marginBottom: 14,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "900", color: BLACK }}>
            SmartLedger
          </Text>
          <MaterialIcons name="account-circle" size={28} color={BLACK} />
        </View>
        <View style={{ flexDirection: "row", marginBottom: -1 }}>
          {(
            [
              ["analytics", "Analytics"],
              ["aicoach", "AI Coach"],
            ] as const
          ).map(([id, label]) => (
            <TouchableOpacity
              key={id}
              onPress={() => setTab(id)}
              style={{
                flex: 1,
                paddingVertical: 10,
                alignItems: "center",
                borderBottomWidth: 2,
                borderBottomColor: tab === id ? BLACK : "transparent",
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  color: tab === id ? BLACK : GRAY_DARK,
                  fontSize: 14,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {tab === "analytics" ? (
        <ScrollView
          contentContainerStyle={{
            padding: 20,
            paddingBottom: TAB_HEIGHT + insets.bottom + 20,
          }}
        >
          {/* Period filter */}
          <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
            {[
              ["last30", "Last 30 Days"],
              ["quarterly", "Quarterly"],
              ["ytd", "Year-to-Date"],
            ].map(([id, label]) => (
              <TouchableOpacity
                key={id}
                onPress={() => setPeriod(id)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 20,
                  backgroundColor: period === id ? BLACK : GRAY_LIGHT,
                  borderWidth: 1,
                  borderColor: period === id ? BLACK : GRAY_MID,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: period === id ? WHITE : GRAY_DARK,
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text
            style={{
              fontSize: 11,
              color: GRAY_DARK,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Business Intelligence
          </Text>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "900",
              color: BLACK,
              marginBottom: 16,
            }}
          >
            Performance{"\n"}Analytics
          </Text>

          {/* Revenue with line chart */}
          <Text style={{ fontSize: 13, color: GRAY_DARK }}>Total Revenue</Text>
          <Text style={{ fontSize: 40, fontWeight: "900", color: BLACK }}>
            RWF 4.2M
          </Text>
          <View
            style={{
              backgroundColor: WHITE,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: GRAY_MID,
              padding: 12,
              marginTop: 12,
            }}
          >
            <RevenueLineChart
              data={SEED_WEEKLY_REVENUE}
              labels={SEED_WEEK_LABELS}
              height={120}
            />
          </View>

          {/* Expenses with bar chart */}
          <Text style={{ fontSize: 13, color: GRAY_DARK, marginTop: 24 }}>
            Expenses
          </Text>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "900",
              color: BLACK,
              marginBottom: 12,
            }}
          >
            RWF 1.8M
          </Text>
          <View
            style={{
              backgroundColor: WHITE,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: GRAY_MID,
              padding: 12,
            }}
          >
            <ExpenseBarChart
              data={EXPENSE_DATA}
              labels={EXPENSE_LABELS}
              height={100}
            />
          </View>

          {/* Growth card */}
          <View
            style={{
              backgroundColor: BLACK,
              borderRadius: 12,
              padding: 20,
              marginTop: 16,
            }}
          >
            <Text style={{ fontSize: 36, fontWeight: "900", color: WHITE }}>
              +24%
            </Text>
            <Text
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 12,
                marginTop: 4,
              }}
            >
              Compared to last month
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>
                Projection
              </Text>
              <Text style={{ color: WHITE, fontWeight: "700" }}>RWF 2.4M</Text>
            </View>
          </View>

          {/* Inventory analytics */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "900",
              color: BLACK,
              marginTop: 24,
              marginBottom: 14,
            }}
          >
            Inventory Analytics
          </Text>
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
            {[
              ["Turnover Rate", "4.8x"],
              ["Days to Sell", "12d"],
            ].map(([label, value]) => (
              <View
                key={label}
                style={{
                  flex: 1,
                  backgroundColor: GRAY_LIGHT,
                  borderRadius: 12,
                  padding: 14,
                  borderWidth: 1,
                  borderColor: GRAY_MID,
                }}
              >
                <Text style={{ fontSize: 11, color: GRAY_DARK }}>{label}</Text>
                <Text style={{ fontSize: 22, fontWeight: "900", color: BLACK }}>
                  {value}
                </Text>
              </View>
            ))}
          </View>

          {/* Score evolution */}
          <View
            style={{
              borderWidth: 1,
              borderColor: GRAY_MID,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: BLACK,
                marginBottom: 8,
              }}
            >
              Score Evolution
            </Text>
            <MiniBarChart
              data={SCORE_DATA}
              activeIndex={SCORE_DATA.length - 1}
            />
          </View>

          {/* Growth forecast */}
          <View
            style={{
              borderWidth: 1,
              borderColor: GRAY_MID,
              borderRadius: 12,
              padding: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: BLACK,
                marginBottom: 4,
              }}
            >
              Growth Forecast
            </Text>
            <Text style={{ fontSize: 11, color: GRAY_DARK, marginBottom: 12 }}>
              Year-end revenue estimation
            </Text>
            <View
              style={{
                height: 6,
                backgroundColor: GRAY_MID,
                borderRadius: 3,
                overflow: "hidden",
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  width: "84%",
                  height: "100%",
                  backgroundColor: BLACK,
                  borderRadius: 3,
                }}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 12, color: BLACK, fontWeight: "700" }}>
                RWF 10.8M Goal
              </Text>
              <Text style={{ fontSize: 12, color: GRAY_DARK }}>
                84% Progress
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        /* AI Coach */
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={TAB_HEIGHT + insets.bottom + 60}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(m) => m.id}
            contentContainerStyle={{ padding: 16, paddingBottom: 16 }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom: 16,
                  alignItems: item.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {item.role === "ai" && (
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      backgroundColor: GRAY_LIGHT,
                      borderRadius: 14,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 6,
                    }}
                  >
                    <MaterialIcons
                      name="auto-awesome"
                      size={14}
                      color={BLACK}
                    />
                  </View>
                )}
                <View
                  style={{
                    maxWidth: "85%",
                    backgroundColor: item.role === "user" ? BLACK : GRAY_LIGHT,
                    borderRadius: 14,
                    borderBottomLeftRadius: item.role === "ai" ? 4 : 14,
                    borderBottomRightRadius: item.role === "user" ? 4 : 14,
                    padding: 14,
                  }}
                >
                  <Text
                    style={{
                      color: item.role === "user" ? WHITE : BLACK,
                      fontSize: 14,
                      lineHeight: 20,
                    }}
                  >
                    {item.text}
                  </Text>
                  {item.chart && (
                    <View
                      style={{
                        marginTop: 12,
                        backgroundColor: WHITE,
                        borderRadius: 8,
                        padding: 8,
                      }}
                    >
                      <ExpenseBarChart
                        data={[28000, 32000, 38000, 46000]}
                        labels={["MAY", "JUN", "JUL", "AUG"]}
                        height={60}
                      />
                    </View>
                  )}
                </View>
              </View>
            )}
            ListFooterComponent={
              typing ? (
                <View style={{ alignItems: "flex-start", marginBottom: 16 }}>
                  <View
                    style={{
                      backgroundColor: GRAY_LIGHT,
                      borderRadius: 14,
                      borderBottomLeftRadius: 4,
                      padding: 14,
                    }}
                  >
                    <Text style={{ color: GRAY_DARK, fontSize: 14 }}>
                      ● ● ●
                    </Text>
                  </View>
                </View>
              ) : null
            }
          />

          {/* Quick prompts */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderTopWidth: 1,
              borderTopColor: GRAY_MID,
            }}
          >
            {QUICK_PROMPTS.map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => sendMessage(p)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  backgroundColor: GRAY_LIGHT,
                  borderRadius: 20,
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor: GRAY_MID,
                }}
              >
                <Text style={{ fontSize: 12, color: BLACK, fontWeight: "600" }}>
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Input bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 10,
              paddingBottom: insets.bottom + 10,
              borderTopWidth: 1,
              borderTopColor: GRAY_MID,
              backgroundColor: WHITE,
              gap: 10,
            }}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask your AI coach..."
              placeholderTextColor={GRAY_DARK}
              style={{
                flex: 1,
                backgroundColor: GRAY_LIGHT,
                borderRadius: 22,
                paddingHorizontal: 16,
                paddingVertical: 10,
                fontSize: 14,
                color: BLACK,
                borderWidth: 1,
                borderColor: GRAY_MID,
              }}
              returnKeyType="send"
              onSubmitEditing={() => sendMessage(input)}
            />
            <TouchableOpacity
              onPress={() => sendMessage(input)}
              style={{
                width: 42,
                height: 42,
                backgroundColor: input.trim() ? BLACK : GRAY_MID,
                borderRadius: 21,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialIcons name="send" size={18} color={WHITE} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}
