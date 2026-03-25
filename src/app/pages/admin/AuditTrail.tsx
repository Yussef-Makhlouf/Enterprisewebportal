import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download, Search, LogIn, Pencil, Mail, CheckCircle,
  Ban, KeyRound, ClipboardList, Plane, type LucideIcon
} from 'lucide-react';

interface AuditItem {
  id: number;
  Icon: LucideIcon;
  action: string;
  actionAr: string;
  desc: string;
  descAr: string;
  user: string;
  userAr: string;
  time: string;
  color: string;
  type: string;
}

const AUDIT_ITEMS: AuditItem[] = [
  {
    id: 1, Icon: LogIn,
    action: 'User Login', actionAr: 'تسجيل دخول مستخدم',
    desc: 'Ahmed Al-Rashidi logged in from IP 192.168.1.45', descAr: 'أحمد الراشدي سجّل دخوله من IP 192.168.1.45',
    user: 'Ahmed Al-Rashidi', userAr: 'أحمد الراشدي',
    time: 'Today, 09:15', color: '#0DB4CC', type: 'auth'
  },
  {
    id: 2, Icon: Pencil,
    action: 'Broker Profile Edited', actionAr: 'تعديل ملف وسيط',
    desc: 'LOBs updated for Khalid Al-Mansouri — added Medical coverage', descAr: 'تم تحديث خطوط الأعمال لخالد المنصوري — إضافة التغطية الطبية',
    user: 'Ahmed Al-Rashidi', userAr: 'أحمد الراشدي',
    time: 'Today, 08:44', color: '#C8962A', type: 'edit'
  },
  {
    id: 3, Icon: Mail,
    action: 'Invitation Sent', actionAr: 'إرسال دعوة',
    desc: 'Portal invitation sent to sara.qasim@email.com', descAr: 'تم إرسال دعوة البوابة إلى sara.qasim@email.com',
    user: 'Ahmed Al-Rashidi', userAr: 'أحمد الراشدي',
    time: 'Today, 08:30', color: '#00C896', type: 'invite'
  },
  {
    id: 4, Icon: CheckCircle,
    action: 'License Renewed', actionAr: 'تجديد رخصة',
    desc: 'License LIC-2024-004821 renewed until 31/12/2025', descAr: 'تم تجديد الرخصة LIC-2024-004821 حتى 31/12/2025',
    user: 'Sara Al-Qasim', userAr: 'سارة القاسم',
    time: 'Yesterday, 16:20', color: '#00C896', type: 'approval'
  },
  {
    id: 5, Icon: Ban,
    action: 'Account Blocked', actionAr: 'حظر حساب',
    desc: 'Broker account for Rania Khalil has been blocked', descAr: 'تم حظر حساب وسيط رانيا خليل',
    user: 'Ahmed Al-Rashidi', userAr: 'أحمد الراشدي',
    time: 'Yesterday, 14:05', color: '#D28C64', type: 'block'
  },
  {
    id: 6, Icon: KeyRound,
    action: 'Password Changed', actionAr: 'تغيير كلمة المرور',
    desc: 'Password changed for Hassan Al-Rawabdeh account', descAr: 'تم تغيير كلمة المرور لحساب حسن الروابدة',
    user: 'Hassan Al-Rawabdeh', userAr: 'حسن الروابدة',
    time: 'Yesterday, 11:30', color: '#0DB4CC', type: 'auth'
  },
  {
    id: 7, Icon: ClipboardList,
    action: 'Role Assigned', actionAr: 'تعيين دور',
    desc: 'Travel Broker role assigned to Layla Nasser', descAr: 'تم تعيين دور وسيط السفر لليلى ناصر',
    user: 'Ahmed Al-Rashidi', userAr: 'أحمد الراشدي',
    time: '2 days ago', color: '#7B61FF', type: 'edit'
  },
  {
    id: 8, Icon: Plane,
    action: 'Policy Issued', actionAr: 'إصدار وثيقة',
    desc: 'Travel policy POL-2025-45182 issued for Ahmad', descAr: 'تم إصدار وثيقة سفر POL-2025-45182 لأحمد',
    user: 'Khalid Al-Mansouri', userAr: 'خالد المنصوري',
    time: '2 days ago', color: '#8094E6', type: 'approval'
  },
];

