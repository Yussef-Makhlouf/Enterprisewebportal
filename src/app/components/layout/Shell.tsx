import { Outlet, Navigate, useNavigate, useLocation } from 'react-router';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, Users, Shield, FileText, BookOpen,
  TrendingUp, Bell, User, Settings, LogOut, ChevronRight,
  Globe, Sun, Moon, Search, Command, Building2, HelpCircle,
  ClipboardList, CreditCard, UserCheck, Home, Layers, X
} from 'lucide-react';
import { useState } from 'react';

const adminNav = [
  {
    group: 'PORTAL MANAGEMENT',
    groupAr: 'إدارة البوابة',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', labelAr: 'لوحة التحكم', path: '/admin' },
    ]
  },
  {
    group: 'BROKER MANAGEMENT',
    groupAr: 'إدارة الوسطاء',
    items: [
      { icon: Users, label: 'Manage Brokers', labelAr: 'إدارة الوسطاء', path: '/admin/brokers' },
      { icon: Shield, label: 'Roles & Permissions', labelAr: 'الأدوار والصلاحيات', path: '/admin/roles' },
      { icon: ClipboardList, label: 'Audit Trail', labelAr: 'سجل المراجعة', path: '/admin/audit' },
    ]
  },
  {
    group: 'SHOWCASE',
    groupAr: 'العرض',
    items: [
      { icon: Layers, label: 'Design System', labelAr: 'نظام التصميم', path: '/design-system' },
      { icon: BookOpen, label: 'Components', labelAr: 'المكونات', path: '/components' },
    ]
  }
];

const brokerNav = [
  {
    group: 'OVERVIEW',
    groupAr: 'نظرة عامة',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', labelAr: 'لوحة التحكم', path: '/broker' },
      { icon: Bell, label: 'Notifications', labelAr: 'الإشعارات', path: '/broker/notifications', badge: 2 },
    ]
  },
  {
    group: 'POLICY ISSUANCE',
    groupAr: 'إصدار الوثائق',
    items: [
      { icon: FileText, label: 'Issue Policy', labelAr: 'إصدار وثيقة', path: '/broker/issuance' },
      { icon: BookOpen, label: 'My Policies', labelAr: 'وثائقي', path: '/broker/policies' },
    ]
  },
  {
    group: 'ACCOUNT',
    groupAr: 'الحساب',
    items: [
      { icon: Users, label: 'Sub-Brokers', labelAr: 'الوسطاء الفرعيون', path: '/broker/sub-brokers' },
      { icon: CreditCard, label: 'Statement', labelAr: 'كشف الحساب', path: '/broker/statement' },
      { icon: Building2, label: 'Corporate', labelAr: 'العملاء المؤسسيون', path: '/broker/corporate' },
      { icon: User, label: 'My Profile', labelAr: 'ملفي الشخصي', path: '/broker/profile' },
    ]
  },
  {
    group: 'SHOWCASE',
    groupAr: 'العرض',
    items: [
      { icon: Layers, label: 'Design System', labelAr: 'نظام التصميم', path: '/design-system' },
      { icon: BookOpen, label: 'Components', labelAr: 'المكونات', path: '/components' },
    ]
  }
];

const iconRailItems = [
  { icon: LayoutDashboard, label: 'Dashboard', labelAr: 'لوحة التحكم', matchPath: (p: string, r: string) => r === 'admin' ? p === '/admin' : p === '/broker' },
  { icon: Users, label: 'Brokers / Sub-Brokers', labelAr: 'الوسطاء', matchPath: (p: string, r: string) => r === 'admin' ? p.startsWith('/admin/brokers') : p.startsWith('/broker/sub') },
  { icon: FileText, label: 'Policies', labelAr: 'الوثائق', matchPath: (p: string, r: string) => r === 'broker' && (p.startsWith('/broker/policies') || p.startsWith('/broker/issuance')) },
  { icon: Shield, label: 'Roles', labelAr: 'الأدوار', matchPath: (p: string, r: string) => r === 'admin' && p.startsWith('/admin/roles') },
  { icon: ClipboardList, label: 'Audit', labelAr: 'المراجعة', matchPath: (p: string, r: string) => r === 'admin' && p.startsWith('/admin/audit') },
  { icon: CreditCard, label: 'Statement', labelAr: 'الحساب', matchPath: (p: string, r: string) => r === 'broker' && p.startsWith('/broker/statement') },
  { icon: Bell, label: 'Notifications', labelAr: 'الإشعارات', matchPath: (p: string) => p.includes('/notifications'), badge: 2 },
  { icon: User, label: 'Profile', labelAr: 'الملف', matchPath: (p: string, r: string) => r === 'broker' && p.startsWith('/broker/profile') },
];

