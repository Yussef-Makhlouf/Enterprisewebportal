import { Outlet, Navigate, useNavigate, useLocation } from 'react-router';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, Users, Shield, FileText, BookOpen,
  Bell, User, Settings, LogOut, ChevronRight,
  Globe, Sun, Moon, Search, Building2,
  ClipboardList, CreditCard, UserCheck, Layers,
  Check, AlertTriangle, CheckCircle, XCircle, ArrowRight, Settings2,
  type LucideIcon
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

/* ── Brand tokens ─────────────────────────────────── */
const GIG = {
  indigo:    '#19058C',
  roseGold:  '#D28C64',
  deepBlue:  '#1F0F4D',
  rail:      '#070D18',   /* dark mode icon rail  */
  railLight: '#1F0F4D',   /* light mode icon rail */
  navDark:   '#0F1825',   /* dark mode nav panel  */
  ocean:     '#8094E6',
  seafoam:   '#6BCABA',
} as const;

interface NavItem {
  icon: LucideIcon;
  label: string;
  labelAr: string;
  path: string;
  badge?: number;
}

interface NavGroup {
  group: string;
  groupAr: string;
  items: NavItem[];
}

/* ── Nav data ─────────────────────────────────────── */
const adminNav: NavGroup[] = [
  {
    group: 'PORTAL MANAGEMENT', groupAr: 'إدارة البوابة',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard',          labelAr: 'لوحة التحكم',       path: '/admin' },
    ]
  },
  {
    group: 'BROKER MANAGEMENT', groupAr: 'إدارة الوسطاء',
    items: [
      { icon: Users,         label: 'Manage Brokers',      labelAr: 'إدارة الوسطاء',     path: '/admin/brokers' },
      { icon: Shield,        label: 'Roles & Permissions', labelAr: 'الأدوار والصلاحيات', path: '/admin/roles' },
      { icon: ClipboardList, label: 'Audit Trail',         labelAr: 'سجل المراجعة',       path: '/admin/audit' },
    ]
  },
  {
    group: 'SHOWCASE', groupAr: 'العرض',
    items: [
      { icon: Layers,   label: 'Design System', labelAr: 'نظام التصميم', path: '/design-system' },
      { icon: BookOpen, label: 'Components',     labelAr: 'المكونات',     path: '/components' },
    ]
  }
];

const brokerNav: NavGroup[] = [
  {
    group: 'OVERVIEW', groupAr: 'نظرة عامة',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard',     labelAr: 'لوحة التحكم', path: '/broker' },
      { icon: Bell,            label: 'Notifications', labelAr: 'الإشعارات',  path: '/broker/notifications', badge: 2 },
    ]
  },
  {
    group: 'POLICY ISSUANCE', groupAr: 'إصدار الوثائق',
    items: [
      { icon: FileText, label: 'Issue Policy', labelAr: 'إصدار وثيقة', path: '/broker/issuance' },
      { icon: BookOpen, label: 'My Policies',  labelAr: 'وثائقي',       path: '/broker/policies' },
    ]
  },
  {
    group: 'ACCOUNT', groupAr: 'الحساب',
    items: [
      { icon: Users,      label: 'Sub-Brokers', labelAr: 'الوسطاء الفرعيون',  path: '/broker/sub-brokers' },
      { icon: CreditCard, label: 'Statement',   labelAr: 'كشف الحساب',        path: '/broker/statement' },
      { icon: Building2,  label: 'Corporate',   labelAr: 'العملاء المؤسسيون', path: '/broker/corporate' },
      { icon: User,       label: 'My Profile',  labelAr: 'ملفي الشخصي',       path: '/broker/profile' },
    ]
  },
  {
    group: 'SHOWCASE', groupAr: 'العرض',
    items: [
      { icon: Layers,   label: 'Design System', labelAr: 'نظام التصميم', path: '/design-system' },
      { icon: BookOpen, label: 'Components',     labelAr: 'المكونات',     path: '/components' },
    ]
  }
];