export function AuditTrail() {
  const { theme, language, isRTL } = useApp();
  const isAr = language === 'ar';
  const [actionFilter, setActionFilter] = useState('All');
  const [search, setSearch] = useState('');

  const isDark = theme === 'dark';
  const bg          = isDark ? '#070D18' : '#F8F7FC';
  const cardBg      = isDark ? 'linear-gradient(145deg, #111C2E 0%, #172236 100%)' : '#FFFFFF';
  const textPrimary = isDark ? '#E8F0FF' : '#19058C';
  const textSecondary = isDark ? 'rgba(180,205,255,0.65)' : '#3D3560';
  const borderColor   = isDark ? 'rgba(128,148,230,0.16)' : 'rgba(13,31,60,0.10)';
  const rowBg         = isDark ? 'rgba(128,148,230,0.05)' : '#F5F7FB';

  const filtered = AUDIT_ITEMS.filter(a => {
    const matchSearch = !search || a.action.toLowerCase().includes(search.toLowerCase()) || a.user.toLowerCase().includes(search.toLowerCase());
    const matchFilter = actionFilter === 'All' || a.type === actionFilter.toLowerCase();
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-5 min-h-full" style={{ background: bg }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: textPrimary }}>
            {isAr ? 'سجل المراجعة' : 'Audit Trail'}
          </h1>
          <p style={{ fontSize: '13px', color: textSecondary }}>
            {isAr ? 'سجل كامل لجميع أنشطة النظام' : 'Complete log of all system activities'}
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 hover:opacity-80"
          style={{ borderColor, color: textSecondary }}
        >
          <Download size={15} />
          {isAr ? 'تصدير' : 'Export'}
        </button>
      </div>

      <div className="flex gap-4">
        {/* Filter Sidebar */}
        <div className="shrink-0 rounded-xl p-4 space-y-5" style={{ width: '220px', background: cardBg, border: `1px solid ${borderColor}` }}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>
            {isAr ? 'تصفية النتائج' : 'Filter Results'}
          </h3>

          {/* Action Type */}
          <div>
            <label className="block mb-2" style={{ fontSize: '11px', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {isAr ? 'نوع الإجراء' : 'Action Type'}
            </label>
            <div className="space-y-1">
              {[
                { key: 'All', label: isAr ? 'الكل' : 'All' },
                { key: 'auth', label: isAr ? 'تسجيل دخول' : 'Login' },
                { key: 'edit', label: isAr ? 'تعديل' : 'Edit' },
                { key: 'invite', label: isAr ? 'دعوة' : 'Invite' },
                { key: 'approval', label: isAr ? 'موافقة' : 'Approval' },
                { key: 'block', label: isAr ? 'حظر' : 'Block' },
              ].map(opt => (
                <button
                  key={opt.key}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                  style={{
                    background: actionFilter === opt.key ? 'rgba(25,5,140,0.10)' : 'transparent',
                    color: actionFilter === opt.key ? '#19058C' : textSecondary,
                    fontWeight: actionFilter === opt.key ? 600 : 400,
                    textAlign: isRTL ? 'right' : 'left',
                  }}
                  onClick={() => setActionFilter(opt.key)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* User Filter */}
          <div>
            <label className="block mb-2" style={{ fontSize: '11px', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {isAr ? 'المستخدم' : 'User'}
            </label>
            <select className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
              style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB', borderColor, color: textPrimary }}>
              <option>{isAr ? 'جميع المستخدمين' : 'All Users'}</option>
              <option>Ahmed Al-Rashidi</option>
              <option>Sara Al-Qasim</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block mb-2" style={{ fontSize: '11px', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {isAr ? 'النطاق الزمني' : 'Date Range'}
            </label>
            <div className="space-y-2">
              <input type="date" className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB', borderColor, color: textPrimary }} />
              <input type="date" className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#F5F7FB', borderColor, color: textPrimary }} />
            </div>
          </div>

          <button
            className="w-full py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90"
            style={{ background: '#19058C', boxShadow: '0 2px 8px rgba(25,5,140,0.30)' }}
          >
            {isAr ? 'تطبيق الفلتر' : 'Apply Filter'}
          </button>
        </div>

        {/* Timeline */}
        <div className="flex-1 rounded-xl overflow-hidden" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
          {/* Search bar */}
          <div className="px-4 py-3 border-b" style={{ borderColor }}>
            <div className="relative">
              <Search size={14} className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} style={{ color: textSecondary }} />
              <input
                className="w-full rounded-lg border py-2 text-sm outline-none"
                style={{
                  background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#F5F7FB',
                  borderColor,
                  color: textPrimary,
                  paddingLeft: isRTL ? '12px' : '36px',
                  paddingRight: isRTL ? '36px' : '12px',
                }}
                placeholder={isAr ? 'بحث في السجل...' : 'Search audit log...'}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Timeline items */}
          <div className="p-5 space-y-1">
            {filtered.length === 0 ? (
              <div className="py-12 text-center">
                <Search size={32} style={{ color: textSecondary, margin: '0 auto 12px' }} />
                <p style={{ fontSize: '14px', color: textSecondary }}>{isAr ? 'لا توجد نتائج' : 'No results found'}</p>
              </div>
            ) : filtered.map((item, i) => (
              <div key={item.id} className="flex gap-4 relative">
                {/* Connecting line */}
                {i < filtered.length - 1 && (
                  <div className="absolute top-10 bottom-0 w-0.5"
                    style={{
                      background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(13,31,60,0.06)',
                      left: isRTL ? 'auto' : '16px',
                      right: isRTL ? '16px' : 'auto'
                    }} />
                )}

                {/* Icon */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10"
                  style={{ background: item.color + '20', border: `1.5px solid ${item.color}40` }}>
                  <item.Icon size={14} style={{ color: item.color }} />
                </div>

                {/* Content */}
                <div className="flex-1 pb-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>
                        {isAr ? item.actionAr : item.action}
                      </p>
                      <p className="mt-0.5" style={{ fontSize: '12px', color: textSecondary, lineHeight: '1.5' }}>
                        {isAr ? item.descAr : item.desc}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="px-2 py-0.5 rounded-full text-white"
                          style={{ fontSize: '10px', fontWeight: 600, background: item.color }}>
                          {isAr ? item.userAr : item.user}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono shrink-0" style={{ fontSize: '11px', color: textSecondary }}>
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}