export function Shell() {
  const { isAuthenticated, userRole, setUserRole, setIsAuthenticated, language, isRTL, toggleTheme, toggleLanguage, theme, openCommandPalette, t, currentUser } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [navPanelOpen, setNavPanelOpen] = useState(true);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const navItems = userRole === 'admin' ? adminNav : brokerNav;
  const currentPath = location.pathname;

  const getBreadcrumb = () => {
    const flat = navItems.flatMap(g => g.items);
    const found = flat.find(i => i.path === currentPath || currentPath.startsWith(i.path + '/'));
    if (!found) return language === 'ar' ? 'لوحة التحكم' : 'Dashboard';
    return language === 'ar' ? found.labelAr : found.label;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleSwitchRole = () => {
    const newRole = userRole === 'admin' ? 'broker' : 'admin';
    setUserRole(newRole);
    navigate(newRole === 'admin' ? '/admin' : '/broker');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Icon Rail */}
      <div
        className="flex flex-col items-center py-3 gap-1 shrink-0 z-40 relative"
        style={{
          width: '68px',
          background: 'var(--rail-bg)',
          borderRight: isRTL ? 'none' : '1px solid rgba(255,255,255,0.05)',
          borderLeft: isRTL ? '1px solid rgba(255,255,255,0.05)' : 'none',
        }}
      >
        {/* GIG Logo */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer mb-4 shrink-0"
          style={{
            background: 'linear-gradient(135deg, #C8102E, #A00D25)',
            boxShadow: '0 4px 20px rgba(200, 16, 46, 0.4)'
          }}
          onClick={() => navigate(userRole === 'admin' ? '/admin' : '/broker')}
        >
          <span className="text-white font-bold text-sm tracking-tight">G</span>
        </div>

        {/* Nav Icons */}
        <div className="flex-1 flex flex-col gap-1 w-full px-2">
          {iconRailItems.map((item) => {
            const isActive = item.matchPath(currentPath, userRole);
            const showItem = item.matchPath.length === 1 ||
              (userRole === 'admin' && ['Dashboard','Brokers / Sub-Brokers','Roles','Audit'].includes(item.label)) ||
              (userRole === 'broker' && ['Dashboard','Policies','Statement','Notifications','Profile'].includes(item.label));

            return (
              <div key={item.label} className="relative group w-full">
                <button
                  className={`w-full flex items-center justify-center rounded-lg h-10 transition-all duration-150 relative ${
                    isActive
                      ? 'bg-[#C8102E] text-white'
                      : 'text-[#8A96B0] hover:bg-white/8 hover:text-white'
                  }`}
                  onClick={() => {
                    const flat = navItems.flatMap(g => g.items);
                    const found = flat.find(i => i.label === item.label || i.labelAr === item.labelAr);
                    if (found) navigate(found.path);
                  }}
                >
                  <item.icon size={18} />
                  {item.badge && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#C8102E] rounded-full text-white flex items-center justify-center"
                      style={{ fontSize: '9px' }}>
                      {item.badge}
                    </span>
                  )}
                </button>
                {/* Tooltip */}
                <div className={`absolute ${isRTL ? 'right-full mr-2' : 'left-full ml-2'} top-1/2 -translate-y-1/2 bg-[#0D1F3C] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50`}
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
                  {language === 'ar' ? item.labelAr : item.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="flex flex-col items-center gap-2 w-full px-2 pb-2">
          <div className="w-full h-px bg-white/5 mb-1" />
          {/* Role Switch Button */}
          <button
            className="w-full flex items-center justify-center rounded-lg h-9 text-[#8A96B0] hover:bg-white/8 hover:text-white transition-all text-xs relative group"
            onClick={handleSwitchRole}
          >
            <UserCheck size={16} />
            <div className={`absolute ${isRTL ? 'right-full mr-2' : 'left-full ml-2'} top-1/2 -translate-y-1/2 bg-[#0D1F3C] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50`}>
              {language === 'ar' ? `التبديل إلى ${userRole === 'admin' ? 'وسيط' : 'مدير'}` : `Switch to ${userRole === 'admin' ? 'Broker' : 'Admin'}`}
            </div>
          </button>
          <button
            className="w-full flex items-center justify-center rounded-lg h-9 text-[#8A96B0] hover:bg-red-500/20 hover:text-[#FF4060] transition-all relative group"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <div className={`absolute ${isRTL ? 'right-full mr-2' : 'left-full ml-2'} top-1/2 -translate-y-1/2 bg-[#0D1F3C] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50`}>
              {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
            </div>
          </button>
        </div>
      </div>

      {/* Nav Panel */}
      {navPanelOpen && (
        <div
          className="flex flex-col h-full shrink-0 overflow-hidden z-30"
          style={{
            width: '240px',
            background: 'var(--nav-bg)',
            borderRight: isRTL ? 'none' : '1px solid rgba(255,255,255,0.05)',
            borderLeft: isRTL ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}
        >
          {/* Portal Label */}
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center gap-2 mb-3">
              <div className={`px-2 py-0.5 rounded text-xs font-medium ${
                userRole === 'admin'
                  ? 'bg-[#C8102E]/20 text-[#C8102E] border border-[#C8102E]/30'
                  : 'bg-[#C8962A]/20 text-[#C8962A] border border-[#C8962A]/30'
              }`}>
                {userRole === 'admin'
                  ? (language === 'ar' ? 'بوابة الإدارة' : 'Admin Portal')
                  : (language === 'ar' ? 'بوابة الوسيط' : 'Broker Portal')}
              </div>
            </div>
            {/* Search */}
            <div className="relative">
              <Search size={14} className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-[#4A5878]`} />
              <input
                className={`w-full bg-white/5 border border-white/8 rounded-lg py-2 text-sm text-white placeholder-[#4A5878] outline-none focus:border-[#C8102E]/50 ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
                placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
              />
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex-1 overflow-y-auto px-3 py-1">
            {navItems.map((group) => (
              <div key={group.group} className="mb-4">
                <div className="text-[#4A5878] uppercase mb-1 px-2"
                  style={{ fontSize: '10px', letterSpacing: '0.08em', fontWeight: 600 }}>
                  {language === 'ar' ? group.groupAr : group.group}
                </div>
                {group.items.map((item) => {
                  const isActive = currentPath === item.path || (item.path !== '/admin' && item.path !== '/broker' && currentPath.startsWith(item.path));
                  return (
                    <button
                      key={item.path}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 mb-0.5 ${isRTL ? 'text-right' : 'text-left'} ${
                        isActive
                          ? 'bg-[#C8102E]/15 text-[#C8102E] font-medium'
                          : 'text-[#8A96B0] hover:bg-white/5 hover:text-[#E8EDF5]'
                      }`}
                      onClick={() => navigate(item.path)}
                    >
                      <item.icon size={16} className="shrink-0" />
                      <span className="flex-1">{language === 'ar' ? item.labelAr : item.label}</span>
                      {'badge' in item && item.badge && (
                        <span className="w-5 h-5 bg-[#C8102E] rounded-full text-white flex items-center justify-center shrink-0"
                          style={{ fontSize: '10px' }}>
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <div className={`w-1 h-4 bg-[#C8102E] rounded-full shrink-0 ${isRTL ? 'mr-auto' : ''}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* User Card */}
          <div className="p-3 border-t border-white/5">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-all">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #C8102E, #A00D25)', fontSize: '11px' }}>
                {currentUser.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate" style={{ fontSize: '12px' }}>
                  {language === 'ar' ? currentUser.nameAr : currentUser.name}
                </div>
                <div className="text-[#4A5878] truncate" style={{ fontSize: '11px' }}>
                  {currentUser.email}
                </div>
              </div>
              <Settings size={14} className="text-[#4A5878] shrink-0" />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <div
          className="shrink-0 flex items-center gap-4 px-5"
          style={{
            height: '52px',
            background: 'var(--topbar-bg)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              className="text-[#4A5878] hover:text-foreground transition-colors"
              onClick={() => setNavPanelOpen(p => !p)}
            >
              <Layers size={16} />
            </button>
            <ChevronRight size={14} className={`text-[#4A5878] ${isRTL ? 'rotate-180' : ''}`} />
            <span className="text-[#4A5878]" style={{ fontSize: '13px' }}>
              {userRole === 'admin'
                ? (language === 'ar' ? 'بوابة الإدارة' : 'Admin Portal')
                : (language === 'ar' ? 'بوابة الوسيط' : 'Broker Portal')}
            </span>
            <ChevronRight size={14} className={`text-[#4A5878] ${isRTL ? 'rotate-180' : ''}`} />
            <span className="text-foreground font-medium" style={{ fontSize: '13px' }}>
              {getBreadcrumb()}
            </span>
          </div>

          {/* Command Search */}
          <button
            className="flex items-center gap-3 px-4 py-1.5 rounded-lg border border-border bg-muted/50 hover:border-[#C8102E]/40 transition-all text-[#6B7A9B]"
            style={{ fontSize: '13px', minWidth: '220px' }}
            onClick={openCommandPalette}
          >
            <Search size={14} />
            <span className="flex-1 text-left">
              {language === 'ar' ? 'بحث أو اضغط ⌘K' : 'Search or press ⌘K'}
            </span>
            <div className="flex items-center gap-0.5">
              <kbd className="px-1.5 py-0.5 rounded bg-border text-[10px] font-mono">⌘</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-border text-[10px] font-mono">K</kbd>
            </div>
          </button>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:border-[#C8102E]/40 hover:bg-[#C8102E]/5 transition-all"
              style={{ fontSize: '12px' }}
              onClick={toggleLanguage}
            >
              <Globe size={14} />
              <span className="font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-border hover:border-[#C8102E]/40 hover:bg-[#C8102E]/5 transition-all"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="flex items-center justify-center w-8 h-8 rounded-lg border border-border hover:border-[#C8102E]/40 hover:bg-[#C8102E]/5 transition-all">
                <Bell size={15} />
              </button>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C8102E] rounded-full text-white flex items-center justify-center"
                style={{ fontSize: '9px' }}>2</span>
            </div>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-white font-bold"
              style={{
                background: 'linear-gradient(135deg, #C8102E, #A00D25)',
                fontSize: '11px',
                boxShadow: '0 2px 8px rgba(200,16,46,0.3)'
              }}>
              {currentUser.avatar}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-background">
          <Outlet />
        </div>

        {/* Status Bar */}
        <div
          className="shrink-0 flex items-center justify-between px-5 border-t border-border"
          style={{
            height: '28px',
            background: 'var(--topbar-bg)',
            fontSize: '11px'
          }}
        >
          <div className="flex items-center gap-3 text-[#4A5878]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C896] animate-pulse" />
              {language === 'ar' ? 'متصل' : 'Connected'}
            </span>
            <span>·</span>
            <span>{language === 'ar' ? 'آخر مزامنة: منذ دقيقتين' : 'Last sync: 2 min ago'}</span>
          </div>
          <div className="text-[#4A5878] font-mono">
            {new Date().toLocaleDateString(language === 'ar' ? 'ar-JO' : 'en-JO', {
              weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
