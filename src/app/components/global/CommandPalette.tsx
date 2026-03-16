import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Search, ArrowRight, LayoutDashboard, Users, FileText, Shield, ClipboardList, Bell, User, CreditCard, Building2, Layers } from 'lucide-react';

const PAGES = [
  { label: 'Admin Dashboard', labelAr: 'لوحة تحكم الإدارة', path: '/admin', icon: LayoutDashboard },
  { label: 'Manage Brokers', labelAr: 'إدارة الوسطاء', path: '/admin/brokers', icon: Users },
  { label: 'Roles & Permissions', labelAr: 'الأدوار والصلاحيات', path: '/admin/roles', icon: Shield },
  { label: 'Audit Trail', labelAr: 'سجل المراجعة', path: '/admin/audit', icon: ClipboardList },
  { label: 'Broker Dashboard', labelAr: 'لوحة تحكم الوسيط', path: '/broker', icon: LayoutDashboard },
  { label: 'Issue Policy', labelAr: 'إصدار وثيقة', path: '/broker/issuance', icon: FileText },
  { label: 'My Policies', labelAr: 'وثائقي', path: '/broker/policies', icon: FileText },
  { label: 'Sub-Brokers', labelAr: 'الوسطاء الفرعيون', path: '/broker/sub-brokers', icon: Users },
  { label: 'Statement', labelAr: 'كشف الحساب', path: '/broker/statement', icon: CreditCard },
  { label: 'Notifications', labelAr: 'الإشعارات', path: '/broker/notifications', icon: Bell },
  { label: 'My Profile', labelAr: 'ملفي الشخصي', path: '/broker/profile', icon: User },
  { label: 'Corporate Registration', labelAr: 'تسجيل مؤسسي', path: '/broker/corporate', icon: Building2 },
  { label: 'Design System', labelAr: 'نظام التصميم', path: '/design-system', icon: Layers },
];

const QUICK_ACTIONS = [
  { label: 'Issue Travel Policy', labelAr: 'إصدار وثيقة سفر', path: '/broker/issuance/travel' },
  { label: 'Issue Motor Policy', labelAr: 'إصدار وثيقة مركبة', path: '/broker/issuance/motor' },
  { label: 'Send Broker Invitation', labelAr: 'إرسال دعوة وسيط', path: '/admin/brokers' },
  { label: 'View Notifications', labelAr: 'عرض الإشعارات', path: '/broker/notifications' },
];

export function CommandPalette() {
  const { isCommandPaletteOpen, closeCommandPalette, theme, language, isRTL } = useApp();
  const navigate = useNavigate();
  const isAr = language === 'ar';
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isCommandPaletteOpen ? closeCommandPalette() : (window as any).__openCommandPalette?.();
      }
      if (e.key === 'Escape') closeCommandPalette();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filtered = PAGES.filter(p =>
    !query ||
    p.label.toLowerCase().includes(query.toLowerCase()) ||
    p.labelAr.includes(query)
  );

  const cardBg = theme === 'dark' ? '#0F1A2E' : '#FFFFFF';
  const textPrimary = theme === 'dark' ? '#E8EDF5' : '#0D1F3C';
  const textSecondary = theme === 'dark' ? '#6B7A9B' : '#6B7A9B';
  const borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(13,31,60,0.1)';
  const hoverBg = theme === 'dark' ? 'rgba(200,16,46,0.1)' : 'rgba(200,16,46,0.06)';

  const handleSelect = (path: string) => {
    navigate(path);
    closeCommandPalette();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24"
      style={{ background: 'rgba(7, 14, 28, 0.7)', backdropFilter: 'blur(8px)' }}
      onClick={closeCommandPalette}>
      <div
        className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: cardBg, border: `1px solid ${borderColor}` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b" style={{ borderColor }}>
          <Search size={18} style={{ color: textSecondary, flexShrink: 0 }} />
          <input
            autoFocus
            className="flex-1 bg-transparent outline-none text-base"
            style={{ color: textPrimary, fontFamily: isAr ? "'Tajawal', sans-serif" : "'IBM Plex Sans', sans-serif" }}
            placeholder={isAr ? 'ابحث في البوابة...' : 'Search the portal...'}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <kbd className="px-2 py-1 rounded text-xs font-mono border" style={{ borderColor, color: textSecondary }}>Esc</kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto py-2">
          {/* Pages */}
          {!query && (
            <div className="px-4 py-2 mb-1">
              <span style={{ fontSize: '11px', fontWeight: 700, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {isAr ? 'الصفحات' : 'PAGES'}
              </span>
            </div>
          )}
          {filtered.slice(0, query ? 8 : 5).map(page => (
            <button key={page.path}
              className="w-full flex items-center gap-3 px-4 py-2.5 transition-all hover:bg-opacity-100"
              style={{ textAlign: isRTL ? 'right' : 'left' }}
              onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onClick={() => handleSelect(page.path)}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#F0F4FA' }}>
                <page.icon size={15} style={{ color: '#C8102E' }} />
              </div>
              <span style={{ fontSize: '14px', color: textPrimary, flex: 1 }}>
                {isAr ? page.labelAr : page.label}
              </span>
              <ArrowRight size={14} style={{ color: textSecondary }} className={isRTL ? 'rotate-180' : ''} />
            </button>
          ))}

          {/* Quick Actions */}
          {!query && (
            <>
              <div className="px-4 pt-3 pb-2 border-t mt-2" style={{ borderColor }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {isAr ? 'الإجراءات السريعة' : 'QUICK ACTIONS'}
                </span>
              </div>
              {QUICK_ACTIONS.map(action => (
                <button key={action.path}
                  className="w-full flex items-center gap-3 px-4 py-2.5 transition-all"
                  style={{ textAlign: isRTL ? 'right' : 'left' }}
                  onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => handleSelect(action.path)}
                >
                  <div className="w-2 h-2 rounded-full bg-[#C8102E] ml-3 shrink-0" />
                  <span style={{ fontSize: '14px', color: textPrimary }}>{isAr ? action.labelAr : action.label}</span>
                </button>
              ))}

              <div className="px-4 pt-3 pb-2 border-t mt-2" style={{ borderColor }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {isAr ? 'الأخيرة' : 'RECENT'}
                </span>
              </div>
              {['/admin', '/admin/brokers', '/broker/issuance'].map((p, i) => {
                const page = PAGES.find(pg => pg.path === p);
                if (!page) return null;
                return (
                  <button key={p}
                    className="w-full flex items-center gap-3 px-4 py-2.5 transition-all"
                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                    onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    onClick={() => handleSelect(p)}
                  >
                    <span style={{ fontSize: '12px', color: textSecondary }}>🕐</span>
                    <span style={{ fontSize: '14px', color: textSecondary }}>{isAr ? page.labelAr : page.label}</span>
                  </button>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-3 border-t" style={{ borderColor }}>
          {[
            { keys: ['↑', '↓'], label: isAr ? 'تنقل' : 'navigate' },
            { keys: ['↵'], label: isAr ? 'اختيار' : 'select' },
            { keys: ['Esc'], label: isAr ? 'إغلاق' : 'close' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              {item.keys.map(k => (
                <kbd key={k} className="px-1.5 py-0.5 rounded border font-mono"
                  style={{ fontSize: '10px', borderColor, color: textSecondary, background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : '#F5F7FB' }}>
                  {k}
                </kbd>
              ))}
              <span style={{ fontSize: '11px', color: textSecondary }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