const iconRailItems = [
  { icon: LayoutDashboard, label: 'Dashboard',             labelAr: 'لوحة التحكم',
    matchPath: (p: string, r: string) => r === 'admin' ? p === '/admin' : p === '/broker' },
  { icon: Users,           label: 'Brokers / Sub-Brokers', labelAr: 'الوسطاء',
    matchPath: (p: string, r: string) => r === 'admin' ? p.startsWith('/admin/brokers') : p.startsWith('/broker/sub') },
  { icon: FileText,        label: 'Policies',              labelAr: 'الوثائق',
    matchPath: (p: string, r: string) => r === 'broker' && (p.startsWith('/broker/policies') || p.startsWith('/broker/issuance')) },
  { icon: Shield,          label: 'Roles',                 labelAr: 'الأدوار',
    matchPath: (p: string, r: string) => r === 'admin' && p.startsWith('/admin/roles') },
  { icon: ClipboardList,   label: 'Audit',                 labelAr: 'المراجعة',
    matchPath: (p: string, r: string) => r === 'admin' && p.startsWith('/admin/audit') },
  { icon: CreditCard,      label: 'Statement',             labelAr: 'الحساب',
    matchPath: (p: string, r: string) => r === 'broker' && p.startsWith('/broker/statement') },
  { icon: Bell,            label: 'Notifications',         labelAr: 'الإشعارات',
    matchPath: (p: string) => p.includes('/notifications'), badge: 2 },
  { icon: User,            label: 'Profile',               labelAr: 'الملف',
    matchPath: (p: string, r: string) => r === 'broker' && p.startsWith('/broker/profile') },
];

