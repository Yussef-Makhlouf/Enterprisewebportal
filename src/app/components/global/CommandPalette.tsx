import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Search, ArrowRight, LayoutDashboard, Users, FileText, Shield, ClipboardList, Bell, User, CreditCard, Building2, Layers } from 'lucide-react';
import { B, cardBg, cardBdr, textHero, textMuted } from '../../utils/darkPalette';

const PAGES = [
  { label: 'Admin Dashboard',        labelAr: 'لوحة تحكم الإدارة',    path: '/admin',                icon: LayoutDashboard },
  { label: 'Manage Brokers',         labelAr: 'إدارة الوسطاء',         path: '/admin/brokers',        icon: Users           },
  { label: 'Roles & Permissions',    labelAr: 'الأدوار والصلاحيات',    path: '/admin/roles',          icon: Shield          },
  { label: 'Audit Trail',            labelAr: 'سجل المراجعة',           path: '/admin/audit',          icon: ClipboardList   },
  { label: 'Broker Dashboard',       labelAr: 'لوحة تحكم الوسيط',      path: '/broker',               icon: LayoutDashboard },
  { label: 'Issue Policy',           labelAr: 'إصدار وثيقة',            path: '/broker/issuance',      icon: FileText        },
  { label: 'My Policies',            labelAr: 'وثائقي',                 path: '/broker/policies',      icon: FileText        },
  { label: 'Sub-Brokers',            labelAr: 'الوسطاء الفرعيون',      path: '/broker/sub-brokers',   icon: Users           },
  { label: 'Statement',              labelAr: 'كشف الحساب',             path: '/broker/statement',     icon: CreditCard      },
  { label: 'Notifications',          labelAr: 'الإشعارات',              path: '/broker/notifications', icon: Bell            },
  { label: 'My Profile',             labelAr: 'ملفي الشخصي',           path: '/broker/profile',       icon: User            },
  { label: 'Corporate Registration', labelAr: 'تسجيل مؤسسي',           path: '/broker/corporate',     icon: Building2       },
  { label: 'Design System',          labelAr: 'نظام التصميم',           path: '/design-system',        icon: Layers          },
];

const QUICK_ACTIONS = [
  { label: 'Issue Travel Policy',    labelAr: 'إصدار وثيقة سفر',  path: '/broker/issuance/travel' },
  { label: 'Issue Motor Policy',     labelAr: 'إصدار وثيقة مركبة',path: '/broker/issuance/motor'  },
  { label: 'Send Broker Invitation', labelAr: 'إرسال دعوة وسيط',  path: '/admin/brokers'          },
  { label: 'View Notifications',     labelAr: 'عرض الإشعارات',    path: '/broker/notifications'   },
];

export function CommandPalette() {
  const { isCommandPaletteOpen, closeCommandPalette, theme, language, isRTL } = useApp();
  const navigate = useNavigate();
  const isAr  = language === 'ar';
  const isDark = theme === 'dark';
  const [q, setQ] = useState('');

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
    !q || p.label.toLowerCase().includes(q.toLowerCase()) || p.labelAr.includes(q)
  );

  const bg  = cardBg(isDark);
  const bdr = cardBdr(isDark);
  const tH  = textHero(isDark);
  const tM  = textMuted(isDark);
  const ff  = isAr ? "'Almarai', Tahoma, sans-serif" : "'Georama', Verdana, sans-serif";
  const hoverBg = isDark ? 'rgba(128,148,230,0.10)' : 'rgba(25,5,140,0.05)';

  const handleSelect = (path: string) => {
    navigate(path);
    closeCommandPalette();
    setQ('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24"
      style={{ background: 'rgba(7,13,24,0.80)', backdropFilter: 'blur(10px)' }}
      onClick={closeCommandPalette}>
      <div
        className="w-full max-w-xl rounded-2xl overflow-hidden"
        style={{
          background: bg,
          border: `1px solid ${bdr}`,
          boxShadow: isDark
            ? '0 24px 64px rgba(0,0,0,0.70), inset 0 1px 0 rgba(128,148,230,0.12)'
            : '0 8px 40px rgba(25,5,140,0.15)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b" style={{ borderColor: bdr }}>
          <Search size={18} style={{ color: tM, flexShrink: 0 }} />
          <input
            autoFocus
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: '15px', color: tH, fontFamily: ff }}
            placeholder={isAr ? 'ابحث في البوابة...' : 'Search the portal...'}
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <kbd className="px-2 py-1 rounded text-xs font-mono border"
            style={{ borderColor: bdr, color: tM, background: isDark ? 'rgba(128,148,230,0.08)' : '#F5F7FB' }}>Esc</kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto py-2">
          {!q && (
            <div className="px-4 py-2 mb-1">
              <span style={{ fontSize: '10px', fontWeight: 700, color: tM, textTransform: 'uppercase', letterSpacing: '0.10em', fontFamily: ff }}>
                {isAr ? 'الصفحات' : 'PAGES'}
              </span>
            </div>
          )}
          {filtered.slice(0, q ? 8 : 5).map(page => (
            <button key={page.path}
              className="w-full flex items-center gap-3 px-4 py-2.5 transition-all"
              style={{ textAlign: isRTL ? 'right' : 'left' }}
              onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onClick={() => handleSelect(page.path)}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: isDark ? 'rgba(128,148,230,0.10)' : '#F0F4FA' }}>
                <page.icon size={15} style={{ color: isDark ? B.ocean : B.indigo }} />
              </div>
              <span style={{ fontSize: '14px', color: tH, flex: 1, fontFamily: ff }}>
                {isAr ? page.labelAr : page.label}
              </span>
              <ArrowRight size={14} style={{ color: tM }} className={isRTL ? 'rotate-180' : ''} />
            </button>
          ))}

          {!q && (
            <>
              <div className="px-4 pt-3 pb-2 border-t mt-2" style={{ borderColor: bdr }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: tM, textTransform: 'uppercase', letterSpacing: '0.10em', fontFamily: ff }}>
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
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: B.roseGold }} />
                  <span style={{ fontSize: '14px', color: tH, fontFamily: ff }}>{isAr ? action.labelAr : action.label}</span>
                </button>
              ))}

              <div className="px-4 pt-3 pb-2 border-t mt-2" style={{ borderColor: bdr }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: tM, textTransform: 'uppercase', letterSpacing: '0.10em', fontFamily: ff }}>
                  {isAr ? 'الأخيرة' : 'RECENT'}
                </span>
              </div>
              {['/admin', '/admin/brokers', '/broker/issuance'].map(p => {
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
                    <span style={{ fontSize: '12px', color: tM }}>🕐</span>
                    <span style={{ fontSize: '14px', color: tM, fontFamily: ff }}>{isAr ? page.labelAr : page.label}</span>
                  </button>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-3 border-t" style={{ borderColor: bdr }}>
          {[
            { keys: ['↑', '↓'], label: isAr ? 'تنقل'  : 'navigate' },
            { keys: ['↵'],      label: isAr ? 'اختيار' : 'select'   },
            { keys: ['Esc'],    label: isAr ? 'إغلاق'  : 'close'    },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              {item.keys.map(k => (
                <kbd key={k} className="px-1.5 py-0.5 rounded border font-mono"
                  style={{ fontSize: '10px', borderColor: bdr, color: tM, background: isDark ? 'rgba(128,148,230,0.08)' : '#F5F7FB' }}>
                  {k}
                </kbd>
              ))}
              <span style={{ fontSize: '11px', color: tM, fontFamily: ff }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
