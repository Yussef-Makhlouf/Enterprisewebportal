import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type Theme = 'dark' | 'light';
export type Language = 'en' | 'ar';
export type UserRole = 'admin' | 'broker';

interface Toast {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  description?: string;
}

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  isRTL: boolean;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  t: (key: string) => string;
  currentUser: { name: string; nameAr: string; email: string; avatar: string };
}

const translations: Record<string, Record<string, string>> = {
  en: {
    'app.title': 'Agents & Brokers Portal',
    'app.company': 'GIG Jordan Insurance',
    'nav.dashboard': 'Dashboard',
    'nav.brokers': 'Manage Brokers',
    'nav.roles': 'Roles & Permissions',
    'nav.audit': 'Audit Trail',
    'nav.issuance': 'Issue Policy',
    'nav.policies': 'My Policies',
    'nav.subbrokers': 'Sub-Brokers',
    'nav.statement': 'Statement',
    'nav.notifications': 'Notifications',
    'nav.profile': 'My Profile',
    'nav.corporate': 'Corporate Clients',
    'nav.designsystem': 'Design System',
    'nav.components': 'Components',
    'topbar.search': 'Search or press ⌘K',
    'btn.save': 'Save Changes',
    'btn.cancel': 'Cancel',
    'btn.confirm': 'Confirm',
    'btn.next': 'Next',
    'btn.back': 'Back',
    'btn.export': 'Export',
    'status.active': 'Active',
    'status.pending': 'Pending',
    'status.expired': 'Expired',
    'status.blocked': 'Blocked',
    'status.inactive': 'Inactive',
    'good.morning': 'Good morning',
    'good.evening': 'Good evening',
    'portal.admin': 'Admin Portal',
    'portal.broker': 'Broker Portal',
  },
  ar: {
    'app.title': 'بوابة الوسطاء والوكلاء',
    'app.company': 'جي آي جي الأردن للتأمين',
    'nav.dashboard': 'لوحة التحكم',
    'nav.brokers': 'إدارة الوسطاء',
    'nav.roles': 'الأدوار والصلاحيات',
    'nav.audit': 'سجل المراجعة',
    'nav.issuance': 'إصدار وثيقة',
    'nav.policies': 'وثائقي',
    'nav.subbrokers': 'الوسطاء الفرعيون',
    'nav.statement': 'كشف الحساب',
    'nav.notifications': 'الإشعارات',
    'nav.profile': 'ملفي الشخصي',
    'nav.corporate': 'العملاء المؤسسيون',
    'nav.designsystem': 'نظام التصميم',
    'nav.components': 'المكونات',
    'topbar.search': 'ابحث أو اضغط ⌘K',
    'btn.save': 'حفظ التغييرات',
    'btn.cancel': 'إلغاء',
    'btn.confirm': 'تأكيد',
    'btn.next': 'التالي',
    'btn.back': 'رجوع',
    'btn.export': 'تصدير',
    'status.active': 'نشط',
    'status.pending': 'قيد الانتظار',
    'status.expired': 'منتهي',
    'status.blocked': 'محظور',
    'status.inactive': 'غير نشط',
    'good.morning': 'صباح الخير',
    'good.evening': 'مساء الخير',
    'portal.admin': 'بوابة الإدارة',
    'portal.broker': 'بوابة الوسيط',
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('en');
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  }, []);

  const openCommandPalette = useCallback(() => setIsCommandPaletteOpen(true), []);
  const closeCommandPalette = useCallback(() => setIsCommandPaletteOpen(false), []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev.slice(-2), { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const t = useCallback((key: string) => {
    return translations[language]?.[key] || translations.en[key] || key;
  }, [language]);

  const currentUser = {
    name: 'Ahmed Al-Rashidi',
    nameAr: 'أحمد الراشدي',
    email: 'ahmed.rashidi@gig.com.jo',
    avatar: 'AR'
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      language, toggleLanguage,
      isRTL: language === 'ar',
      userRole, setUserRole,
      isAuthenticated, setIsAuthenticated,
      isCommandPaletteOpen, openCommandPalette, closeCommandPalette,
      toasts, addToast, removeToast,
      t,
      currentUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