/* ── Component ────────────────────────────────────── */
export function Shell() {
  const {
    isAuthenticated, userRole, setUserRole, setIsAuthenticated,
    language, isRTL, toggleTheme, toggleLanguage, theme,
    openCommandPalette, currentUser
  } = useApp();
  const location  = useLocation();
  const navigate  = useNavigate();
  const [navOpen, setNavOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const RECENT_NOTIFS = [
    { id: 1, Icon: AlertTriangle, title: 'License Expiring Soon', titleAr: 'الرخصة تنتهي قريباً', time: '2h', type: 'warning', color: '#F0B030', bg: 'rgba(240,176,48,0.12)', unread: true },
    { id: 2, Icon: FileText, title: 'Policy Approval Required', titleAr: 'الموافقة على الوثيقة مطلوبة', time: '4h', type: 'approval', color: '#D28C64', bg: 'rgba(210,140,100,0.12)', unread: true },
    { id: 3, Icon: CheckCircle, title: 'Travel Policy Issued', titleAr: 'تم إصدار وثيقة السفر', time: '1d', type: 'success', color: '#00C896', bg: 'rgba(0,200,150,0.12)', unread: false },
  ];

  if (!isAuthenticated) return <Navigate to="/" replace />;

  const navItems    = userRole === 'admin' ? adminNav : brokerNav;
  const currentPath = location.pathname;
  const isAr        = language === 'ar';
  const isDark      = theme === 'dark';

  /* ── Dark-mode palette ──────────────────────────── */
  const railBg    = isDark ? GIG.rail    : GIG.railLight;
  const navBg     = isDark ? GIG.navDark : GIG.indigo;
  const topbarBg  = isDark ? GIG.navDark : '#FFFFFF';
  const topbarBdr = isDark ? 'rgba(128,148,230,0.12)' : 'rgba(25,5,140,0.10)';
  const fgMuted   = isDark ? 'rgba(160,185,245,0.55)' : 'rgba(61,53,96,0.60)';
  const fgPrimary = isDark ? '#E8F0FF' : GIG.indigo;

  /* font families */
  const ff  = isAr ? "'Almarai', Tahoma, sans-serif" : "'Georama', Verdana, sans-serif";
  const ffH = isAr ? "'Kufam', Tahoma, sans-serif"   : "'Reforma', Verdana, sans-serif";

  const getBreadcrumb = () => {
    const flat  = navItems.flatMap(g => g.items);
    const found = flat.find(i => i.path === currentPath || currentPath.startsWith(i.path + '/'));
    if (!found) return isAr ? 'لوحة التحكم' : 'Dashboard';
    return isAr ? found.labelAr : found.label;
  };

  const handleLogout     = () => { setIsAuthenticated(false); navigate('/'); };
  const handleSwitchRole = () => {
    const next = userRole === 'admin' ? 'broker' : 'admin';
    setUserRole(next);
    navigate(next === 'admin' ? '/admin' : '/broker');
  };

  /* nav item active border color */
  const activeAccent = GIG.roseGold;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">

      {/* ── Icon Rail ─────────────────────────────── */}
      <div
        className="flex flex-col items-center py-3 gap-0.5 shrink-0 z-40 relative"
        style={{
          width: '64px',
          background: railBg,
          borderInlineEnd: isDark ? '1px solid rgba(128,148,230,0.08)' : '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Logo mark */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer mb-1 shrink-0"
          style={{
            background: `linear-gradient(135deg, ${GIG.deepBlue}, ${GIG.indigo})`,
            boxShadow: isDark ? '0 4px 16px rgba(128,148,230,0.25)' : '0 4px 20px rgba(25,5,140,0.5)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
          onClick={() => navigate(userRole === 'admin' ? '/admin' : '/broker')}
        >
          <span style={{ color: '#FFFFFF', fontFamily: ffH, fontWeight: 700, fontSize: '13px', letterSpacing: '0.02em' }}>GIG</span>
        </div>

        {/* Separator */}
        <div style={{ width: '28px', height: '1px', background: 'rgba(255,255,255,0.10)', marginBottom: '6px' }} />

        {/* Icons */}
        <div className="flex-1 flex flex-col gap-0.5 w-full px-2">
          {iconRailItems.map((item) => {
            const isActive = item.matchPath(currentPath, userRole);
            const showItem =
              (userRole === 'admin' && ['Dashboard','Brokers / Sub-Brokers','Roles','Audit'].includes(item.label)) ||
              (userRole === 'broker' && ['Dashboard','Policies','Statement','Notifications','Profile'].includes(item.label));
            if (!showItem) return null;

            return (
              <div key={item.label} className="relative group w-full">
                <button
                  className="w-full flex items-center justify-center rounded-lg h-10 transition-all duration-150 relative"
                  style={{
                    background: isActive ? 'rgba(128,148,230,0.20)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.40)',
                    borderInlineStart: isActive ? `2px solid ${activeAccent}` : '2px solid transparent',
                  }}
                  onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; } }}
                  onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.40)'; } }}
                  onClick={() => {
                    const flat  = navItems.flatMap(g => g.items);
                    const found = flat.find(i => i.label === item.label || i.labelAr === item.labelAr);
                    if (found) navigate(found.path);
                  }}
                >
                  <item.icon size={17} />
                  {item.badge && (
                    <span className="absolute -top-0.5 -end-0.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
                      style={{ fontSize: '9px', fontWeight: 700, background: GIG.roseGold }}>
                      {item.badge}
                    </span>
                  )}
                </button>
                {/* Tooltip */}
                <div className="absolute start-full ms-2 top-1/2 -translate-y-1/2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 px-2 py-1 text-white"
                  style={{ fontSize: '11px', background: isDark ? '#111C2E' : GIG.deepBlue, border: isDark ? '1px solid rgba(128,148,230,0.15)' : 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.35)', fontFamily: ff }}>
                  {isAr ? item.labelAr : item.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom actions */}
        <div className="flex flex-col items-center gap-0.5 w-full px-2 pb-2">
          <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '4px' }} />
          {[
            { icon: UserCheck, fn: handleSwitchRole, tooltip: isAr ? `التبديل إلى ${userRole === 'admin' ? 'وسيط' : 'مدير'}` : `Switch to ${userRole === 'admin' ? 'Broker' : 'Admin'}`, danger: false },
            { icon: LogOut, fn: handleLogout, tooltip: isAr ? 'تسجيل الخروج' : 'Sign Out', danger: true },
          ].map(({ icon: Icon, fn, tooltip, danger }) => (
            <div key={tooltip} className="relative group w-full">
              <button
                className="w-full flex items-center justify-center rounded-lg h-9 transition-all"
                style={{ color: 'rgba(255,255,255,0.40)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = danger ? 'rgba(210,140,100,0.18)' : 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.color = danger ? GIG.roseGold : '#FFFFFF';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.40)';
                }}
                onClick={fn}
              >
                <Icon size={15} />
              </button>
              <div className="absolute start-full ms-2 top-1/2 -translate-y-1/2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 px-2 py-1 text-white"
                style={{ fontSize: '11px', background: isDark ? '#111C2E' : GIG.deepBlue, border: isDark ? '1px solid rgba(128,148,230,0.15)' : 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.35)', fontFamily: ff }}>
                {tooltip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Nav Panel ─────────────────────────────── */}
      {navOpen && (
        <div
          className="gig-sidebar-watermark flex flex-col h-full shrink-0 overflow-hidden z-30"
          style={{
            width: '232px',
            background: navBg,
            borderInlineEnd: isDark ? '1px solid rgba(128,148,230,0.10)' : '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Portal badge + search */}
          <div className="px-4 pt-4 pb-3 relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase"
                style={{
                  background: 'rgba(210,140,100,0.15)',
                  color: GIG.roseGold,
                  border: '1px solid rgba(210,140,100,0.28)',
                  letterSpacing: '0.10em',
                  fontFamily: ff,
                }}
              >
                {userRole === 'admin'
                  ? (isAr ? 'بوابة الإدارة' : 'Admin Portal')
                  : (isAr ? 'بوابة الوسيط' : 'Broker Portal')}
              </span>
            </div>
            <div className="relative">
              <Search size={13} className={`absolute ${isRTL ? 'end-3' : 'start-3'} top-1/2 -translate-y-1/2`}
                style={{ color: 'rgba(255,255,255,0.30)' }} />
              <input
                className={`w-full rounded-lg py-2 text-white outline-none transition-all ${isRTL ? 'pe-9 ps-3' : 'ps-9 pe-3'}`}
                style={{
                  fontSize: '12px',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.07)',
                  border: isDark ? '1px solid rgba(128,148,230,0.14)' : '1px solid rgba(255,255,255,0.12)',
                  fontFamily: ff,
                }}
                placeholder={isAr ? 'بحث...' : 'Search...'}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(210,140,100,0.50)'; }}
                onBlur={e  => { e.currentTarget.style.borderColor = isDark ? 'rgba(128,148,230,0.14)' : 'rgba(255,255,255,0.12)'; }}
              />
            </div>
          </div>

          {/* Nav items */}
          <div className="flex-1 overflow-y-auto px-3 py-1 relative z-10">
            {navItems.map((group) => (
              <div key={group.group} className="mb-5">
                <div className="mb-1.5 px-2"
                  style={{
                    fontSize: '10px',
                    letterSpacing: isAr ? '0.04em' : '0.12em',
                    fontWeight: 700,
                    color: isDark ? 'rgba(128,148,230,0.70)' : 'rgba(255,255,255,0.45)',
                    fontFamily: ff,
                    textAlign: isRTL ? 'right' : 'left',
                    textTransform: 'uppercase',
                  }}>
                  {isAr ? group.groupAr : group.group}
                </div>
                {group.items.map((item) => {
                  const isActive = currentPath === item.path ||
                    (item.path !== '/admin' && item.path !== '/broker' && currentPath.startsWith(item.path));
                  return (
                    <button
                      key={item.path}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all duration-150"
                      style={{
                        textAlign: isRTL ? 'right' : 'left',
                        background: isActive
                          ? (isDark ? 'rgba(210,140,100,0.14)' : 'rgba(255,255,255,0.18)')
                          : 'transparent',
                        color: isActive ? '#FFFFFF' : (isDark ? 'rgba(180,205,255,0.60)' : 'rgba(255,255,255,0.80)'),
                        borderInlineStart: isActive ? `2px solid ${activeAccent}` : '2px solid transparent',
                        fontFamily: ff,
                        fontWeight: isActive ? 600 : 400,
                        fontSize: '13px',
                      }}
                      onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.13)'; (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; } }}
                      onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = isDark ? 'rgba(180,205,255,0.60)' : 'rgba(255,255,255,0.80)'; } }}
                      onClick={() => navigate(item.path)}
                    >
                      <item.icon size={15} className="shrink-0" />
                      <span className="flex-1">{isAr ? item.labelAr : item.label}</span>
                      {'badge' in item && item.badge && (
                        <span className="w-5 h-5 rounded-full text-white flex items-center justify-center shrink-0"
                          style={{ fontSize: '10px', fontWeight: 700, background: GIG.roseGold }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* User profile strip */}
          <div className="p-3 relative z-10"
            style={{ borderTop: isDark ? '1px solid rgba(128,148,230,0.10)' : '1px solid rgba(255,255,255,0.08)' }}>
            <div
              className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition-all"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white"
                style={{ background: `linear-gradient(135deg, ${GIG.ocean}, ${GIG.indigo})`, fontSize: '11px', fontWeight: 700 }}>
                {currentUser.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white truncate" style={{ fontSize: '12px', fontWeight: 600, fontFamily: ff }}>
                  {isAr ? currentUser.nameAr : currentUser.name}
                </div>
                <div className="truncate" style={{ fontSize: '11px', color: isDark ? 'rgba(160,185,245,0.45)' : 'rgba(255,255,255,0.45)' }}>
                  {currentUser.email}
                </div>
              </div>
              <Settings size={13} style={{ color: isDark ? 'rgba(160,185,245,0.35)' : 'rgba(255,255,255,0.38)', flexShrink: 0 }} />
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ──────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <div
          className="shrink-0 flex items-center gap-4 px-5"
          style={{ height: '58px', background: topbarBg, borderBottom: `1px solid ${topbarBdr}` }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              className="transition-colors"
              style={{ color: fgMuted }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GIG.roseGold; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = fgMuted; }}
              onClick={() => setNavOpen(p => !p)}
            >
              <Layers size={17} />
            </button>
            <ChevronRight size={13} className={isRTL ? 'rotate-180' : ''} style={{ color: fgMuted }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: fgMuted, fontFamily: ff }}>
              {userRole === 'admin'
                ? (isAr ? 'بوابة الإدارة' : 'Admin Portal')
                : (isAr ? 'بوابة الوسيط' : 'Broker Portal')}
            </span>
            <ChevronRight size={13} className={isRTL ? 'rotate-180' : ''} style={{ color: fgMuted }} />
            <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.03em', color: fgPrimary, fontFamily: ffH }}>
              {getBreadcrumb()}
            </span>
          </div>

          {/* Search trigger */}
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-full transition-all"
            style={{
              fontSize: '12px', minWidth: '216px',
              background: isDark ? 'rgba(128,148,230,0.07)' : '#F8F7FC',
              border: `1px solid ${isDark ? 'rgba(128,148,230,0.14)' : 'rgba(25,5,140,0.10)'}`,
              color: fgMuted, fontFamily: ff,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(210,140,100,0.45)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = isDark ? 'rgba(128,148,230,0.14)' : 'rgba(25,5,140,0.10)'; }}
            onClick={openCommandPalette}
          >
            <Search size={13} />
            <span className="flex-1 text-start" style={{ fontWeight: 500 }}>
              {isAr ? 'بحث أو اضغط ⌘K' : 'Search or press ⌘K'}
            </span>
            <div className="flex items-center gap-1">
              {['⌘','K'].map(k => (
                <kbd key={k} style={{
                  padding: '2px 5px', borderRadius: '4px', fontSize: '9px', fontFamily: 'monospace', fontWeight: 700,
                  background: isDark ? 'rgba(128,148,230,0.12)' : '#FFFFFF',
                  border: `1px solid ${isDark ? 'rgba(128,148,230,0.20)' : 'rgba(25,5,140,0.12)'}`,
                  color: isDark ? '#E8F0FF' : GIG.indigo,
                }}>{k}</kbd>
              ))}
            </div>
          </button>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language */}
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all"
              style={{ fontSize: '12px', fontWeight: 700, color: fgPrimary, border: `1px solid ${topbarBdr}`, fontFamily: ff }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(210,140,100,0.45)'; (e.currentTarget as HTMLElement).style.background = 'rgba(210,140,100,0.08)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = topbarBdr; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              onClick={toggleLanguage}
            >
              <Globe size={13} />
              <span>{language === 'en' ? 'AR' : 'EN'}</span>
            </button>

            {/* Theme toggle */}
            <button
              className="flex items-center justify-center w-9 h-9 rounded-full transition-all"
              style={{ color: fgPrimary, border: `1px solid ${topbarBdr}` }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(210,140,100,0.45)'; (e.currentTarget as HTMLElement).style.background = 'rgba(210,140,100,0.08)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = topbarBdr; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              onClick={toggleTheme}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Notifications bell */}
            <div className="relative" ref={notifRef}>
              <button
                className="flex items-center justify-center w-9 h-9 rounded-full transition-all"
                style={{
                  color: fgPrimary, border: `1px solid ${topbarBdr}`,
                  background: notifOpen ? 'rgba(210,140,100,0.12)' : 'transparent',
                  borderColor: notifOpen ? 'rgba(210,140,100,0.45)' : topbarBdr,
                }}
                onMouseEnter={e => { if (!notifOpen) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(210,140,100,0.45)'; (e.currentTarget as HTMLElement).style.background = 'rgba(210,140,100,0.08)'; } }}
                onMouseLeave={e => { if (!notifOpen) { (e.currentTarget as HTMLElement).style.borderColor = topbarBdr; (e.currentTarget as HTMLElement).style.background = 'transparent'; } }}
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Bell size={15} />
              </button>
              <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full text-white flex items-center justify-center"
                style={{ fontSize: '9px', fontWeight: 700, background: GIG.roseGold }}>2</span>

              {/* Dropdown Panel */}
              {notifOpen && (
                <div
                  className="absolute top-full mt-3 z-50 overflow-hidden"
                  style={{
                    [isRTL ? 'left' : 'right']: '-10px',
                    width: '320px',
                    background: isDark ? 'linear-gradient(145deg, #111C2E 0%, #172236 100%)' : '#FFFFFF',
                    border: `1px solid ${topbarBdr}`,
                    borderRadius: '12px',
                    boxShadow: isDark ? '0 20px 48px rgba(0,0,0,0.50)' : '0 10px 30px rgba(25,5,140,0.12)',
                    direction: isRTL ? 'rtl' : 'ltr',
                  }}
                >
                  <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: topbarBdr }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 700, color: fgPrimary, fontFamily: ffH }}>
                      {isAr ? 'الإشعارات' : 'Notifications'}
                    </h3>
                    <button className="text-[10px] font-bold uppercase tracking-wider hover:opacity-80"
                      style={{ color: GIG.roseGold, fontFamily: ff }}>
                      {isAr ? 'تعليم الكل كمقروء' : 'Mark all read'}
                    </button>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto">
                    {RECENT_NOTIFS.map((n) => (
                      <div key={n.id} className="px-4 py-3 flex items-start gap-3 border-b last:border-0 hover:bg-white/5 transition-all cursor-pointer"
                        style={{ borderColor: topbarBdr }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: n.bg }}>
                          <n.Icon size={14} style={{ color: n.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p style={{ fontSize: '12px', fontWeight: n.unread ? 700 : 500, color: fgPrimary, fontFamily: ff }}>
                            {isAr ? n.titleAr : n.title}
                          </p>
                          <p style={{ fontSize: '10px', color: fgMuted, marginTop: '2px', fontFamily: ff }}>{n.time}</p>
                        </div>
                        {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-roseGold shrink-0 mt-2" style={{ background: GIG.roseGold }} />}
                      </div>
                    ))}
                  </div>

                  <button
                    className="w-full py-2.5 text-center text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-white/5"
                    style={{ color: fgMuted, borderTop: `1px solid ${topbarBdr}`, fontFamily: ff }}
                    onClick={() => { setNotifOpen(false); navigate('/broker/notifications'); }}
                  >
                    {isAr ? 'عرض الكل' : 'View All Notifications'}
                  </button>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer text-white"
              style={{
                background: `linear-gradient(135deg, ${isDark ? GIG.ocean : GIG.deepBlue}, ${GIG.indigo})`,
                fontSize: '12px', fontWeight: 700,
                boxShadow: isDark ? '0 2px 10px rgba(128,148,230,0.35)' : '0 2px 10px rgba(25,5,140,0.4)',
              }}>
              {currentUser.avatar}
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto bg-background gig-texture-bg">
          <Outlet />
        </div>

        {/* Status bar */}
        <div
          className="shrink-0 flex items-center justify-between px-5"
          style={{ height: '26px', background: topbarBg, borderTop: `1px solid ${topbarBdr}`, fontSize: '11px' }}
        >
          <div className="flex items-center gap-3" style={{ color: fgMuted, fontFamily: ff }}>
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GIG.seafoam }} />
              {isAr ? 'متصل' : 'Connected'}
            </span>
            <span>·</span>
            <span>{isAr ? 'آخر مزامنة: منذ دقيقتين' : 'Last sync: 2 min ago'}</span>
          </div>
          <div style={{ color: fgMuted, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}>
            {new Date().toLocaleDateString(isAr ? 'ar-JO' : 'en-JO', {
              weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
            }).toUpperCase()}
          </div>
        </div>

        {/* Rose-Gold brand bar */}
        <div style={{ height: '3px', background: `linear-gradient(90deg, ${GIG.roseGold} 0%, #E8B98A 50%, ${GIG.roseGold} 100%)`, flexShrink: 0 }} />
      </div>
    </div>
  );
}