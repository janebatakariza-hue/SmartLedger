import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const BLACK = "#000000";
export const WHITE = "#FFFFFF";
export const GRAY_LIGHT = "#F5F5F5";
export const GRAY_MID = "#E0E0E0";
export const GRAY_DARK = "#666666";
export const GRAY_DEEP = "#333333";

export const TAB_MENU_HEIGHT = 49;
export const SCROLL_EXTRA_PADDING = 16;
export const WEB_TAB_MENU_PADDING = 90;

export const SEED_INVENTORY = [
  {
    id: "inv-001",
    name: "Rice (5kg)",
    quantity_on_hand: 42,
    unit_price: 3500,
    low_stock_threshold: 5,
    is_low_stock: false,
  },
  {
    id: "inv-002",
    name: "Cooking Oil (1L)",
    quantity_on_hand: 3,
    unit_price: 2800,
    low_stock_threshold: 5,
    is_low_stock: true,
  },
  {
    id: "inv-003",
    name: "Sugar (1kg)",
    quantity_on_hand: 28,
    unit_price: 1200,
    low_stock_threshold: 5,
    is_low_stock: false,
  },
  {
    id: "inv-004",
    name: "Soap (bar)",
    quantity_on_hand: 19,
    unit_price: 500,
    low_stock_threshold: 5,
    is_low_stock: false,
  },
  {
    id: "inv-005",
    name: "Soda (500ml)",
    quantity_on_hand: 4,
    unit_price: 600,
    low_stock_threshold: 5,
    is_low_stock: true,
  },
  {
    id: "inv-006",
    name: "Bread (loaf)",
    quantity_on_hand: 12,
    unit_price: 1000,
    low_stock_threshold: 5,
    is_low_stock: false,
  },
];

export const SEED_WEEKLY_REVENUE = [
  28000, 35000, 42000, 31000, 48000, 52000, 45000,
];
export const SEED_WEEK_LABELS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];
export const SEED_BASE_REVENUE = 45000;
export const SEED_BASE_EXPENSES = 12000;
export const EXPENSE_CATEGORIES = [
  "Rent",
  "Transport",
  "Supplies",
  "Utilities",
];

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    welcome: "Welcome back, Aline",
    revenue: "Today's Revenue",
    profit: "Today's Profit",
    weekly_sales: "This Week's Sales",
    outstanding: "Outstanding Debts",
    low_stock: "Low Stock Items",
    record: "Record",
    inventory: "Inventory",
    passport: "Passport",
    dashboard: "Dashboard",
    record_sale: "Record Sale",
    record_expense: "Record Expense",
    product: "Product",
    quantity: "Quantity",
    total: "Total",
    save_sale: "Save Sale",
    save_expense: "Save Expense",
    category: "Category",
    amount: "Amount (RWF)",
    health_score: "Business Health Score",
    ai_coach: "AI Financial Coach",
    passport_label: "Digital Business Passport",
  },
  kin: {
    welcome: "Murakaza neza, Aline",
    revenue: "Ibyacurujwe Uyu Munsi",
    profit: "Inyungu Uyu Munsi",
    weekly_sales: "Ibicuruzwa bya Icyumweru",
    outstanding: "Imyenda",
    low_stock: "Ibicuruzwa bya Gito",
    record: "Andika",
    inventory: "Ububiko",
    passport: "Pasiporo",
    dashboard: "Imbonerahamwe",
    record_sale: "Andika Icuruzwa",
    record_expense: "Andika Ibisohotse",
    product: "Igicuruzwa",
    quantity: "Ingano",
    total: "Igiteranyo",
    save_sale: "Bika Icuruzwa",
    save_expense: "Bika Ibisohotse",
    category: "Icyiciro",
    amount: "Amafaranga (RWF)",
    health_score: "Ubuziranenge bw'Ubucuruzi",
    ai_coach: "Umujyanama wa AI",
    passport_label: "Pasiporo y'Ubucuruzi",
  },
};

export type InventoryItem = {
  id: string;
  name: string;
  quantity_on_hand: number;
  unit_price: number;
  low_stock_threshold: number;
  is_low_stock: boolean;
};

type AppContextType = {
  lang: string;
  setLang: (l: string) => void;
  t: Record<string, string>;
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  extraRevenue: number;
  setExtraRevenue: React.Dispatch<React.SetStateAction<number>>;
  extraExpenses: number;
  setExtraExpenses: React.Dispatch<React.SetStateAction<number>>;
  toastMsg: string;
  showToast: (msg: string) => void;
};

const AppContext = createContext<AppContextType>({
  lang: "en",
  setLang: () => {},
  t: TRANSLATIONS.en,
  inventory: SEED_INVENTORY,
  setInventory: () => {},
  extraRevenue: 0,
  setExtraRevenue: () => {},
  extraExpenses: 0,
  setExtraExpenses: () => {},
  toastMsg: "",
  showToast: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState("en");
  const [inventory, setInventory] = useState<InventoryItem[]>(SEED_INVENTORY);
  const [extraRevenue, setExtraRevenue] = useState(0);
  const [extraExpenses, setExtraExpenses] = useState(0);
  const [toastMsg, setToastMsg] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(""), 2500);
  }, []);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  const t = useMemo(() => TRANSLATIONS[lang] || TRANSLATIONS.en, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      inventory,
      setInventory,
      extraRevenue,
      setExtraRevenue,
      extraExpenses,
      setExtraExpenses,
      toastMsg,
      showToast,
    }),
    [lang, t, inventory, extraRevenue, extraExpenses, toastMsg, showToast],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
