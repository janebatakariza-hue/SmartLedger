import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SEED_INVENTORY, TRANSLATIONS } from "./seed";

export type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  quantity_on_hand: number;
  unit_price: number;
  low_stock_threshold: number;
  is_low_stock: boolean;
  category: string;
};
// Add these to your existing types:

export type Customer = {
  id: string;
  name: string;
  phone: string;
  tier: string;
  total_credit: number;
  current_debt: number;
  overdue: boolean;
  last_transaction: string;
};

export type Supplier = {
  id: string;
  name: string;
  type: string;
  payment_owed: number;
  last_purchase: string;
  is_top_vendor: boolean;
  is_overdue: boolean;
};





type AppContextType = {
  lang: string;
  setLang: (l: string) => void;
  t: Record<string, string>;
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  suppliers: Supplier[];
  setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>>;
  extraRevenue: number;
  setExtraRevenue: React.Dispatch<React.SetStateAction<number>>;
  extraExpenses: number;
  setExtraExpenses: React.Dispatch<React.SetStateAction<number>>;
  toastMsg: string;
  showToast: (msg: string) => void;
  userName: string;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState("en");
  const [inventory, setInventory] = useState<InventoryItem[]>(SEED_INVENTORY);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [extraRevenue, setExtraRevenue] = useState(0);
  const [extraExpenses, setExtraExpenses] = useState(0);
  const [toastMsg, setToastMsg] = useState("");
  const timer = useRef<any>(null);
  const userName = "Habimana";

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(""), 2500);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
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
      customers,
      setCustomers,
      suppliers,
      setSuppliers,
      extraRevenue,
      setExtraRevenue,
      extraExpenses,
      setExtraExpenses,
      toastMsg,
      showToast,
      userName,
    }),
    [
      lang,
      t,
      inventory,
      customers,
      suppliers,
      extraRevenue,
      extraExpenses,
      toastMsg,
      showToast,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
